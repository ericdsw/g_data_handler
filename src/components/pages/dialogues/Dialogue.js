import makeStyles from '@mui/styles/makeStyles';
import { Grid, TextField, Button } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueConversationContainer from './DialogueConversationContainer';

import { NoConversationsNotifier } from './elements';
import { CreateConversationForm } from './forms';

import { styles } from './styles/DialogueStyle';

const useStyles = makeStyles(styles);

const Dialogue = ({
  fileName,
  dialogueData,
  handleFileNameChange,
  handleAddConversation,
  handleDragEnd,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'addConversation',
    'confirmMerge',
    'confirmBulkDelete'
  );

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <Grid className={classes.root} container spacing={2}>
        {/* File Name Manager */}
        <Grid item xs={12}>
          <TextField
            id="file_name"
            label="File Name"
            fullWidth
            value={fileName}
            onChange={(e) => handleFileNameChange(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        {/* The conversation list */}
        <Grid item xs={12}>
          <NoConversationsNotifier conversations={dialogueData.conversations} />
          <Droppable droppableId={dialogueData.id} type="conversations">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {dialogueData.conversations.map((conversationId, index) => (
                  <DialogueConversationContainer
                    key={conversationId}
                    conversationId={conversationId}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>

        {/* Additional Add Conversation Button */}
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Button
              color="primary"
              onClick={() => {
                toggleDialogue('addConversation', 'show');
              }}
            >
              Add Conversation
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Conversation Form */}
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

    </DragDropContext>
  );
};

export default Dialogue;
