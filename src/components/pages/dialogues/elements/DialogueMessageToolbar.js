import React , { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    IconButton, 
    Icon, 
    Menu, 
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';
import { CreateDialogueMessageForm, CreateConversationForm } from '../forms';
import DialogueConversationContainer from '../../../containers/DialogueConversationContainer';


const styles = theme => ({
    button: {
        color: 'white'
    }
});

const DialogueMessageToolbar = props => {

    // Parameters
    const { message, omitEdit } = props;

    // Methods
    const { 
        handleAddAbove, handleAddBelow, handleEdit, handleDelete,
        handleSplitBelow 
    } = props; 

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'addMessage', 'addEmote', 'splitConversation'
    );

    const [selectedOption, setSelectedOption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeAnchorEl, setTypeAnchorEl] = useState(null);

    // Anchor Management

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleTypeMenuOpen(event) {
        setTypeAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleTypeClose() {
        setTypeAnchorEl(null);
    }

    function handleMenuSelect(event, menuItemName) {
        
        switch(menuItemName) {
            case 'addAbove':
            case 'addBelow':
                setSelectedOption(menuItemName);
                handleTypeMenuOpen(event);
                break;
            case 'edit':
                setSelectedOption('edit');
                toggleDialogue('addMessage', 'show')
                handleEdit();
                break;
            case 'delete':
                toggleDialogue('confirmDelete', 'show');
                break;
            case 'splitBelow':
                toggleDialogue('splitConversation', 'show');
                break;
            default:
                break;
        }
        setAnchorEl(null);
    }

    function handleTypeMenuSelect(itemName) {
        if (itemName === 'emote') {
            toggleDialogue('addEmote', 'show');
        } else {
            toggleDialogue('addMessage', 'show');
        }
        setTypeAnchorEl(null);
    }

    // Form Submit Management

    function handleDialogueFormSubmit(data) {
        switch (selectedOption) {
            case 'addAbove':
                handleAddAbove(data);
                break;
            case 'addBelow':
                handleAddBelow(data);
                break;
            case 'edit':
                handleEdit(data);
                break;
            default:
                break;
        }
    }

    return (
        <div>

            {/* Button that shows the menu */}
            <IconButton
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={(e) => handleMenuOpen(e)}
            >
                <Icon>more_vert</Icon>
            </IconButton>

            {/* Menu Elements */}
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {!omitEdit && 
                    <MenuItem 
                        aria-controls='simple-type-menu'
                        aria-haspopup='true'
                        onClick={(e) => handleMenuSelect(e, 'edit')}
                    >
                        <ListItemIcon>
                            <Icon>edit</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </MenuItem>
                }
                <MenuItem onClick={(e) => handleMenuSelect(e, 'delete')}>
                    <ListItemIcon>
                        <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={e => handleMenuSelect(e, 'splitBelow')}>
                    <ListItemIcon>
                        <Icon>vertical_align_bottom</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Split From This" />
                </MenuItem>
            </Menu>

            {/* Creation Type menu elements */}
            <Menu
                id='simple-type-menu'
                anchorEl={typeAnchorEl}
                open={Boolean(typeAnchorEl)}
                onClose={handleTypeClose}
            >
                <MenuItem onClick={() => handleTypeMenuSelect('message')}>
                    Message
                </MenuItem>
                <MenuItem onClick={() => handleTypeMenuSelect('emote')}>
                    Emote
                </MenuItem>
           </Menu>

            {/* Delete Dialogue */}
            <ConfirmationDialogue
                message={`Delete the ${message.is_emote ? 'emote' : 'message'}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDelete();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

            {/* Create Message Form */}
            <GenericDialogue
                title='Create Conversation'
                open={dialogues['addMessage']}
                onClose={() => toggleDialogue('addMessage', 'hide')}
            >
                <CreateDialogueMessageForm
                    isEdit={selectedOption === 'edit'}
                    messageData={(selectedOption === 'edit') ? message : {}}
                    creationHandler={(data, createAndContinue) => {
                        if (! createAndContinue) {
                            toggleDialogue('addMessage', 'hide');
                        }
                        handleDialogueFormSubmit(data);
                    }}
                />
            </GenericDialogue>

            {/* Split Conversation Form */}
            <GenericDialogue
                title='Splitted Converation Name'
                open={dialogues['splitConversation']}
                onClose={() => toggleDialogue('splitConversation', 'hide')}
                maxWidth='sm'
            >
                <CreateConversationForm
                    creationHandler={conversationName => {
                        toggleDialogue('splitConversation', 'hide');
                        handleSplitBelow(conversationName);
                    }}
                />
            </GenericDialogue>

        </div>
    );
}

export default withStyles(styles)(DialogueMessageToolbar);
