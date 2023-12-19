import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Typography,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Grid,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import { Delete, Edit, Check, Close, Warning } from '@material-ui/icons';

import { useDialogueManager } from '../../hooks';
import ConfirmationDialogue from './ConfirmationDialogue';
import {
  deletePreUploadedFileName,
  updatePreUploadedFile
} from '../../actions/dialogueActions';
import { yellow } from '@mui/material/colors';

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

  const showWarning = useMemo(() => {
    return !fileName.startsWith("Dialogues/");
  }, [fileName]);

  return (
    <TableRow>
      <TableCell>
        {!inEditMode && (
          <Grid container>
            {showWarning && (
              <Tooltip 
                title="Warning, make sure the file name includes the full path from the Dialogues folder (that info can't be extracted from imported single files)"
              >
                <Warning style={{ color: yellow[500], fontSize: 20 }}/>&nbsp;&nbsp;
              </Tooltip>
            )}
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
