import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Fab, Icon } from '@mui/material';

import { GenericDialogue } from '../../../elements';
import { CreateDialogueMessageForm } from '../forms';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    left: 16,
    bottom: 16,
    transition: 'transform 0.2s ease',
    margin: theme.spacing(1),
    zIndex: 1500
  }
}));


const DialogueMessageDialogue = ({
  title,
  open,
  onClose,
  creationHandler,
  isEdit,
  messageData
}) => {
  const classes = useStyles();
  const [minimized, toggleMinimized] = useState(false);

  return (
    <>
    <Fab
      className={classes.fab}
      color="primary"
      variant="extended"
      onClick={() => toggleMinimized(false)}
      style={{
        transform: minimized ? 'scale(1.0)' : 'scale(0.0)'
      }}
    >
      <Icon>open_in_full</Icon>
      &nbsp;
      Maximize
    </Fab>
    <GenericDialogue
      title={title}
      open={open}
      onClose={() => {
        toggleMinimized(false);
        onClose();
      }}
      style={minimized ? { display: "none" } : {}}
    >
      <CreateDialogueMessageForm
        isEdit={isEdit}
        creationHandler={(data, createAndContinue) => {
          creationHandler(data, createAndContinue);
          toggleMinimized(false);
        }}
        onMinimizeRequested={() => {
          toggleMinimized(true);
        }}
        messageData={messageData}
      />
    </GenericDialogue>
    </>
  );
}

export default DialogueMessageDialogue;