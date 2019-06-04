import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename
} from '../../actions/dialogueActions';
import { parseFile, downloadJSON } from '../../functions';

import Dialogue from '../pages/dialogues/Dialogue';
import NoDialogue from '../pages/dialogues/elements/NoDialogue';
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

        const { currentDialogueData, fileName } = this.props;

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
                        handleFileNameChange={this.changeFileName}
                        handleAddConversation={this.addConversation}
                    />
                </React.Fragment>
            );
        } else {
            content = (
                <NoDialogue
                    handleEmptyDialogue={this.updateWithEmptyDialogue}
                    handleUpdateFromFile={this.updateDialogueFromFile}
                />
            );
        }

        return content;
    }

}

const mapStateToProps = state => ({
    currentDialogueData: state.dialogue.currentDialogueData,
    fileName: state.dialogue.fileName
});

export default connect(mapStateToProps, {
    updateDialogue,
    addDialogueConversation,
    updateDialogueFilename
})(withSnackbar(DialogueContainer));
