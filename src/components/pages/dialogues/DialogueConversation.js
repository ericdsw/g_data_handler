import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Button,
  IconButton,
  Icon,
  Tooltip,
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Droppable } from "react-beautiful-dnd";

import { ConfirmationDialogue, GenericDialogue } from "../../elements";
import { useDialogueManager } from "../../../hooks";
import DialogueMessageContainer from "../../containers/DialogueMessageContainer";
import { CreateConversationForm } from "./forms";
import {
  CreateDialogueMessageForm,
  CreateEmoteForm,
  CreateSwarmForm,
  GiveMoneyFromDialogueForm,
  GiveItemFromDialogueForm,
  PickItemFromDialogueForm
} from "./forms";

import { styles } from "./styles/DialogueConversationStyle";

const DialogueConversation = (props) => {
  const { conversation, classes, conversationsToMerge } = props;
  const {
    handleDeleteConversation,
    handleAddToConversation,
    handleUpdateConversation,
    handleToggleFromMerger,
  } = props;

  const [dialogues, toggleDialogue] = useDialogueManager(
    "confirmDelete",
    "updateConversation",
    "addMessage",
    "addEmote",
    "addSwarm",
    "addGiveItem",
    "addGiveMoney",
    "addPickItem"
  );
  const [isExpanded, setIsExpanded] = useState(false);

  function onEditClick(event) {
    event.stopPropagation();
    toggleDialogue("updateConversation", "show");
  }

  function onDeleteClick(event) {
    event.stopPropagation();
    toggleDialogue("confirmDelete", "show");
  }

  function handlePanelChange(expanded) {
    setIsExpanded(expanded);
  }

  function handleCheckboxChange(event) {
    handleToggleFromMerger(event.target.checked);
  }

  return (
    <ExpansionPanel
      className={classes.conversationContainer}
      square={true}
      onChange={(_, expanded) => handlePanelChange(expanded)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems="center">

          {/* Title Data */}
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item>
                <div
                  className={classes.dragHandleElement}
                  {...props.dragHandleProps}
                >
                  <Icon>drag_handle</Icon>
                </div>
              </Grid>
              <Grid item xs>
                <Typography className={classes.heading}>
                  <b>Name: {conversation.conversationName}</b>
                </Typography>
                <Typography className={classes.subHeading}>
                  ({conversation.messages.length}{" "}
                  {conversation.messages.length === 1 ? "message" : "messages"})
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} md={6}>
            <Grid container justify="flex-end">
              <Tooltip title="Merge">
                <Checkbox
                  checked={conversationsToMerge.includes(conversation.id)}
                  value={conversation.id}
                  onChange={(e) => handleCheckboxChange(e)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Tooltip>
              <Tooltip title="Edit Conversation Name" enterDelay={200}>
                <IconButton onClick={(e) => onEditClick(e)}>
                  <Icon>edit</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Conversation" enterDelay={200}>
                <IconButton onClick={(e) => onDeleteClick(e)}>
                  <Icon>delete</Icon>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

        </Grid>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
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
                toggleDialogue("addMessage", "show");
              }}
            >
              Add message
            </Button>
            <Button
              style={{ marginTop: 8, marginRight: 16 }}
              color="secondary"
              variant="contained"
              onClick={() => {
                toggleDialogue("addEmote", "show");
              }}
            >
              Emote
            </Button>
            <Button
              style={{ marginTop: 8, marginRight: 16 }}
              color="secondary"
              variant="contained"
              onClick={() => toggleDialogue("addSwarm", "show")}
            >
              Dialogue Swarn
            </Button>
            <Button
              style={{ marginTop: 8, marginRight: 16 }}
              color="secondary"
              variant="contained"
              onClick={() => toggleDialogue("addGiveMoney", "show")}
            >
              Give Money
            </Button>
            <Button
              style={{ marginTop: 8, marginRight: 16 }}
              color="secondary"
              variant="contained"
              onClick={() => toggleDialogue("addGiveItem", "show")}
            >
              Give Item
            </Button>
            <Button
              style={{ marginTop: 8 }}
              color="secondary"
              variant="contained"
              onClick={() => toggleDialogue("addPickItem", "show")}
            >
              Select Item
            </Button>
          </div>
        </div>
      </ExpansionPanelDetails>

      {/* Create Message Form */}
      <GenericDialogue
        title="Create Conversation"
        open={dialogues["addMessage"]}
        onClose={() => toggleDialogue("addMessage", "hide")}
      >
        <CreateDialogueMessageForm
          creationHandler={(data, createAndContinue) => {
            if (!createAndContinue) {
              toggleDialogue("addMessage", "hide");
            }
            handleAddToConversation(data);
          }}
          isEdit={false}
        />
      </GenericDialogue>

      {/* Create Emote form */}
      <GenericDialogue
        title="Create Emote"
        open={dialogues["addEmote"]}
        onClose={() => toggleDialogue("addEmote", "hide")}
        maxWidth="sm"
      >
        <CreateEmoteForm
          creationHandler={(data) => {
            toggleDialogue("addEmote", "hide");
            handleAddToConversation(data);
          }}
        />
      </GenericDialogue>

      {/* Create Swarm form */}
      <GenericDialogue
        title="Create Swarm"
        open={dialogues["addSwarm"]}
        onClose={() => toggleDialogue("addSwarm", "hide")}
      >
        <CreateSwarmForm
          isEdit={false}
          handleSubmit={(data) => {
            toggleDialogue("addSwarm", "hide");
            handleAddToConversation(data);
          }}
        />
      </GenericDialogue>

      {/* Give money dialogue */}
      <GenericDialogue
        title="Give Money"
        open={dialogues["addGiveMoney"]}
        onClose={() => toggleDialogue("addGiveMoney", "hide")}
        maxWidth="sm"
      >
        <GiveMoneyFromDialogueForm
          onSubmit={data => {
            toggleDialogue("addGiveMoney", "hide")
            handleAddToConversation(data);
          }}
        />
      </GenericDialogue>

      {/* Give Item Dialogue */}
      <GenericDialogue
        title="Give Item"
        open={dialogues["addGiveItem"]}
        onClose={() => toggleDialogue("addGiveItem", "hide")}
        maxWidth="sm"
      >
        <GiveItemFromDialogueForm
          onSubmit={data => {
            toggleDialogue("addGiveItem", "hide");
            handleAddToConversation(data);
          }}
        />
      </GenericDialogue>

      {/* Pick Item Dialogue */}
      <GenericDialogue
        title="Pick Item"
        open={dialogues["addPickItem"]}
        onClose={() => toggleDialogue("addPickItem", "hide")}
        maxWidth="md"
      >
        <PickItemFromDialogueForm
          isEdit={false}
          onSubmit={data => {
            toggleDialogue("addPickItem", "hide");
            handleAddToConversation(data);
          }}
        />
      </GenericDialogue>

      {/* Edit Conversation Name */}
      <GenericDialogue
        title="Edit Conversation"
        open={dialogues["updateConversation"]}
        onClose={() => toggleDialogue("updateConversation", "hide")}
        maxWidth="sm"
      >
        <CreateConversationForm
          conversationName={conversation.conversationName}
          creationHandler={(newName) => {
            toggleDialogue("updateConversation", "hide");
            handleUpdateConversation(newName);
          }}
        />
      </GenericDialogue>

      {/* Delete Confirmation */}
      <ConfirmationDialogue
        message="Delete the current conversation?"
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          handleDeleteConversation();
          toggleDialogue("confirmDelete", "hide");
        }}
      />
    </ExpansionPanel>
  );
};

export default withStyles(styles)(DialogueConversation);
