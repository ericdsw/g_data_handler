import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Typography,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Grid,
  InputAdornment,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@material-ui/icons';

import { useDialogueManager } from '../../hooks';
import ConfirmationDialogue from './ConfirmationDialogue';
import {
  deletePreUploadedFileName,
  updatePreUploadedFile
} from '../../actions/dialogueActions';

const PreloadedDialoguesContentRow = ({
  id,
  fileName,
  conversationAmount,
}) => {

  const [dialogues, toggleDialogues] = useDialogueManager('confirmDelete')
  const [inEditMode, toggleInEditMode] = useState(false);
  const [editValue, setEditValue] = useState('');

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    toggleDialogues('confirmDelete', 'show');
  };

  const handleEditClick = () => {
    if (!inEditMode) {
      setEditValue(fileName);
      toggleInEditMode(true);
    } else {
      toggleInEditMode(false);
    }
  }

  const acceptEdit = () => {
    toggleInEditMode(false);
    dispatch(updatePreUploadedFile(id, editValue));
  }

  return (
    <TableRow>
      <TableCell>
        {!inEditMode && (
          <Grid container>
            <Typography variant="body1">
              {fileName}
            </Typography>
          </Grid>
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
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {conversationAmount}
        </Typography> 
      </TableCell>
      <TableCell>
        <div style={{ display: 'flex', flexDirection: 'horizontal' }}>
          <IconButton onClick={handleEditClick}>
            {!inEditMode && <Edit />}
            {inEditMode && <Close />}
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
          >
            <Delete />
          </IconButton>
        </div>
      </TableCell>

      <ConfirmationDialogue
        message={`Delete the file ${fileName}?`}
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogues('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogues('confirmDelete', 'hide')
          dispatch(deletePreUploadedFileName(id));
        }}
      />

    </TableRow>
  );
}

export default PreloadedDialoguesContentRow;
