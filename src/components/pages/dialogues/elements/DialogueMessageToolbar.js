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

import { 
    CreateDialogueMessageForm,
    CreateConversationForm,
    CreateSwarmForm
} from '../forms';


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
        'confirmDelete', 'editMessage', 'addEmote', 'splitConversation'
    );

    const [selectedOption, setSelectedOption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    // Anchor Management

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleMenuSelect(event, menuItemName) {
        
        switch(menuItemName) {
            case 'edit':
                setSelectedOption('edit');
                toggleDialogue('editMessage', 'show')
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

    let typeString;
    let editDialogue;

    switch(message.type) {
        case 'message':
            typeString = 'Message';
            editDialogue = (
                <GenericDialogue
                    title='Edit Conversation'
                    open={dialogues['editMessage']}
                    onClose={() => toggleDialogue('editMessage', 'hide')}
                >
                    <CreateDialogueMessageForm
                        isEdit={selectedOption === 'edit'}
                        messageData={(selectedOption === 'edit') ? message : {}}
                        creationHandler={(data, createAndContinue) => {
                            if (! createAndContinue) {
                                toggleDialogue('editMessage', 'hide');
                            }
                            handleDialogueFormSubmit(data);
                        }}
                    />
                </GenericDialogue>
            );
            break;
        case 'swarm':
            typeString = 'Swarm';
            editDialogue = (
                <GenericDialogue
                    title='Edit Swarm'
                    open={dialogues['editMessage']}
                    onClose={() => toggleDialogue('editMessage', 'hide')}
                >
                    <CreateSwarmForm
                        initialSwarmData={message.swarmData}
                        isEdit={true}
                        handleSubmit={data => {
                            toggleDialogue('editMessage', 'hide');
                            handleDialogueFormSubmit(data);
                        }}
                    />
                </GenericDialogue>
            );
            break;
        case 'emote':
            typeString = 'Emote';
            editDialogue = <React.Fragment />
            break;
        default:
            typeString = '';
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
