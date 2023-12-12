import React, { useMemo, useState } from 'react';

import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import VisuallyHiddenInput from './VisuallyHiddenInput';
import { parseFile } from '../../functions';

import { addPreUploadedFile, clearPreUploadedFiles } from '../../actions/dialogueActions';


const selectLoadedFileData = state => state.dialogue.preUploadedFiles;
const selectData = createSelector([selectLoadedFileData], preUploadedFiles => ({
  preUploadedFiles
}));


const PreloadedDialoguesContent = () => {

  const dispatch = useDispatch();
  const { preUploadedFiles } = useSelector(state => selectData(state));

  const dialoguesAmount = useMemo(() => Object.keys(preUploadedFiles).length, [preUploadedFiles]);
  const conversationsAmount = useMemo(() => {
    let result = 0;
    Object.keys(preUploadedFiles).forEach(fileKey => {
      result += Object.keys(preUploadedFiles[fileKey].conversationKeys).length
    });
    return result;
  }, [preUploadedFiles])

  const [loading, toggleLoading] = useState(false);

  const handleFolderUpload = async (e) => {

    toggleLoading(true);
    dispatch(clearPreUploadedFiles());

    const jsonFiles = [...e.target.files].filter(file => file.type === "application/json")
    for (let i = 0; i < jsonFiles.length; i++) {
      try {
        const result = await parseFile(jsonFiles[i], 'application/json')
        dispatch(
          addPreUploadedFile(
            jsonFiles[i].webkitRelativePath.replace(/^Dialogues\//, ''),
            Object.keys(result),
            uuidv4()
          )
        );
      } catch (e) {
        console.log(`Error loading file: ${e}`)
      }
    }
    toggleLoading(false);
  }

  return (
    <>
      <div style={{ padding: 8 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Button variant='contained' component="label">
              Import Dialogues Folder
              <VisuallyHiddenInput
                type="file"
                directory="true"
                webkitdirectory="true"
                onChange={handleFolderUpload}
              />
            </Button>
          </Grid>
          {(dialoguesAmount > 0 && !loading) && (
            <Grid item>
              <Typography variant="body2">
                <b>Loaded {dialoguesAmount} dialogues, {conversationsAmount} conversations</b>
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      {loading && (
        <div style={{ padding: 12 }}>
          <Typography variant="body1" textAlign="center">Loading...</Typography>
        </div>
      )}
      {(!loading && Object.keys(preUploadedFiles).length <= 0) && (
        <div style={{ padding: 12 }}>
          <Typography variant="body1" textAlign="center">No files loaded</Typography>
        </div>
      )}
      {(!loading && Object.keys(preUploadedFiles).length > 0) && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Number of conversations</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(preUploadedFiles).map(fileId => (
              <TableRow key={fileId}>
                <TableCell>{preUploadedFiles[fileId].fileName}</TableCell>
                <TableCell>{preUploadedFiles[fileId].conversationKeys.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

}

export default PreloadedDialoguesContent;
