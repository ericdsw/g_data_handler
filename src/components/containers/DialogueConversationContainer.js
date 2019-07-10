import React from 'react';
import { connect } from 'react-redux';
import {
    deleteDialogueConversation,
    updateEditingMessage
} from '../../actions/dialogueActions';
import DialogueConversation from '../pages/dialogues/DialogueConversation';

class DialogueConversationContainer extends React.Component {

    deleteConversation = () => {
        const { deleteDialogueConversation, conversationName } = this.props;
        deleteDialogueConversation(conversationName);
    }

    addNewToConversation = (isEmote = false) => {
        const { conversationName, messages, updateEditingMessage } = this.props;
        const sourceInfo = {
            conversationName: conversationName,
            messageOffset: messages.length + 1
        };
        updateEditingMessage(sourceInfo, {is_emote: isEmote});
    }

    render() {

        const { conversationName, messages } = this.props;
        return (
            <DialogueConversation
                conversationName={conversationName}
                messages={messages}
                handleDeleteConversation={this.deleteConversation}
                handleAddToConversation={this.addNewToConversation}
            />
        );
    }

}

export default connect(null, {
    deleteDialogueConversation,
    updateEditingMessage
})(DialogueConversationContainer);
