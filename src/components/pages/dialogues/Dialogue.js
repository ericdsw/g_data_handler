import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField,
    Button,
    Fab,
    Icon
} from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import ConversationContainer from '../../containers/DialogueConversationContainer';

import { NoConversationsNotifier } from './elements';
import { CreateConversationForm } from './forms';

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
    },
    mergeFab: {
        position: 'fixed',
        right: 16,
        bottom: 16,
        margin: theme.spacing.unit
    }
});

const Dialogue = props => {

    const { 
        fileName, dialogueData, classes, 
    } = props;
    
    const { handleFileNameChange, handleAddConversation } = props;

    const [dialogues, toggleDialogue] = useDialogueManager('addConversation');

    return (
        <React.Fragment>
            <Grid
                className={classes.root}
                container
                spacing={16}
            >
                {/* File Name Manager */}
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

                {/* The conversation list */}
                <Grid item xs={12}>
                    <NoConversationsNotifier 
                        conversations={dialogueData.conversations} 
                    />
                    {dialogueData.conversations.map(conversationId => (
                        <ConversationContainer
                            key={conversationId}
                            conversationId={conversationId}
                        />
                    ))}
                </Grid>

                {/* Additional Add Conversation Button */}
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

            {/* Merge Conversations Button */}
            <Fab 
                color='primary' 
                aria-label='Merge Conversations'
                className={classes.mergeFab}
            >
                <Icon>merge_type</Icon>
            </Fab>

            {/* Conversation Form */}
            <GenericDialogue
                title='Create Conversation'
                open={dialogues['addConversation']}
                onClose={() => toggleDialogue('addConversation', 'hide')}
                maxWidth='sm'
            >
                <CreateConversationForm
                    creationHandler={conversationName => {
                        handleAddConversation(conversationName);
                        toggleDialogue('addConversation', 'hide');
                    }}
                />
            </GenericDialogue>

        </React.Fragment>
    );
}

export default withStyles(styles)(Dialogue);

