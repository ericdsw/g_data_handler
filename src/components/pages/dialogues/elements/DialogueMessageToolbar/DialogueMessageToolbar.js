import React, { useState, useCallback, useMemo } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { useDialogueManager } from '../../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../../elements';

import {
  CreateConversationForm,
  CreateSwarmForm,
  GiveItemFromDialogueForm,
  GiveMoneyFromDialogueForm,
  PickItemFromDialogueForm,
  CreateEmoteForm,
} from '../../forms';

import { DialogueMessageDialogue } from '../../formDialogues';

import { AddBelowMenuOptions } from './components';
import { Delete, MoreVert, VerticalAlignBottom } from '@material-ui/icons';
import { Edit } from '@mui/icons-material';

const DialogueMessageToolbar = ({
  message,
  omitEdit,
  handleAddAbove,
  handleAddBelow,
  handleEdit,
  handleDelete,
  handleSplitBelow,
}) => {
  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'editMessage',
    'addEmote',
    'splitConversation',

    'addMessageBelow',
    'addEmoteBelow',
    'addSwarmBelow',
    'giveMoneyBelow',
    'giveItemBelow',
    'selectItemBelow'
  );

  const [selectedOption, setSelectedOption] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [additionalBelowOffset, updateAdditionalBelowOffset] = useState(0);

  // Anchor Management

  const handleMenuOpen = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleMenuSelect = useCallback(
    (_, menuItemName) => {
      switch (menuItemName) {
        case 'edit':
          setSelectedOption('edit');
          toggleDialogue('editMessage', 'show');
          break;
        case 'delete':
          toggleDialogue('confirmDelete', 'show');
          break;
        case 'splitBelow':
          toggleDialogue('splitConversation', 'show');
          break;
        case 'addMessageBelow':
          toggleDialogue('addMessageBelow', 'show');
          break;
        case 'addEmoteBelow':
          toggleDialogue('addEmoteBelow', 'show');
          break;
        case 'addSwarmBelow':
          toggleDialogue('addSwarmBelow', 'show');
          break;
        case 'giveMoneyBelow':
          toggleDialogue('giveMoneyBelow', 'show');
          break;
        case 'giveItemBelow':
          toggleDialogue('giveItemBelow', 'show');
          break;
        case 'selectItemBelow':
          toggleDialogue('selectItemBelow', 'show');
          break;
        default:
          break;
      }
      setAnchorEl(null);
    },
    [setSelectedOption, toggleDialogue, setAnchorEl]
  );

  const handleDialogueFormSubmit = useCallback(
    (data) => {
      switch (selectedOption) {
        case 'addAbove':
          handleAddAbove(data);
          break;
        case 'addBelow':
          handleAddBelow(data, additionalBelowOffset);
          break;
        case 'edit':
          handleEdit(data);
          break;
        default:
          break;
      }
    },
    [
      handleAddAbove,
      handleAddBelow,
      handleEdit,
      selectedOption,
      additionalBelowOffset,
    ]
  );

  const { typeString, editDialogue } = useMemo(() => {
    let typeString;
    let editDialogue;

    switch (message.type) {
      case 'message':
        typeString = 'Message';
        editDialogue = (
          <DialogueMessageDialogue
            title="Edit Conversation"
            open={dialogues['editMessage']}
            onClose={() => {
              toggleDialogue('editMessage', 'hide');
            }}
            isEdit={selectedOption === 'edit'}
            messageData={selectedOption === 'edit' ? message : {}}
            creationHandler={(data, createAndContinue) => {
              handleDialogueFormSubmit(data, additionalBelowOffset);
              if (!createAndContinue) {
                toggleDialogue('editMessage', 'hide');
              }
            }}
          />
        );
        break;

      case 'swarm':
        typeString = 'Swarm';
        editDialogue = (
          <GenericDialogue
            title="Edit Swarm"
            open={dialogues['editMessage']}
            onClose={() => toggleDialogue('editMessage', 'hide')}
          >
            <CreateSwarmForm
              initialSwarmData={message.swarmData}
              isEdit={true}
              handleSubmit={(data) => {
                toggleDialogue('editMessage', 'hide');
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case 'give_item':
        typeString = 'Give Item Message';
        editDialogue = (
          <GenericDialogue
            title="Edit Give Item Message"
            open={dialogues['editMessage']}
            onClose={() => toggleDialogue('editMessage', 'hide')}
          >
            <GiveItemFromDialogueForm
              data={message}
              buttonText="Edit"
              onSubmit={(data) => {
                toggleDialogue('editMessage', 'hide');
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case 'give_money':
        typeString = 'Give Money Message';
        editDialogue = (
          <GenericDialogue
            title="Edit Give Money Message"
            open={dialogues['editMessage']}
            onClose={() => toggleDialogue('editMessage', 'hide')}
          >
            <GiveMoneyFromDialogueForm
              data={message}
              buttonText="Edit"
              onSubmit={(data) => {
                toggleDialogue('editMessage', 'hide');
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      case 'emote':
        typeString = 'Emote';
        editDialogue = <React.Fragment />;
        break;

      case 'pick_item':
        typeString = 'Pick Item message';
        editDialogue = (
          <GenericDialogue
            title="Edit pick item"
            open={dialogues['editMessage']}
            onClose={() => toggleDialogue('editMessage', 'hide')}
            maxWidth="lg"
          >
            <PickItemFromDialogueForm
              buttonText="Edit"
              data={message}
              onSubmit={(data) => {
                toggleDialogue('editMessage', 'hide');
                handleDialogueFormSubmit(data);
              }}
            />
          </GenericDialogue>
        );
        break;

      default:
        typeString = '';
    }
    return { typeString, editDialogue };
  }, [
    dialogues,
    handleDialogueFormSubmit,
    message,
    selectedOption,
    toggleDialogue,
    additionalBelowOffset,
  ]);

  return (
    <div>
      {/* Button that shows the menu */}
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => handleMenuOpen(e)}
        size="large"
      >
        <MoreVert />
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
            onClick={(e) => handleMenuSelect(e, 'edit')}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
        )}
        <MenuItem onClick={(e) => handleMenuSelect(e, 'delete')}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={(e) => handleMenuSelect(e, 'splitBelow')}>
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          <ListItemText primary="Split From This" />
        </MenuItem>
        <Divider />

        <AddBelowMenuOptions
          addMessageBelowSelected={(e) =>
            handleMenuSelect(e, 'addMessageBelow')
          }
          addEmoteBelowSelected={(e) => handleMenuSelect(e, 'addEmoteBelow')}
          addSwarmBelowSelected={(e) => handleMenuSelect(e, 'addSwarmBelow')}
          giveMoneyBelowSelected={(e) => handleMenuSelect(e, 'giveMoneyBelow')}
          giveItemBelowSelected={(e) => handleMenuSelect(e, 'giveItemBelow')}
          selectItemBelowSelected={(e) =>
            handleMenuSelect(e, 'selectItemBelow')
          }
        />
      </Menu>

      {/* Delete Dialogue */}
      <ConfirmationDialogue
        message={`Delete the ${typeString}?`}
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDelete();
          toggleDialogue('confirmDelete', 'hide');
        }}
      />

      {/* Edit Message Form */}
      {editDialogue}

      {/* Add Message Below Form */}
      <DialogueMessageDialogue
        title="Add conversation below"
        open={dialogues['addMessageBelow']}
        onClose={() => {
          toggleDialogue('addMessageBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
        creationHandler={(data, createAndContinue) => {
          handleAddBelow(data, additionalBelowOffset);
          if (!createAndContinue) {
            toggleDialogue('addMessageBelow', 'hide');
            updateAdditionalBelowOffset(0);
          } else {
            updateAdditionalBelowOffset(additionalBelowOffset + 1);
          }
        }}
      />

      {/* Add emote below form */}
      <GenericDialogue
        title="Add emote below"
        open={dialogues['addEmoteBelow']}
        onClose={() => {
          toggleDialogue('addEmoteBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
      >
        <CreateEmoteForm
          creationHandler={(data) => {
            handleAddBelow(data, additionalBelowOffset);
            updateAdditionalBelowOffset(0);
            toggleDialogue('addEmoteBelow', 'hide');
          }}
        />
      </GenericDialogue>

      {/* Add swarm below form */}
      <GenericDialogue
        title="Add swarm below"
        open={dialogues['addSwarmBelow']}
        onClose={() => {
          toggleDialogue('addSwarmBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
      >
        <CreateSwarmForm
          handleSubmit={(data) => {
            handleAddBelow(data, additionalBelowOffset);
            updateAdditionalBelowOffset(0);
            toggleDialogue('addSwarmBelow', 'hide');
          }}
        />
      </GenericDialogue>

      {/* Give money below */}
      <GenericDialogue
        title="Give money below"
        open={dialogues['giveMoneyBelow']}
        onClose={() => {
          toggleDialogue('giveMoneyBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
      >
        <GiveMoneyFromDialogueForm
          onSubmit={(data) => {
            handleAddBelow(data, additionalBelowOffset);
            toggleDialogue('giveMoneyBelow', 'hide');
            updateAdditionalBelowOffset(0);
          }}
        />
      </GenericDialogue>

      {/* Give item below */}
      <GenericDialogue
        title="Give item below"
        open={dialogues['giveItemBelow']}
        onClose={() => {
          toggleDialogue('giveItemBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
      >
        <GiveItemFromDialogueForm
          onSubmit={(data) => {
            handleAddBelow(data, additionalBelowOffset);
            toggleDialogue('giveItemBelow', 'hide');
            updateAdditionalBelowOffset(0);
          }}
        />
      </GenericDialogue>

      {/* Pick item below */}
      <GenericDialogue
        title="Pick item below"
        open={dialogues['selectItemBelow']}
        onClose={() => {
          toggleDialogue('selectItemBelow', 'hide');
          updateAdditionalBelowOffset(0);
        }}
      >
        <PickItemFromDialogueForm
          onSubmit={(data) => {
            handleAddBelow(data, additionalBelowOffset);
            toggleDialogue('selectItemBelow', 'hide');
            updateAdditionalBelowOffset(0);
          }}
        />
      </GenericDialogue>

      {/* Split Conversation Form */}
      <GenericDialogue
        title="Splitted Converation Name"
        open={dialogues['splitConversation']}
        onClose={() => toggleDialogue('splitConversation', 'hide')}
        maxWidth="sm"
      >
        <CreateConversationForm
          creationHandler={(conversationName) => {
            toggleDialogue('splitConversation', 'hide');
            handleSplitBelow(conversationName);
          }}
        />
      </GenericDialogue>
    </div>
  );
};

export default DialogueMessageToolbar;
