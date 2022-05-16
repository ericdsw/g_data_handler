import React, { useState, useCallback, useMemo } from "react";
import {
  IconButton,
  Icon,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { useDialogueManager } from "../../../../hooks";
import { GenericDialogue, ConfirmationDialogue } from "../../../elements";

import {
  CreateDialogueMessageForm,
  CreateConversationForm,
  CreateSwarmForm,
  GiveItemFromDialogueForm,
  GiveMoneyFromDialogueForm,
  PickItemFromDialogueForm
} from "../forms";

const DialogueMessageToolbar = ({
  message,
  omitEdit,
  handleAddAbove,
  handleAddBelow,
  handleEdit,
  handleDelete,
  handleSplitBelow
}) => {

  const [dialogues, toggleDialogue] = useDialogueManager(
    "confirmDelete",
    "editMessage",
    "addEmote",
    "splitConversation"
  );

  const [selectedOption, setSelectedOption] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // Anchor Management

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleMenuSelect = useCallback((_, menuItemName) => {
    switch (menuItemName) {
      case "edit":
        setSelectedOption("edit");
        toggleDialogue("editMessage", "show");
        break;
      case "delete":
        toggleDialogue("confirmDelete", "show");
        break;
      case "splitBelow":
        toggleDialogue("splitConversation", "show");
        break;
      default:
        break;
    }
    setAnchorEl(null);
  }, [setSelectedOption, toggleDialogue, setAnchorEl]);

  const handleDialogueFormSubmit = useCallback((data) => {
    switch (selectedOption) {
      case "addAbove":
        handleAddAbove(data);
        break;
      case "addBelow":
        handleAddBelow(data);
        break;
      case "edit":
        handleEdit(data);
        break;
      default:
        break;
    }
  }, [
    handleAddAbove,
    handleAddBelow, 
    handleEdit,
    selectedOption
  ]);

  const { typeString, editDialogue } = useMemo(() => {

    let typeString;
    let editDialogue;

    switch (message.type) {

      case "message":
        typeString = "Message";
        editDialogue = (
          <GenericDialogue
            title="Edit Conversation"
            open={dialogues["editMessage"]}
            onClose={() => toggleDialogue("editMessage", "hide")}
          >
            <CreateDialogueMessageForm
              isEdit={selectedOption === "edit"}
              messageData={selectedOption === "edit" ? message : {}}
              creationHandler={(data, createAndContinue) => {
                if (!createAndContinue) {
                  toggleDialogue("editMessage", "hide");
                }
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case "swarm":
        typeString = "Swarm";
        editDialogue = (
          <GenericDialogue
            title="Edit Swarm"
            open={dialogues["editMessage"]}
            onClose={() => toggleDialogue("editMessage", "hide")}
          >
            <CreateSwarmForm
              initialSwarmData={message.swarmData}
              isEdit={true}
              handleSubmit={(data) => {
                toggleDialogue("editMessage", "hide");
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case "give_item":
        typeString = "Give Item Message";
        editDialogue = (
          <GenericDialogue
            title="Edit Give Item Message"
            open={dialogues["editMessage"]}
            onClose={() => toggleDialogue("editMessage", "hide")}
          >
            <GiveItemFromDialogueForm
              data={message}
              buttonText="Edit"
              onSubmit={data => {
                toggleDialogue("editMessage", "hide");
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case "give_money":
        typeString = "Give Money Message";
        editDialogue = (
          <GenericDialogue
            title="Edit Give Money Message"
            open={dialogues["editMessage"]}
            onClose={() => toggleDialogue("editMessage", "hide")}
          >
            <GiveMoneyFromDialogueForm
              data={message}
              buttonText="Edit"
              onSubmit={data => {
                toggleDialogue("editMessage", "hide");
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case "emote":
        typeString = "Emote";
        editDialogue = <React.Fragment />;
        break;
      
      case "pick_item":
        typeString = "Pick Item message";
        editDialogue = (
          <GenericDialogue
            title="Edit pick item"
            open={dialogues["editMessage"]}
            onClose={() => toggleDialogue("editMessage", "hide")}
          >
            <PickItemFromDialogueForm
              buttonText="Edit"
              data={message}
              onSubmit={data => {
                toggleDialogue('editMessage', 'hide');
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      default:
        typeString = "";
    }
    return { typeString, editDialogue };

  }, [dialogues, handleDialogueFormSubmit, message, selectedOption, toggleDialogue]); 

  return (
    <div>
      {/* Button that shows the menu */}
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => handleMenuOpen(e)}
      >
        <Icon>more_vert</Icon>
      </IconButton>

      {/* Menu Elements */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!omitEdit && (
          <MenuItem
            aria-controls="simple-type-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuSelect(e, "edit")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
        )}
        <MenuItem onClick={(e) => handleMenuSelect(e, "delete")}>
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={(e) => handleMenuSelect(e, "splitBelow")}>
          <ListItemIcon>
            <Icon>vertical_align_bottom</Icon>
          </ListItemIcon>
          <ListItemText primary="Split From This" />
        </MenuItem>
      </Menu>

      {/* Delete Dialogue */}
      <ConfirmationDialogue
        message={`Delete the ${typeString}?`}
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          handleDelete();
          toggleDialogue("confirmDelete", "hide");
        }}
      />

      {/* Edit Message Form */}
      {editDialogue}

      {/* Split Conversation Form */}
      <GenericDialogue
        title="Splitted Converation Name"
        open={dialogues["splitConversation"]}
        onClose={() => toggleDialogue("splitConversation", "hide")}
        maxWidth="sm"
      >
        <CreateConversationForm
          creationHandler={(conversationName) => {
            toggleDialogue("splitConversation", "hide");
            handleSplitBelow(conversationName);
          }}
        />
      </GenericDialogue>
    </div>
  );
};

export default DialogueMessageToolbar;
