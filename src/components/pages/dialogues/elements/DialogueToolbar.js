import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';
import { CreateConversationForm } from '../forms';

const styles = theme => ({
    deleteButton: {
        color: red[500]
    },
    defaultButton: {
        color: blue[500]
    }
});

const DialogueToolbar = props => {

    const { classes } = props;

    const { handleExport, handleClear, handleAddConversation } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'addConversation', 'confirmDelete'
    );

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={6}>
                    <Typography align='left'>
                        <Button 
                            onClick={() => {
                                toggleDialogue('addConversation', 'show')
                            }}
                            color='primary'
                            className={classes.defaultButton}
                        >
                            Add Conversation
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align='right'>
                        <Button
                            onClick={() => handleExport()}
                            color='secondary'
                        >
                            Export
                        </Button>
                        <Button 
                            className={classes.deleteButton}
                            color='secondary'
                            onClick={() => toggleDialogue('confirmDelete', 'show')}
                        >
                            Clear Dialogue File
                        </Button>
                    </Typography>
                </Grid>
            </Grid>

            <GenericDialogue
                title='Create Conversation'
                open={dialogues['addConversation']}
                onClose={() => toggleDialogue('addConversation', 'hide')}
            >
                <CreateConversationForm
                    creationHandler={conversationName => {
                        handleAddConversation(conversationName);
                        toggleDialogue('addConversation', 'hide');
                    }}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message='Delete the current loaded dialogues?'
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleClear();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

        </React.Fragment>
    );
}

export default withStyles(styles)(DialogueToolbar);

