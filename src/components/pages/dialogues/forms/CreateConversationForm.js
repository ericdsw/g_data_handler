import React, { useState, useMemo, useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';
import { TextField, Grid, Button } from '@mui/material';

const CreateConversationForm = ({ conversationName, creationHandler }) => {

  const [curConversationName, updateCurConversationName] =
    useState(conversationName);
  const isEdit = useMemo(() => !!conversationName, [conversationName]);
  const buttonText = useMemo(
    () => (isEdit ? 'Edit Conversation' : 'Create Conversation'),
    [isEdit]
  );

  const submitData = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (curConversationName === '') {
        enqueueSnackbar('The conversation name is required', {
          variant: 'error',
        });
      } else {
        creationHandler(curConversationName);
      }
    },
    [curConversationName, creationHandler]
  );

  return (
    <form onSubmit={submitData}>
      <Grid container>
        <Grid item xs>
          <TextField
            id="conversationName"
            label="Conversation Name"
            value={curConversationName}
            onChange={(e) => updateCurConversationName(e.target.value)}
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: 16 }}
          color="primary"
        >
          {buttonText}
        </Button>
      </Grid>
    </form>
  );
};

export default CreateConversationForm;
