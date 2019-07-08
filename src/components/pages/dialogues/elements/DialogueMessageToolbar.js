import React , { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    IconButton, Icon, Tooltip, Hidden, Menu, MenuItem
} from '@material-ui/core';
import { 
    CreateDialogueMessageForm,
    CreateEmoteForm
} from '../forms';
import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';

const styles = theme => ({
    button: {
        color: 'white'
    }
});

const DialogueMessageToolbar = props => {

    const { classes, message, omitEdit } = props;

    const { handleAddAbove, handleAddBelow, handleEdit, handleDelete } = props; 

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'messageDialogue', 'emoteDialogue'
    );

    const [dialogueMessageMode, toggleDialogueMessageMode] = useState('');
    const [dialogueEmoteMode, toggleDialogueEmoteMode] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeAnchorEl, setTypeAnchorEl] = useState(null);

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

    function getDialogueMessageTitle() {
        switch (dialogueMessageMode) {
            case 'addAbove': 
                return 'Add Message Above';
            case 'addBelow': 
                return 'Add Message Below';
            default: 
                return 'Edit Message';
        }
    }

    function getDialogueEmoteTitle() {
        switch (dialogueEmoteMode) {
            case 'addAbove': 
                return 'Add Emote Above';
            case 'addBelow': 
                return 'Add Emote Below';
            default: 
                return 'Edit Emote';
        }
    }

    function getMessageDataForMode() {
        switch (dialogueEmoteMode) {
            case 'addAbove':
            case 'addBelow':
                return null;
            default:
                return message;
        }
    }

    function handleMenuSelect(event, menuItemName) {
        switch(menuItemName) {
            case 'addAbove':
                toggleDialogueMessageMode('addAbove');
                toggleDialogueEmoteMode('addAbove');
                handleTypeMenuOpen(event.currentTarget);
                break;
            case 'addBelow':
                toggleDialogueMessageMode('addBelow');
                toggleDialogueEmoteMode('addAbove');
                handleTypeMenuOpen(event.currentTarget);
                break;
            case 'edit':
                toggleDialogueMessageMode('edit');
                toggleDialogueEmoteMode('edit');
                toggleDialogue('messageDialogue', 'show');
                break;
            case 'delete':
                toggleDialogue('confirmDelete', 'show');
                break;
            default:
                break;
        }
        setAnchorEl(null);
    }

    function handleTypeMenuSelect(itemName) {
        switch (itemName) {
            case 'message':
                toggleDialogue('messageDialogue', 'show');
                break;
            case 'emote':
                toggleDialogue('emoteDialogue', 'show');
                break;
            default:
                break;
        }
        setTypeAnchorEl(null);
    }

    function handleMessageSubmit(messageData, createAndContinue) {
        switch (dialogueMessageMode) {
            case 'addAbove':
                handleAddAbove(messageData);
                break;
            case 'addBelow':
                handleAddBelow(messageData);
                break;
            default:
                handleEdit(messageData);
        }
        toggleDialogue('emoteDialogue', 'hide');
        if (! createAndContinue) {
            toggleDialogue('messageDialogue', 'hide');
        }
    }

    return (
        <div>
            <Hidden xsDown implementation='css'>
                <Tooltip title='Add Above' enterDelay={200}>
                    <IconButton
                        aria-controls='simple-type-menu'
                        aria-haspopup='true'
                        className={classes.button}
                        aria-label='Add Above'
                        onClick={(e) => {
                            toggleDialogueMessageMode('addAbove');
                            toggleDialogueEmoteMode('addAbove');
                            handleTypeMenuOpen(e);
                        }}
                    >
                        <Icon>vertical_align_top</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Add Below' enterDelay={200}>
                    <IconButton
                        aria-controls='simple-type-menu'
                        aria-haspopup='true'
                        className={classes.button}
                        aria-label='Add Below'
                        onClick={(e) => {
                            toggleDialogueMessageMode('addBelow');
                            toggleDialogueEmoteMode('addBelow');
                            handleTypeMenuOpen(e);
                        }}
                    >
                        <Icon>vertical_align_bottom</Icon>
                    </IconButton>
                </Tooltip>
                {!omitEdit &&
                    <Tooltip title='Edit' enterDelay={200}>
                        <IconButton
                            aria-controls='simple-type-menu'
                            aria-haspopup='true'
                            className={classes.button}
                            aria-label='Edit Message'
                            onClick={(e) => {
                                toggleDialogueMessageMode('edit');
                                toggleDialogueEmoteMode('edit');
                                toggleDialogue('messageDialogue', 'show');
                            }}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title='Delete' enterDelay={200}>
                    <IconButton
                        className={classes.button}
                        aria-label='Delete Message'
                        onClick={() => {
                            toggleDialogue('confirmDelete', 'show')
                        }}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
                
            </Hidden>

            <Hidden smUp implementation='css'>
                <IconButton
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuOpen(e)}
                >
                    <Icon>more_vert</Icon>
                </IconButton>
            </Hidden>

            <GenericDialogue
                title={getDialogueMessageTitle()}
                open={dialogues['messageDialogue']}
                onClose={() => toggleDialogue('messageDialogue', 'hide')}
            >
                <CreateDialogueMessageForm
                    messageData={getMessageDataForMode()}
                    creationHandler={(messageData, createAndContinue) => {
                        handleMessageSubmit(messageData, createAndContinue)
                    }}
                />
            </GenericDialogue>

            <GenericDialogue
                title={getDialogueEmoteTitle()}
                open={dialogues['emoteDialogue']}
                onClose={() => toggleDialogue('emoteDialogue', 'hide')}
            >
                <CreateEmoteForm
                    creationHandler={messageData => {
                        handleMessageSubmit(messageData, false);
                    }}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message={`Delete the ${message.is_emote ? 'emote' : 'message'}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDelete();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem 
                    aria-controls='simple-type-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuSelect(e, 'addAbove')}
                >
                    Add Above
                </MenuItem>
                <MenuItem 
                    aria-controls='simple-type-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuSelect(e, 'addAbove')}
                >
                    Add Below
                </MenuItem>
                {!omitEdit && 
                    <MenuItem 
                        aria-controls='simple-type-menu'
                        aria-haspopup='true'
                        onClick={(e) => handleMenuSelect(e, 'edit')}>
                    Edit
                    </MenuItem>
                }
                <MenuItem onClick={(e) => handleMenuSelect(e, 'delete')}>
                    Delete
                </MenuItem>
            </Menu>

            <Menu
                id='simple-type-menu'
                anchorEl={typeAnchorEl}
                keepMounted
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

        </div>
    );
}

export default withStyles(styles)(DialogueMessageToolbar);
