import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Icon,
    Tooltip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogueMessage from './DialogueMessage';
import CreateDialogueMessageForm from './elements/CreateDialogueMessageForm';
import { 
    addMessageToConversation,
    deleteDialogueConversation
} from '../actions/dialogueActions';

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

class DialogueConversation extends React.Component {

    state = {
        messageFormOpen: false,
        editMessageFormOpen: false,
    }

    handleDelete = event => {
        event.stopPropagation();
        this.props.deleteDialogueConversation(
            this.props.conversationName
        );
    }

    handleMessageFormOpen = () => {
        this.setState({messageFormOpen: true});
    }

    handleMessageFormClose = () => {
        this.setState({messageFormOpen: false});
    }

    createMessage = (messageData, shouldContinue) => {
        if (!shouldContinue) {
            this.setState({messageFormOpen: false});
        }
        this.props.addMessageToConversation(
            this.props.conversationName,
            messageData
        );
    }

    render() {
        const { conversationName, messages, classes } = this.props;
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
                                        onClick={this.handleDelete}
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
                            spacing={8}>
                                {messages.map((message, index) => (
                                    <Grid item xs 
                                        key={index}
                                        className={classes.messageElement}>
                                        <DialogueMessage 
                                            offset={index}
                                            conversation={conversationName}
                                            message={message}/>
                                    </Grid>
                                ))}
                                <Grid item xs>
                                    <Button 
                                        style={{marginTop: 8}}
                                        color='primary'
                                        variant='contained'
                                        onClick={this.handleMessageFormOpen}>
                                        Add message to conversation
                                    </Button>
                                </Grid>
                        </Grid>
                    </div>
                    
                </ExpansionPanelDetails>

                <Dialog
                    open={this.state.messageFormOpen}
                    onClose={this.handleMessageFormClose}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>
                        Add Message
                    </DialogTitle>
                    <DialogContent>
                        <CreateDialogueMessageForm 
                            creationHandler={this.createMessage}/>
                    </DialogContent>
                </Dialog>

           </ExpansionPanel>
        );
    }
}

export default connect(null, {
    addMessageToConversation,
    deleteDialogueConversation
})(
    withSnackbar(
        withStyles(styles)(DialogueConversation)
    )
);
