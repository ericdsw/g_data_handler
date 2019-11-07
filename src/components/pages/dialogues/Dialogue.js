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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import DialogueConversationContainer from '../../containers/DialogueConversationContainer';

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
        margin: theme.spacing.unit,
        transition: 'transform 0.2s ease'
    }
});

const Dialogue = props => {

    const { 
        fileName, dialogueData, classes, conversationsToMerge 
    } = props;
    
    const { 
        handleFileNameChange, handleAddConversation, handleDragEnd,
        handleConfirmMerge
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager('addConversation');

    return (
        <DragDropContext onDragEnd={result => handleDragEnd(result)}>
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
                    <Droppable 
                        droppableId={dialogueData.id}
                        type='conversations'
                    >
                        {provided => (
                            <div 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                            >
                                {dialogueData.conversations.map((conversationId, index) => (
                                    <DialogueConversationContainer
                                        key={conversationId}
                                        conversationId={conversationId}
                                        index={index}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
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
                style={{
                    transform: (conversationsToMerge.length <= 0) ? 'scale(0.0)' : 'scale(1.0)'
                }}
                onClick={e => handleConfirmMerge()}
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
        </DragDropContext>
    );
}

export default withStyles(styles)(Dialogue);

