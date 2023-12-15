import React, { useCallback, useState, useMemo } from 'react';
import { Autocomplete, Card, Grid, IconButton, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AddTaskIcon from '@mui/icons-material/AddTask';

import StyledPopper from './StyledPopper';

const selectLoadedFileData = (state) => state.dialogue.preUploadedFiles;
const selectData = createSelector(
  [selectLoadedFileData],
  (preUploadedFiles) => ({
    preUploadedFiles,
  })
);

const CompositeDialogueFileInput = ({
  fileLabel = 'JSON file',
  conversationNameLabel = 'Conversation Name',
  fileValue,
  conversationNameValue,
  fileOnChange,
  conversationNameOnChange,
  multiple = false,
}) => {
  const { preUploadedFiles } = useSelector((state) => selectData(state));

  const getIdForFileName = useCallback(
    (newFileName) => {
      const fileIds = Object.keys(preUploadedFiles);
      for (let i = 0; i < fileIds.length; i++) {
        if (preUploadedFiles[fileIds[i]].fileName === newFileName) {
          return fileIds[i];
        }
      }
      return '';
    },
    [preUploadedFiles]
  );

  const [usedFileId, updateUsedFileId] = useState(getIdForFileName(fileValue));
  const [convPopupAnchorEl, setConvPopupAnchorEl] = useState(null);
  const [convPopupSearchVal, setConvPopupSearchVal] = useState([]);

  const convPopupOpen = Boolean(convPopupAnchorEl);
  const id = convPopupOpen ? `composite-dialogue-file-input-popper` : undefined;

  const handleConvPopupClick = (e) => {
    setConvPopupAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setConvPopupAnchorEl(null);
    setConvPopupSearchVal([]);
  };

  const updateWithPopupSearchVal = (newValue) => {
    conversationNameOnChange({ target: { value: newValue.join(',') } });
  };

  /**
   * Used for the file name autocomplete
   */
  const fileNames = useMemo(() => {
    const result = [];
    Object.keys(preUploadedFiles).forEach((fileId) => {
      result.push(preUploadedFiles[fileId].fileName);
    });
    return result;
  }, [preUploadedFiles]);

  const refreshIdForFileName = useCallback(
    (newFileName) => {
      fileOnChange({ target: { value: newFileName } });
      const fileIds = Object.keys(preUploadedFiles);
      for (let i = 0; i < fileIds.length; i++) {
        if (preUploadedFiles[fileIds[i]].fileName === newFileName) {
          updateUsedFileId(fileIds[i]);
          break;
        }
      }
    },
    [fileOnChange, preUploadedFiles]
  );

  /**
   * Used for the conversation autocomplete
   */
  const conversationNames = useMemo(() => {
    if (Object.keys(preUploadedFiles).includes(usedFileId)) {
      return preUploadedFiles[usedFileId].conversationKeys;
    }
    return [];
  }, [usedFileId, preUploadedFiles]);

  return (
    <Grid container spacing={2} sx={{ marginTop: 0 }}>
      <Grid item xs>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              fullWidth
              value={fileValue || null}
              onChange={(_, val) => {
                refreshIdForFileName(val);
              }}
              onInputChange={(_, val) => {
                refreshIdForFileName(val);
              }}
              options={fileNames}
              disableClearable
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label={fileLabel} />
              )}
            />
          </Grid>
          <Grid item xs={12} container alignContent="center">
            <Grid item xs>
              {multiple && (
                <TextField
                  fullWidth
                  label={conversationNameLabel}
                  value={conversationNameValue}
                  onChange={conversationNameOnChange}
                  helperText={
                    usedFileId
                      ? `Loading from: ${preUploadedFiles[usedFileId].fileName}`
                      : ''
                  }
                  InputLabelProps={{
                    shrink: conversationNameValue,
                  }}
                />
              )}
              {!multiple && (
                <Autocomplete
                  freeSolo
                  fullWidth
                  value={conversationNameValue || null}
                  onChange={(_, val) => {
                    conversationNameOnChange({ target: { value: val } });
                  }}
                  onInputChange={(_, val) => {
                    conversationNameOnChange({ target: { value: val } });
                  }}
                  options={conversationNames}
                  disableClearable
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={conversationNameLabel}
                      helperText={
                        usedFileId
                          ? `Loading conversations from: ${preUploadedFiles[usedFileId].fileName}`
                          : ''
                      }
                    />
                  )}
                />
              )}
            </Grid>
            {multiple && (
              <Grid item>
                <IconButton
                  aria-describedby={id}
                  type="button"
                  onClick={handleConvPopupClick}
                  size="large"
                >
                  <ContentPasteSearchIcon size="large" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <StyledPopper id={id} open={convPopupOpen} anchorEl={convPopupAnchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Card elevation={1} style={{ padding: 12 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <Autocomplete
                  open
                  multiple={multiple}
                  disableCloseOnSelect
                  options={conversationNames}
                  disableClearable
                  getOptionLabel={(option) => String(option)}
                  renderTags={() => null}
                  value={convPopupSearchVal || null}
                  onChange={(e, newVal, reason) => {
                    if (
                      e.type === 'keydown' &&
                      e.type === 'Backspace' &&
                      reason === 'removeOption'
                    ) {
                      return;
                    }

                    const usedNewVal =
                      typeof newVal !== 'string' ? newVal : [newVal];
                    setConvPopupSearchVal(usedNewVal);

                    if (!multiple) {
                      updateWithPopupSearchVal(usedNewVal);
                      handleClose();
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={conversationNameLabel} />
                  )}
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    updateWithPopupSearchVal(convPopupSearchVal);
                    handleClose();
                  }}
                >
                  <AddTaskIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </ClickAwayListener>
      </StyledPopper>
    </Grid>
  );
};

export default CompositeDialogueFileInput;
