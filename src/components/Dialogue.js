import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import DialogueConversation from './DialogueConversation';
import { 
    Grid, 
    Button, 
    Typography,
    TextField,
    Dialog, 
    DialogTitle, 
    DialogContent
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename
} from '../actions/dialogueActions';
import { CreateConversationForm } from './elements';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
    },
    deleteButton: {
        color: red[500],
    },
    emptyText: {
        padding: 32,
        width: '100%'
    },
});

class Dialogue extends React.Component {

    state = {
        addConversationDialogueOpen: false
    }

    // Handlers

    handleFilenameChange = event => {
        this.props.updateDialogueFilename(event.target.value);
    }

    handleDialogueClose = identifier => () => {
        this.setState({
            [identifier]: false
        });
    }

    handleDialogueOpen = identifier => () => {
        this.setState({
            [identifier]: true
        });
    }

    handleClearDialogue = () => {
        this.props.updateDialogue({
            dialogueData: null,
            fileName: ''
        });
    }

    handleExport = () => {
        const { conversations } = this.props;

        if (Object.keys(conversations).length <= 0) {
            this.props.enqueueSnackbar(
                'Cannot export an empty dialogue file',
                {variant: 'error'}
            );
            return;
        }

        let emptyConversations = 0;
        for (const conversationName in conversations) {
            if (conversations[conversationName].length <= 0) {
                emptyConversations++;
            }
        }
        if (emptyConversations > 0) {
            this.props.enqueueSnackbar(
                `${emptyConversations} conversation${
                    (emptyConversations === 1) ? ' is' : 's are'
                } empty`,
                {variant: 'error'}
            );
            return;
        }

        const data = encodeURIComponent(JSON.stringify(conversations));
        const uri = `data:application/json;charset=utf-8,${data}`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', uri);
        linkElement.setAttribute('download', this.props.fileName);
        linkElement.click();
    }

    // Methods

    addConversation = conversationName => {
        this.setState({addConversationDialogueOpen: false});
        this.props.addDialogueConversation(conversationName);
    }

    // Renderer

    render() {

        const { fileName, conversations, classes } = this.props;

        const conversationElements = Object.keys(conversations).map(name => {
            return (
                <DialogueConversation
                    key={name}
                    conversationName={name}
                    messages={conversations[name]} />
            );
        });

        return (
            <div>
                <Grid
                    className={classes.root}
                    container
                    spacing={16}
                >
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <Button 
                                onClick={
                                    this.handleDialogueOpen(
                                        'addConversationDialogueOpen'
                                    )
                                }
                                color='primary'
                            >
                                Add Conversation
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='right'>
                            <Button
                                onClick={this.handleExport}
                                color='secondary'
                            >
                                Export
                            </Button>
                            <Button 
                                className={classes.deleteButton}
                                color='secondary'
                                onClick={this.handleClearDialogue}
                            >
                                Clear Dialogue File
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='file_name'
                            label='File Name'
                            fullWidth
                            value={fileName}
                            onChange={this.handleFilenameChange}
                            variant='outlined' margin='normal' 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(conversations).length === 0 && 
                                <Typography 
                                    variant='h5' 
                                    color='textSecondary' 
                                    align='center' 
                                    className={classes.emptyText}
                                >
                                    No conversations for this dialogue
                                </Typography>
                        }
                        {conversationElements}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid 
                            container 
                            justify='center'
                        >
                            <Button 
                                color='primary'
                                onClick={
                                    this.handleDialogueOpen(
                                        'addConversationDialogueOpen'
                                    )
                                }
                            >
                                Add Conversation
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.addConversationDialogueOpen}
                    onClose={this.handleDialogueClose(
                        'addConversationDialogueOpen'
                    )}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Add Conversation
                    </DialogTitle>
                    <DialogContent>
                        <CreateConversationForm 
                            creationHandler={this.addConversation}
                        />
                    </DialogContent>
                </Dialog>

            </div>
        );
    }
}

export default connect(null, {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename
})(
    withSnackbar(
        withStyles(styles)(Dialogue)
    )
);
