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
    Tooltip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueMessageContainer from '../../containers/DialogueMessageContainer';

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

    const { conversationName, messages, classes } = props;

    const { handleDeleteConversation, handleAddToConversation } = props;

    const [dialogues, toggleDialogue] = useDialogueManager('confirmDelete');

    return (
        <ExpansionPanel style={{width: '100%'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems='center'>
                    <Grid item xs>
                        <Typography className={classes.heading}>
                            <b>Name: {conversationName}</b>
                        </Typography>
                        <Typography className={classes.subHeading}>
                            ({messages.length} {
                                (messages.length === 1) ?
                                    'message' : 'messages'
                            })
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Grid container justify='flex-end'>
                            <Tooltip
                                title='Delete Conversation'
                                enterDelay={200}
                            >
                                <IconButton 
                                    onClick={e => {
                                        e.stopPropagation();
                                        toggleDialogue('confirmDelete', 'show');
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={classes.messageContainer}>
                    <Grid container 
                        direction='column'
                        alignItems='center'
                        spacing={8}
                    >
                            {messages.map((message, index) => (
                                <Grid 
                                    item xs 
                                    key={index}
                                    className={classes.messageElement}
                                >
                                    <DialogueMessageContainer 
                                        offset={index}
                                        conversation={conversationName}
                                        message={message}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs>
                                <Button 
                                    style={{marginTop: 8}}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => handleAddToConversation(false)}
                                >
                                    Add message
                                </Button>
                                &nbsp;
                                <Button
                                    style={{marginTop: 8}}
                                    color='secondary'
                                    variant='contained'
                                    onClick={() => handleAddToConversation(true)}
                                >
                                    Add emote
                                </Button>
                            </Grid>
                    </Grid>
                </div>
                
            </ExpansionPanelDetails>

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

