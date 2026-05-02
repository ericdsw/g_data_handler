import { useState } from 'react';
import { Fab, Icon } from '@mui/material';
import { styled } from '@mui/material/styles';

import { GenericDialogue } from '../../../elements';
import { CreateDialogueMessageForm } from '../forms';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  left: 16,
  bottom: 16,
  transition: 'transform 0.2s ease',
  margin: theme.spacing(1),
  zIndex: 1500,
}));

const DialogueMessageDialogue = ({
  title,
  open,
  onClose,
  creationHandler,
  isEdit,
  messageData,
}) => {
  const [minimized, toggleMinimized] = useState(false);

  return (
    <>
      <StyledFab
        color="primary"
        variant="extended"
        onClick={() => toggleMinimized(false)}
        sx={{ transform: minimized ? 'scale(1.0)' : 'scale(0.0)' }}
      >
        <Icon>open_in_full</Icon>
        &nbsp; Maximize
      </StyledFab>
      <GenericDialogue
        title={title}
        open={open}
        onClose={() => {
          toggleMinimized(false);
          onClose();
        }}
        style={minimized ? { display: 'none' } : {}}
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
};

export default DialogueMessageDialogue;
