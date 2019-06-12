import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import { CreateConversationForm } from './forms';
import DialogueConversationContainer from '../../containers/DialogueConversationContainer';

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
    emptyText: {
        padding: 32,
        width: '100%'
    },
});

const Dialogue = props => {

    const { fileName, conversations, classes } = props;
    const { handleFileNameChange, handleAddConversation } = props;

    const [dialogues, toggleDialogue] = useDialogueManager('addConversation');
    
    const conversationNames = Object.keys(conversations);

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
                    {conversationNames.length === 0 && 
                        <Typography 
                            variant='h5' 
                            color='textSecondary' 
                            align='center' 
                            className={classes.emptyText}
                        >
                            No conversations for this dialogue
                        </Typography>
                    }
                    {conversationNames.map(name => (
                        <DialogueConversationContainer
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

        </React.Fragment>
    );
}

export default withStyles(styles)(Dialogue);

