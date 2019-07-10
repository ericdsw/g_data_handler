import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField,
    Button
} from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import ConversationContainer from '../../containers/DialogueConversationContainer';

import { NoConversationsNotifier } from './elements';
import { 
    CreateConversationForm,
    CreateDialogueMessageForm,
    CreateEmoteForm
} from './forms';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    deleteButton: {
        color: red[500],
    },
    defaultButton: {
        color: blue[500]
    }
});

const Dialogue = props => {

    const { 
        fileName, conversations, classes, 
        editingMessage, editingMessageConversation
    } = props;

    const { 
        handleFormClose, handleFileNameChange, handleAddConversation,
        handleCreateMessage, handleEditMessage,
        handleAdvanceForm
    } = props;

    const messageFormOpen = (
        editingMessage !== null && editingMessageConversation !== '' &&
        !editingMessage.is_emote
    );

    const emoteFormOpen = (
        editingMessage !== null && editingMessageConversation !== '' &&
        editingMessage.is_emote
    );

    const [dialogues, toggleDialogue] = useDialogueManager('addConversation');

    // Called when the message form is submitted
    function handleMessageForm(messageData, createAndContinue) {
        if (!editingMessage.message) {
            handleCreateMessage(messageData);
        } else {
            handleEditMessage(messageData); 
        }
        if (! createAndContinue) {
            handleFormClose() 
        } else {
            handleAdvanceForm()
        }
    }

    // Called when the emote form is submitted
    function handleEmoteForm(messageData) {
        handleCreateMessage(messageData);
        handleFormClose();
    }
    
    return (
        <React.Fragment>
            <Grid
                className={classes.root}
                container
                spacing={16}
            >
                <Grid item xs={12}>
                    <TextField
                        id='file_name'
                        label='File Name'
                        fullWidth
                        value={fileName}
                        onChange={e => handleFileNameChange(e.target.value)}
                        variant='outlined' margin='normal' 
                    />
                </Grid>
                <Grid item xs={12}>
                    <NoConversationsNotifier conversations={conversations} />
                    {Object.keys(conversations).map(name => (
                        <ConversationContainer
                            key={name}
                            conversationName={name}
                            messages={conversations[name]} 
                        />
                    ))}
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Button
                            color='primary'
                            className={classes.defaultButton}
                            onClick={() => {
                                toggleDialogue('addConversation', 'show')
                            }}
                        >
                            Add Conversation
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

            {/* Conversation Form */}
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

            {/* Message form */}
            <GenericDialogue
                title={`${
                    editingMessage && ! editingMessage.message ? 'Create' : 'Edit'
                } Message`}
                open={messageFormOpen}
                onClose={handleFormClose}
            >
                <CreateDialogueMessageForm
                    messageData={editingMessage}
                    creationHandler={handleMessageForm}
                />
            </GenericDialogue>

            {/* Emote Form */}
            <GenericDialogue
                title='Create Emote'
                open={typeof emoteFormOpen !== 'undefined' && emoteFormOpen}
                onClose={handleFormClose}
            >
                <CreateEmoteForm creationHandler={handleEmoteForm} />
            </GenericDialogue>

        </React.Fragment>
    );
}

export default withStyles(styles)(Dialogue);

