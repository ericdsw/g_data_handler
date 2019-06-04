import React from 'react';
import { connect } from 'react-redux';
import {
    addMessageToConversation,
    deleteDialogueConversation
} from '../../actions/dialogueActions';
import DialogueConversation from '../pages/dialogues/DialogueConversation';

class DialogueConversationContainer extends React.Component {

    deleteConversation = () => {
        const { deleteDialogueConversation, conversationName } = this.props;
        deleteDialogueConversation(conversationName);
    }

    createMessage = messageData => {
        const { conversationName, addMessageToConversation } = this.props;
        addMessageToConversation(conversationName, messageData);
    }

    render() {

        const { conversationName, messages } = this.props;
        return (
            <DialogueConversation
                conversationName={conversationName}
                messages={messages}
                handleDeleteConversation={this.deleteConversation}
                handleAddMessage={this.createMessage}
            />
        );
    }

}

export default connect(null, {
    addMessageToConversation,
    deleteDialogueConversation
})(DialogueConversationContainer);
