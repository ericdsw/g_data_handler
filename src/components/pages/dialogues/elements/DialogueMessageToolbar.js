import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Icon, Tooltip } from '@material-ui/core';
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

    return (
        <div>
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

        </div>
    );
}

export default withStyles(styles)(DialogueMessageToolbar);
