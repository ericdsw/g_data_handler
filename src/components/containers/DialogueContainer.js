import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Icon, Typography } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';

import {
    updateDialogue,
    updateWithEmptyDialogue,
    updateDialogueFilename,
    addDialogueConversation,
    deleteCurrentDialogue,
    reorderConversations,
    reorderMessage,
    moveMessage,
    confirmConversationMerge,
    deleteConversationsToMerge,
    selectAllConversations,
    unselectAllConversations
} from '../../actions/dialogueActions';
import { parseFile, downloadJSON } from '../../functions';
import { DragJsonFileManager } from '../elements';
import { transformIn, transformOut } from '../../models/transformers/DialogueTransformer';
import Dialogue from '../pages/dialogues/Dialogue';
import DialogueToolbar from '../pages/dialogues/elements/DialogueToolbar';

class DialogueContainer extends React.Component {

    /**
     * Erases the current dialogue and restores the view to its default
     * state
     */
    clearDialogue = () => {
        const { deleteCurrentDialogue } = this.props;
        deleteCurrentDialogue();
    }

    /**
     * Sets an empty dialogue as the current dialogue
     */
    updateWithEmptyDialogue = () => {
        const { updateWithEmptyDialogue } = this.props;
        updateWithEmptyDialogue('file_name.json');
    }

    /**
     * Sets the dialogue contained in the file as the current dialaogue
     */
    updateDialogueFromFile = targetFile => {
        const { updateDialogue } = this.props;
        parseFile(targetFile, 'application/json')
            .then(json => {
                const { result, entities } = transformIn(json);
                updateDialogue(targetFile.name, result, entities);
            })
            .catch(error => this.showError(error.message));
    }

    /**
     * Adds a conversation to the current dialogue
     */
    addConversation = conversationName => {
        const { currentDialogue, addDialogueConversation } = this.props;
        addDialogueConversation(currentDialogue, conversationName);
    }

    /**
     * Updates the current file name
     */
    changeFileName = newFileName => {
        const { updateDialogueFilename } = this.props;
        updateDialogueFilename(newFileName);
    }

    /**
     * Exports the current data as a JSON file
     */
    export = () => {

        const { allData, fileName, currentDialogue } = this.props;

        if (Object.keys(allData.conversations).length <= 0) {
            this.showError('Cannot export an empty dialogue file');
            return;
        }

        let emptyConversations = 0;
        Object.keys(allData.conversations).forEach(conversationId => {
            const conversation = allData.conversations[conversationId];
            if (conversation.messages.length <= 0) {
                emptyConversations++;
            } 
        });
        
        if (emptyConversations > 0) {
            this.showError(
                `${emptyConversations} conversation${
                    (emptyConversations === 1) ? ' is' : 's are'
                } empty`
            );
            return;
        }

        downloadJSON(fileName, transformOut(currentDialogue, allData)); 
    }

    /**
     * Displays a "snackbar" with the provided error message
     */
    showError = errorMessage => {
        this.props.enqueueSnackbar(errorMessage, { variant: 'error' });
    }

    onDragEnd = result => {

        const { source, destination, draggableId } = result;
        
        // If no destination is defined or no movement needs to be made, skip
        if (
            !destination ||
            (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            )
        ) {
            return;
        }

        if (result.type === 'conversations') {
            const { reorderConversations, currentDialogue } = this.props;
            reorderConversations(
                source.index, destination.index, currentDialogue, draggableId
            );
        } else {
            if (source.droppableId === destination.droppableId) {
                // Move inside
                const { reorderMessage } = this.props;
                reorderMessage(
                    source.index, destination.index, source.droppableId, draggableId
                )
            } else {
                // Move outside
                const { moveMessage } = this.props;
                moveMessage(
                    source.index, destination.index,
                    source.droppableId, destination.droppableId, draggableId
                )
            }

        }
    }

    confirmMerge = () => {
        this.props.confirmConversationMerge();
    }

    confirmBulkDelete = () => {
        this.props.deleteConversationsToMerge();
    }

    selectAllConversations = () => {
        this.props.selectAllConversations();
    }

    unselectAllConversations = () => {
        this.props.unselectAllConversations();
    }

    /**
     * Render Method
     */
    render() {

        const { 
            currentDialogue, dialogues, fileName, conversationsToMerge 
        } = this.props;

        let content;

        if (currentDialogue !== '') {
            content = (
                <React.Fragment>
                    <DialogueToolbar
                        handleExport={this.export}
                        handleClear={this.clearDialogue}
                        handleAddConversation={this.addConversation}
                    />
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Dialogue 
                            fileName={fileName}
                            dialogueData={dialogues[currentDialogue]}
                            conversationsToMerge={conversationsToMerge}
                            handleFileNameChange={this.changeFileName}
                            handleAddConversation={this.addConversation}
                            handleDragEnd={this.onDragEnd}
                            handleConfirmMerge={this.confirmMerge}
                            handleConfirmBulkDelete={this.confirmBulkDelete}
                            handleSelectAll={this.selectAllConversations}
                            handleUnselectAll={this.unselectAllConversations}
                        />
                    </DragDropContext>
                </React.Fragment>
            );
        } else {
            content = (
                <DragJsonFileManager
                    buttonString='New Dialogue'
                    dragString={
                        <React.Fragment>
                            <Typography gutterBottom>
                                <Icon fontSize='large'>
                                    question_answer
                                </Icon>
                            </Typography>
                            Drag a <code>.json</code> here to edit
                            an existing dialogue.
                        </React.Fragment>
                    }
                    handleEmpty={this.updateWithEmptyDialogue}
                    handleUpdateFromFile={this.updateDialogueFromFile}
                />
            );
        }

        return content;
    }

}

const mapStateToProps = state => ({
    fileName: state.dialogue.fileName,
    currentDialogue: state.dialogue.currentDialogue,
    dialogues: state.dialogue.dialogues,
    conversationsToMerge: state.dialogue.conversationsToMerge,
    allData: state.dialogue
});

export default connect(mapStateToProps, {
    updateDialogue,
    updateWithEmptyDialogue,
    updateDialogueFilename,
    addDialogueConversation,
    deleteCurrentDialogue,
    reorderConversations,
    reorderMessage,
    moveMessage,
    confirmConversationMerge,
    deleteConversationsToMerge,
    selectAllConversations,
    unselectAllConversations
})(withSnackbar(DialogueContainer));
