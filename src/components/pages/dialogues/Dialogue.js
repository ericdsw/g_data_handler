import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, TextField, Button, Fab, Icon } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueConversationContainer from '../../containers/DialogueConversationContainer';

import { NoConversationsNotifier } from './elements';
import { CreateConversationForm } from './forms';

import { styles } from './styles/DialogueStyle';

const useStyles = makeStyles(styles);

const Dialogue = ({
  fileName,
  dialogueData,
  conversationsToMerge,
  handleFileNameChange,
  handleAddConversation,
  handleDragEnd,
  handleConfirmMerge,
  handleConfirmBulkDelete,
  handleSelectAll,
  handleUnselectAll,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'addConversation',
    'confirmMerge',
    'confirmBulkDelete'
  );

  const conversationAmount = dialogueData.conversations.length;
  const mergeAmount = conversationsToMerge.length;

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

      {/* Merge Conversations Button */}
      <Fab
        color="primary"
        size="large"
        variant="extended"
        aria-label="Merge Conversations"
        className={classes.mergeFab}
        style={{
          transform:
            conversationsToMerge.length <= 0 ? 'scale(0.0)' : 'scale(1.0)',
        }}
        onClick={(e) => toggleDialogue('confirmMerge', 'show')}
      >
        <Icon>merge_type</Icon>
        Merge Selected
      </Fab>

      <Fab
        size="large"
        variant="extended"
        aria-label="Merge Conversations"
        className={classes.deleteFab}
        style={{
          transform:
            conversationsToMerge.length <= 0 ? 'scale(0.0)' : 'scale(1.0)',
        }}
        onClick={(e) => toggleDialogue('confirmBulkDelete', 'show')}
      >
        <Icon>delete</Icon>
        Delete Selected
      </Fab>

      <Fab
        size="large"
        variant="extended"
        color="secondary"
        aria-label="All"
        className={classes.selectAllFab}
        style={{
          transform:
            conversationsToMerge.length <= 0 ? 'scale(0.0)' : 'scale(1.0)',
        }}
        onClick={(e) => {
          if (conversationAmount > mergeAmount) {
            handleSelectAll();
          } else {
            handleUnselectAll();
          }
        }}
      >
        {conversationAmount > mergeAmount ? (
          <React.Fragment>
            <Icon>select_all</Icon> Select All
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Icon>clear_all</Icon> Unselect All
          </React.Fragment>
        )}
      </Fab>

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

      {/* Merge Confirmation Form */}
      <ConfirmationDialogue
        message={`Merge selected conversations?`}
        descriptionText={`${conversationsToMerge.length} conversations will be merged`}
        isOpen={dialogues['confirmMerge']}
        handleClose={() => toggleDialogue('confirmMerge', 'hide')}
        handleConfirm={() => {
          handleConfirmMerge();
          toggleDialogue('confirmMerge', 'hide');
        }}
      />

      {/* Bulk Delete Confirmation Form */}
      <ConfirmationDialogue
        message="Delete selected conversations?"
        descriptionText={`${conversationsToMerge.length} conversations will be deleted`}
        isOpen={dialogues['confirmBulkDelete']}
        handleClose={() => toggleDialogue('confirmBulkDelete', 'hide')}
        handleConfirm={() => {
          handleConfirmBulkDelete();
          toggleDialogue('confirmBulkDelete', 'hide');
        }}
      />
    </DragDropContext>
  );
};

export default Dialogue;
