import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    IconButton, Icon, Tooltip, Hidden, Menu, MenuItem
} from '@material-ui/core';
import { CreateDialogueMessageForm } from '../forms';
import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';

const styles = theme => ({
    button: {
        color: 'white'
    }
});

const DialogueMessageToolbar = props => {

    const { classes, message } = props;

    const { handleAddAbove, handleAddBelow, handleEdit, handleDelete } = props; 

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'editMessage', 'addAbove', 'addBelow'
    );

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleMenuSelect(menuItemName) {
        switch(menuItemName) {
            case 'addAbove':
                toggleDialogue('addAbove', 'show');
                break;
            case 'addBelow':
                toggleDialogue('addBelow', 'show');
                break;
            case 'edit':
                toggleDialogue('editMessage', 'show');
                break;
            case 'delete':
                toggleDialogue('confirmDelete', 'show');
                break;
            default:
                break;
        }
        setAnchorEl(null);
    }

    return (
        <div>
            <Hidden xsDown implementation='css'>
                <Tooltip title='Add Message Above' enterDelay={200}>
                    <IconButton
                        className={classes.button}
                        aria-label='Add Above'
                        onClick={() => toggleDialogue('addAbove', 'show')}
                    >
                        <Icon>vertical_align_top</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Add Message Below' enterDelay={200}>
                    <IconButton
                        className={classes.button}
                        aria-label='Add Below'
                        onClick={() => toggleDialogue('addBelow', 'show')}
                    >
                        <Icon>vertical_align_bottom</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Edit Message' enterDelay={200}>
                    <IconButton
                        className={classes.button}
                        aria-label='Edit Message'
                        onClick={() => toggleDialogue('editMessage', 'show')}
                    >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete Message' enterDelay={200}>
                    <IconButton
                        className={classes.button}
                        aria-label='Delete Message'
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>

                <GenericDialogue
                    title='Add Message Above'
                    open={dialogues['addAbove']}
                    onClose={() => toggleDialogue('addAbove', 'hide')}
                >
                    <CreateDialogueMessageForm
                        creationHandler={(messageData, createAndContinue) => {
                            handleAddAbove(messageData);
                            if (! createAndContinue) {
                                toggleDialogue('addAbove', 'hide');
                            }
                        }}
                    />
                </GenericDialogue>

                <GenericDialogue
                    title='Add Message Below'
                    open={dialogues['addBelow']}
                    onClose={() => toggleDialogue('addBelow', 'hide')}
                >
                    <CreateDialogueMessageForm
                        creationHandler={(messageData, createAndContinue) => {
                            handleAddBelow(messageData);
                            if (! createAndContinue) {
                                toggleDialogue('addBelow', 'hide');
                            }
                        }}
                    />
                </GenericDialogue>

                <GenericDialogue
                    title='Edit Message'
                    open={dialogues['editMessage']}
                    onClose={() => toggleDialogue('editMessage', 'hide')}
                >
                    <CreateDialogueMessageForm 
                        isEdit
                        messageData={message}
                        creationHandler={(data, createAndContinue) => {
                            handleEdit(data);
                            toggleDialogue('editMessage', 'hide');
                        }}
                    />
                </GenericDialogue>

                <ConfirmationDialogue
                    message='Delete the current message?'
                    isOpen={dialogues['confirmDelete']}
                    handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                    handleConfirm={() => {
                        handleDelete();
                        toggleDialogue('confirmDelete', 'hide');
                    }}
                />
            </Hidden>
            <Hidden smUp implementation='css'>
                <IconButton
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuOpen(e)}
                >
                    <Icon>more_vert</Icon>
                </IconButton>
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMenuSelect('addAbove')}>
                        Add Above
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect('addBelow')}>
                        Add Below
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect('edit')}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect('delete')}>
                        Delete
                    </MenuItem>
                </Menu>
            </Hidden>
        </div>
    );
}

export default withStyles(styles)(DialogueMessageToolbar);
