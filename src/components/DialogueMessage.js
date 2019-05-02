import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    IconButton,
    Chip,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import CreateDialogueMessageForm from './elements/CreateDialogueMessageForm';
import { speakerSchema } from '../globals';
import {
    editConversationMessage,
    deleteConversationMessage
} from '../actions/dialogueActions';

const styles = theme => ({
    messageContainer: {
        width: '100%',
        backgroundColor: grey[800],
    },
    details: {
        display: 'flex',
    },
    avatar: {
        width: 70,
        height: 70,
    },
    title: {
        color: 'white',
        marginRight: 30,
    },
    subTitle: {
        color: '#ccc',
    },
    content: {
        flex: 4,
        color: 'white'
    },
    contentImage: {
        marginRight: 10,
    },
    button: {
        color: 'white'
    },
    chipContainer: {
        borderTop: '1px solid white',
        marginTop: 12,
        paddingTop: 12,
    },
    chip: {
        marginRight: theme.spacing.unit,
    }
})

class DialogueMessage extends React.Component {

    state = {
        editMessageFormOpen: false
    }

    handleEditMessageFormClose = () => {
        this.setState({editMessageFormOpen: false});
    }

    handleEditMessageFormOpen = () => {
        this.setState({editMessageFormOpen: true});
    }

    handleDeleteMessage = () => {
        const { conversation, offset } = this.props;
        this.props.deleteConversationMessage(conversation, offset);
    }

    editMessage = (messageData, shouldContinue) => {
        const { conversation, offset } = this.props;
        this.setState({editMessageFormOpen: false});
        this.props.editConversationMessage(conversation, offset, messageData);
    }

    render() {
        const { message, classes } = this.props;

        let usedImagePath, speakerName;

        // Extract data from speaker
        if (message.speaker) {
            usedImagePath = speakerSchema[message.speaker].image;
            speakerName = speakerSchema[message.speaker].name;
        }

        if (message.image) {
            usedImagePath = message.image;
        }
        if (message.name) {
            speakerName = message.name;
        }

        let extraChips = [];
        const extras = [
            'location', 
            'voice_file', 
            'control_level', 
            'autopilot_offset'
        ];
        extras.forEach(extraProperty => {
            if (message.hasOwnProperty(extraProperty)) {
                extraChips.push(
                    <Chip 
                        key={extraProperty} 
                        className={classes.chip}
                        label={`${extraProperty}: ${message[extraProperty]}`} 
                    />
                );
            } 
        });

        let choicesChips = [];
        if (message.choices) {
            choicesChips = message.choices.map(currentChoice => {
                if (currentChoice.next_message) {
                    const label = `${currentChoice.key}: ${currentChoice.value}`;
                    return (
                        <Tooltip 
                            key={currentChoice.key}
                            title={`Next Message: ${currentChoice.next_message}`}
                        >
                            <Chip
                                className={classes.chip}
                                color='primary'
                                label={label} 
                            />
                            </Tooltip>
                        );
                } else {
                    return (
                        <Chip
                            key={currentChoice.key}
                            className={classes.chip}
                            label={`${currentChoice.key}: ${currentChoice.value}`} 
                        />
                    );

                }
            });
        }

        return (
            <Card className={classes.messageContainer}>
                <CardContent>
                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                        <div style={{flex:1}}>
                            {message.speaker &&
                                <Typography
                                    variant='caption'
                                    className={classes.subTitle}
                                    align='left'
                                >
                                    Speaker: {message.speaker}
                                </Typography>
                            }
                            <Typography
                                variant='h6'
                                className={classes.title}
                                align='left'
                                gutterBottom
                            >
                                {speakerName}
                            </Typography>
                        </div>
                        <div>
                            <Tooltip
                                title='Edit message'
                                enterDelay={200}
                            >
                                <IconButton 
                                    className={classes.button}
                                    aria-label='Edit'
                                    onClick={this.handleEditMessageFormOpen}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title='Delete Message'
                                enterDelay={200}
                            >
                                <IconButton 
                                    className={classes.button} 
                                    aria-label='Delete'
                                    onClick={this.handleDeleteMessage}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    
                    <div className={classes.details}>
                        {usedImagePath &&
                            <div className={classes.contentImage}>
                                <Avatar
                                    className={classes.avatar}
                                    src={`/images/${usedImagePath}`} 
                                />
                            </div>
                        }
                        <div className={classes.content}>
                            {message.message}
                        </div>
                    </div>

                    {extraChips.length > 0 &&
                        <div className={classes.chipContainer}>
                            {extraChips}
                        </div>
                    }

                    {choicesChips.length > 0 &&
                        <div className={classes.chipContainer}>
                            <label style={{color:'white'}}>
                                Choices: 
                            </label> 
                            &nbsp;
                            {choicesChips}
                        </div>
                    }

                </CardContent>

                <Dialog
                    open={this.state.editMessageFormOpen}
                    onClose={this.handleEditMessageFormClose}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Edit Message
                    </DialogTitle>
                    <DialogContent>
                        <CreateDialogueMessageForm 
                            isEdit
                            messageData={message}
                            creationHandler={this.editMessage}
                        />
                    </DialogContent>
                </Dialog>

            </Card>
        );
    }
}

export default connect(null, {
    editConversationMessage,
    deleteConversationMessage
})(
    withSnackbar(
        withStyles(styles)(DialogueMessage)
    )
);
