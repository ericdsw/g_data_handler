import React, { useState } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { Check, Close, Delete, Edit } from '@mui/icons-material';

import { useDispatch } from 'react-redux';

import { useDialogueManager } from '../../hooks';
import ConfirmationDialogue from './ConfirmationDialogue';

import { editPreLoadedCutsceneName, deletePreLoadedCutsceneName } from '../../actions/cutsceneActions';

const PreLoadedCutscenesContentRow = ({
  fileName
}) => {

  const dispatch = useDispatch();

  const [dialogues, toggleDialogues] = useDialogueManager('confirmDelete');
  const [inEditMode, toggleInEditMode] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = () => {
    if (!inEditMode) {
      setEditValue(fileName);
    }
    toggleInEditMode(!inEditMode);
  }

  const acceptEdit = () => {
    toggleInEditMode(false);
    dispatch(editPreLoadedCutsceneName(editValue));
  }

  const acceptDelete = () => {
    toggleInEditMode(false);
    dispatch(deletePreLoadedCutsceneName(fileName));
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs>
        {!inEditMode && (
          <Typography variant="body1">{fileName}</Typography>
        )}
        {inEditMode && (
          <TextField
            autoFocus
            label="File Name"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            fullWidth
            size="small"
            onKeyDown={e => {
              if (e.key === "Enter") {
                acceptEdit();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={acceptEdit}
                  >
                    <Check />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      </Grid>
      <Grid item>
        <IconButton onClick={handleEditClick}>
          {!inEditMode && <Edit />}
          {inEditMode && <Close />}
        </IconButton>
        <IconButton onClick={() => toggleDialogues('confirmDelete', 'show')}>
          <Delete />
        </IconButton>
      </Grid>
      <ConfirmationDialogue
        message={`Delete the cutscene file ${fileName}?`}
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogues('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogues('confirmDelete', 'hide');
          acceptDelete();
        }}
      />
    </Grid>
  )
};

export default PreLoadedCutscenesContentRow;
