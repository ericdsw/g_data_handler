import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';

import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';
import { CreateConversationForm } from '../forms';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: red[400],
  },
  defaultButton: {
    color: theme.palette.primary.main,
  },
}));

const DialogueToolbar = ({
  handleExport,
  handleClear,
  handleAddConversation,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'addConversation',
    'confirmDelete'
  );

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <Typography align="left">
            <Button
              onClick={() => {
                toggleDialogue('addConversation', 'show');
              }}
              color="primary"
              className={classes.defaultButton}
            >
              Add Conversation
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">
            <Button onClick={() => handleExport()} color="secondary">
              Export
            </Button>
            <Button
              className={classes.deleteButton}
              color="secondary"
              onClick={() => toggleDialogue('confirmDelete', 'show')}
            >
              Clear Dialogue File
            </Button>
          </Typography>
        </Grid>
      </Grid>

      <GenericDialogue
        title="Create Conversation"
        open={dialogues['addConversation']}
        onClose={() => toggleDialogue('addConversation', 'hide')}
        maxWidth="sm"
      >
        <CreateConversationForm
          creationHandler={(conversationName) => {
            handleAddConversation(conversationName);
            toggleDialogue('addConversation', 'hide');
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the current loaded dialogues?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleClear();
          toggleDialogue('confirmDelete', 'hide');
        }}
      />
    </React.Fragment>
  );
};

export default DialogueToolbar;
