import React, { useState, useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Droppable } from 'react-beautiful-dnd';

import { ConfirmationDialogue, GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueMessageContainer from './DialogueMessageContainer';
import { CreateConversationForm } from './forms';
import {
  CreateEmoteForm,
  CreateSwarmForm,
  GiveMoneyFromDialogueForm,
  GiveItemFromDialogueForm,
  PickItemFromDialogueForm,
} from './forms';
import { DialogueMessageDialogue } from './formDialogues';

import { styles } from './styles/DialogueConversationStyle';
import { Delete, DragHandle, Edit } from '@material-ui/icons';

const useStyles = makeStyles(styles);

const DialogueConversation = ({
  conversation,
  conversationsToMerge,
  handleDeleteConversation,
  handleAddToConversation,
  handleUpdateConversation,
  handleToggleFromMerger,
  ...props
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'updateConversation',
    'addMessage',
    'addEmote',
    'addSwarm',
    'addGiveItem',
    'addGiveMoney',
    'addPickItem',
    'searchSpeaker'
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const onEditClick = useCallback(
    (event) => {
      event.stopPropagation();
      toggleDialogue('updateConversation', 'show');
    },
    [toggleDialogue]
  );

  const onDeleteClick = useCallback(
    (event) => {
      event.stopPropagation();
      toggleDialogue('confirmDelete', 'show');
    },
    [toggleDialogue]
  );

  return (
    <>
      <Accordion
        className={classes.conversationContainer}
        square={true}
        onChange={(_, expanded) => setIsExpanded(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems="center">
            {/* Title Data */}
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item>
                  <div
                    className={classes.dragHandleElement}
                    {...props.dragHandleProps}
                  >
                    <DragHandle />
                  </div>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.heading}>
                    <b>Name: {conversation.conversationName}</b>
                  </Typography>
                  <Typography className={classes.subHeading}>
                    ({conversation.messages.length}{' '}
                    {conversation.messages.length === 1 ? 'message' : 'messages'})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} md={6}>
              <Grid container justifyContent="flex-end">
                <Tooltip title="Merge">
                  <Checkbox
                    checked={conversationsToMerge.includes(conversation.id)}
                    value={conversation.id}
                    onChange={(e) => handleToggleFromMerger(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Tooltip>
                <Tooltip title="Edit Conversation Name" enterDelay={200}>
                  <IconButton onClick={(e) => onEditClick(e)} size="large">
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Conversation" enterDelay={200}>
                  <IconButton onClick={(e) => onDeleteClick(e)} size="large">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classes.detailsContainer}>
            <Droppable
              droppableId={conversation.id}
              type={`messages`}
              isDropDisabled={!isExpanded}
            >
              {(provided) => (
                <div
                  className={classes.messageContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {conversation.messages.map((messageId, index) => (
                    <DialogueMessageContainer
                      key={messageId}
                      conversationId={conversation.id}
                      messageId={messageId}
                      index={index}
                      isDragDisabled={!isExpanded}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className={classes.buttonContainer}>
              <Button
                style={{ marginTop: 8, marginRight: 16 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  toggleDialogue('addMessage', 'show');
                }}
              >
                Add message
              </Button>
              <Button
                style={{ marginTop: 8, marginRight: 16 }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  toggleDialogue('addEmote', 'show');
                }}
              >
                Emote
              </Button>
              <Button
                style={{ marginTop: 8, marginRight: 16 }}
                color="secondary"
                variant="contained"
                onClick={() => toggleDialogue('addSwarm', 'show')}
              >
                Dialogue Swarn
              </Button>
              <Button
                style={{ marginTop: 8, marginRight: 16 }}
                color="secondary"
                variant="contained"
                onClick={() => toggleDialogue('addGiveMoney', 'show')}
              >
                Give Money
              </Button>
              <Button
                style={{ marginTop: 8, marginRight: 16 }}
                color="secondary"
                variant="contained"
                onClick={() => toggleDialogue('addGiveItem', 'show')}
              >
                Give Item
              </Button>
              <Button
                style={{ marginTop: 8 }}
                color="secondary"
                variant="contained"
                onClick={() => toggleDialogue('addPickItem', 'show')}
              >
                Select Item
              </Button>
            </div>
          </div>
        </AccordionDetails>

        {/* Create Message Form */}
        <DialogueMessageDialogue
          title="Create Conversation"
          open={dialogues['addMessage']}
          onClose={() => toggleDialogue('addMessage', 'hide')}
          creationHandler={(data, createAndContinue) => {
            if (!createAndContinue) {
              toggleDialogue('addMessage', 'hide');
            }
            handleAddToConversation(data);
          }}
          isEdit={false}
        />

        {/* Create Emote form */}
        <GenericDialogue
          title="Create Emote"
          open={dialogues['addEmote']}
          onClose={() => toggleDialogue('addEmote', 'hide')}
          maxWidth="sm"
        >
          <CreateEmoteForm
            creationHandler={(data) => {
              toggleDialogue('addEmote', 'hide');
              handleAddToConversation(data);
            }}
          />
        </GenericDialogue>

        {/* Create Swarm form */}
        <GenericDialogue
          title="Create Swarm"
          open={dialogues['addSwarm']}
          onClose={() => toggleDialogue('addSwarm', 'hide')}
        >
          <CreateSwarmForm
            isEdit={false}
            handleSubmit={(data) => {
              toggleDialogue('addSwarm', 'hide');
              handleAddToConversation(data);
            }}
          />
        </GenericDialogue>

        {/* Give money dialogue */}
        <GenericDialogue
          title="Give Money"
          open={dialogues['addGiveMoney']}
          onClose={() => toggleDialogue('addGiveMoney', 'hide')}
          maxWidth="sm"
        >
          <GiveMoneyFromDialogueForm
            onSubmit={(data) => {
              toggleDialogue('addGiveMoney', 'hide');
              handleAddToConversation(data);
            }}
          />
        </GenericDialogue>

        {/* Give Item Dialogue */}
        <GenericDialogue
          title="Give Item"
          open={dialogues['addGiveItem']}
          onClose={() => toggleDialogue('addGiveItem', 'hide')}
          maxWidth="sm"
        >
          <GiveItemFromDialogueForm
            onSubmit={(data) => {
              toggleDialogue('addGiveItem', 'hide');
              handleAddToConversation(data);
            }}
          />
        </GenericDialogue>

        {/* Pick Item Dialogue */}
        <GenericDialogue
          title="Pick Item"
          open={dialogues['addPickItem']}
          onClose={() => toggleDialogue('addPickItem', 'hide')}
          maxWidth="lg"
        >
          <PickItemFromDialogueForm
            isEdit={false}
            onSubmit={(data) => {
              toggleDialogue('addPickItem', 'hide');
              handleAddToConversation(data);
            }}
          />
        </GenericDialogue> 
      </Accordion>

      {/* Edit Conversation Name */}
      <GenericDialogue
        title="Edit Conversation"
        open={dialogues['updateConversation']}
        onClose={() => toggleDialogue('updateConversation', 'hide')}
        maxWidth="sm"
      >
        <CreateConversationForm
          conversationName={conversation.conversationName}
          creationHandler={(newName) => {
            toggleDialogue('updateConversation', 'hide');
            handleUpdateConversation(newName);
          }}
        />
      </GenericDialogue>

      {/* Delete Confirmation */}
      <ConfirmationDialogue
        message="Delete the current conversation?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDeleteConversation();
          toggleDialogue('confirmDelete', 'hide');
        }}
      />

    </>
  );
};

export default DialogueConversation;
