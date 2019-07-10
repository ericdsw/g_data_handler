import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Icon, Typography } from '@material-ui/core';

import {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename,
    updateEditingMessage,
    editConversationMessage,
    addMessageAtPosition,
} from '../../actions/dialogueActions';
import { parseFile, downloadJSON } from '../../functions';
import { DragJsonFileManager } from '../elements';
import Dialogue from '../pages/dialogues/Dialogue';
import DialogueToolbar from '../pages/dialogues/elements/DialogueToolbar';

class DialogueContainer extends React.Component {

    clearDialogue = () => {
        const { updateDialogue } = this.props;
        updateDialogue({
            dialogueData: null,
            fileName: ''
        });
    }

    updateWithEmptyDialogue = () => {
        const { updateDialogue } = this.props;
        updateDialogue({
            dialogueData: {},
            fileName: 'file_name.json'
        });
    }

    updateDialogueFromFile = targetFile => {
        const { updateDialogue } = this.props;
        parseFile(targetFile, 'application/json')
            .then(json => {
                updateDialogue({
                    fileName: targetFile.name,
                    dialogueData: json
                });
            })
            .catch(error => this.showError(error.message));
    }

    addConversation = conversationName => {
        const { addDialogueConversation } = this.props;
        addDialogueConversation(conversationName);
    }

    changeFileName = newFileName => {
        const { updateDialogueFilename } = this.props;
        updateDialogueFilename(newFileName);
    }

    createDialogueMessage = messageData => {

        const { 
            addMessageAtPosition, editingMessageConversation,
            editingMessageOffset 
        } = this.props;
        
        addMessageAtPosition(
            editingMessageConversation, editingMessageOffset, messageData
        );

    }

    editDialogueMessage = messageData => {

        const { 
            editConversationMessage,
            editingMessageConversation, editingMessageOffset
        } = this.props;

        editConversationMessage(
            editingMessageConversation, editingMessageOffset, messageData
        );
    }

    closeForm = () => {
        const { updateEditingMessage } = this.props;
        const emptyInfo = {
            conversationName: '',
            messageOffset: 0
        };
        updateEditingMessage(emptyInfo, null);
    }

    advanceForm = () => {

        const { 
            updateEditingMessage,
            editingMessageConversation,
            editingMessageOffset,
            editingMessage
        } = this.props;

        const newSourceData = {
            conversationName: editingMessageConversation,
            messageOffset: editingMessageOffset + 1
        }
        updateEditingMessage(newSourceData, editingMessage);

    }

    export = () => {
        const { currentDialogueData, fileName } = this.props;

        if (Object.keys(currentDialogueData).length <= 0) {
            this.showError('Cannot export an empty dialogue file');
            return;
        }

        let emptyConversations = 0;
        for (const conversationName in currentDialogueData) {
            if (currentDialogueData[conversationName].length <= 0) {
                emptyConversations++;
            }
        }
        if (emptyConversations > 0) {
            this.showError(
                `${emptyConversations} conversation${
                    (emptyConversations === 1) ? ' is' : 's are'
                } empty`
            );
            return;
        }

        downloadJSON(fileName, currentDialogueData); 
    }

    showError = errorMessage => {
        this.props.enqueueSnackbar(errorMessage, { variant: 'error' });
    }

    render() {

        const { 
            currentDialogueData, fileName, 
            editingMessage, editingMessageConversation
        } = this.props;

        let content;

        if (currentDialogueData !== null) {
            content = (
                <React.Fragment>
                    <DialogueToolbar
                        handleExport={this.export}
                        handleClear={this.clearDialogue}
                        handleAddConversation={this.addConversation}
                    />
                    <Dialogue 
                        fileName={fileName}
                        conversations={currentDialogueData}
                        editingMessage={editingMessage}
                        editingMessageConversation={editingMessageConversation}
                        handleFileNameChange={this.changeFileName}
                        handleAddConversation={this.addConversation}
                        handleFormClose={this.closeForm}
                        handleCreateMessage={this.createDialogueMessage}
                        handleEditMessage={this.editDialogueMessage}
                        handleAdvanceForm={this.advanceForm}
                    />
                </React.Fragment>
            );
        } else {
            content = (
                <DragJsonFileManager
                    buttonString='New Dialogue'
                    dragString={
                        <React.Fragment>
                            <Typography gutterBottom>
                                <Icon fontSize='large'>question_answer</Icon>
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
    currentDialogueData: state.dialogue.currentDialogueData,
    fileName: state.dialogue.fileName,
    editingConversation: state.dialogue.editingConversation,
    editingMessage: state.dialogue.editingMessage,
    editingMessageConversation: state.dialogue.editingMessageConversation,
    editingMessageOffset: state.dialogue.editingMessageOffset,
});

export default connect(mapStateToProps, {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename,
    updateEditingMessage,
    addMessageAtPosition,
    editConversationMessage
})(withSnackbar(DialogueContainer));
