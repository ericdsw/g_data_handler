import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Grid,
    Button,
    IconButton,
    Icon,
    Tooltip,
    Checkbox
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDialogue, GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueMessageContainer from '../../containers/DialogueMessageContainer';

import {
    CreateDialogueMessageForm,
    CreateEmoteForm
} from './forms';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
        flexBasis: '33.3%',
        flexShrink: 0,
    },
    subHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.text.secondary,
    },
    messageContainer: {
        flexGrow: 1,
    },
    messageElement: {
        width: '100%',
    }
});

const DialogueConversation = props => {

    const { conversation, classes } = props;
    const { handleDeleteConversation, handleAddToConversation } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'addMessage', 'addEmote'
    );

    function onDeleteClick(event) {
        event.stopPropagation();
        toggleDialogue('confirmDelete', 'show');
    }

    return (
        <ExpansionPanel style={{width: '100%'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems='center'>

                    {/* Title Data */}
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <Grid item>
                                <Checkbox />
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.heading}>
                                    <b>Name: {conversation.conversationName}</b>
                                </Typography>
                                <Typography className={classes.subHeading}>
                                    ({conversation.messages.length} {
                                        (conversation.messages.length === 1) ?
                                            'message' : 'messages'
                                    })
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Delete Button */}
                    <Grid item xs={12} md={6}>
                        <Grid container justify='flex-end'>
                            <Tooltip title='Delete Conversation' enterDelay={200}>
                                <IconButton onClick={e => onDeleteClick(e)}>
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>

                </Grid>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <div className={classes.messageContainer}>
                    <Grid 
                        container 
                        direction='column'
                        alignItems='center'
                        spacing={8}
                    >
                        {conversation.messages.map(messageId => (
                            <Grid 
                                item xs 
                                key={messageId}
                                className={classes.messageElement}
                            >
                                <DialogueMessageContainer 
                                    conversationId={conversation.id}
                                    messageId={messageId}
                                />
                            </Grid>
                        ))}
                        <Grid item xs>
                            <Button 
                                style={{marginTop: 8}}
                                color='primary'
                                variant='contained'
                                onClick={() => {
                                    toggleDialogue('addMessage', 'show');
                                }}
                            >
                                Add message
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                style={{marginTop: 8}}
                                color='secondary'
                                variant='contained'
                                onClick={() => {
                                    toggleDialogue('addEmote', 'show');
                                }}
                            >
                                Add emote
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                
            </ExpansionPanelDetails>

            {/* Create Message Form */}
            <GenericDialogue
                title='Create Conversation'
                open={dialogues['addMessage']}
                onClose={() => toggleDialogue('addMessage', 'hide')}
            >
                <CreateDialogueMessageForm
                    creationHandler={(data, createAndContinue) => {
                        if (! createAndContinue) {
                            toggleDialogue('addMessage', 'hide');
                        }
                        handleAddToConversation(data);
                    }}
                    isEdit={false}
                />
            </GenericDialogue>

            {/* Create Emote form */}
            <GenericDialogue
                title='Create Emote'
                open={dialogues['addEmote']}
                onClose={() => toggleDialogue('addEmote', 'hide')}
                maxWidth='sm'
            >
                <CreateEmoteForm
                    creationHandler={data => {
                        toggleDialogue('addEmote', 'hide');
                        handleAddToConversation(data);
                    }}
                /> 
            </GenericDialogue>

            {/* Delete Confirmation */}
            <ConfirmationDialogue
                message='Delete the current conversation?'
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDeleteConversation();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

       </ExpansionPanel>
    );
}

export default withStyles(styles)(DialogueConversation);

