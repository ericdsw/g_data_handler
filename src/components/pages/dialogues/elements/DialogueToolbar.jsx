import { Grid, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';

import { useDialogueManager } from '@/hooks';
import { GenericDialogue } from '@/components/elements';
import { CreateConversationForm } from '../forms';

const DialogueToolbar = ({
  handleExport,
  handleClear,
  handleAddConversation,
}) => {
  const [dialogues, toggleDialogue] = useDialogueManager('addConversation');
  return (
    <>
      <Grid container>
        <Grid size={6}>
          <Typography align="left">
            <Button
              onClick={() => {
                toggleDialogue('addConversation', 'show');
              }}
              color="primary"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              Add Conversation
            </Button>
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography align="right">
            <Button onClick={handleExport} color="secondary">
              Export
            </Button>
            <Button
              sx={{ color: red[400] }}
              color="secondary"
              onClick={handleClear}
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
    </>
  );
};

export default DialogueToolbar;
