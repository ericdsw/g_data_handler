import React from 'react';
import { connect } from 'react-redux';
import {
    editConversationMessage, 
    deleteConversationMessage,
    addMessageAtPosition
} from '../../actions/dialogueActions';
import DialogueMessage from '../pages/dialogues/DialogueMessage';
import DialogueEmote from '../pages/dialogues/DialogueEmote';

class DialogueMessageContainer extends React.Component {

    editMessage = data => {
        const { messageId, editConversationMessage } = this.props;
        editConversationMessage(messageId, data);
    }

    addAbove = data => {
        const { 
            conversationId, messageId, conversations,
            addMessageAtPosition
        } = this.props;
        const currentConversation = conversations[conversationId];
        const offset = currentConversation.messages.indexOf(messageId)

        addMessageAtPosition(conversationId, offset, data)
    }

    addBelow = data => {
        const { 
            conversationId, messageId, conversations,
            addMessageAtPosition
        } = this.props;
        const currentConversation = conversations[conversationId];
        const offset = currentConversation.messages.indexOf(messageId)

        addMessageAtPosition(conversationId, offset + 1, data)
    }

    deleteMessage = () => {
        const { messageId, deleteConversationMessage } = this.props;
        deleteConversationMessage(messageId);
    }

    render() {

        const { messageId, messages } = this.props;
        const message = messages[messageId];

        if (message.is_emote) {
            return (
                <DialogueEmote
                    message={message}
                    handleDelete={this.deleteMessage}
                    handleAddAbove={this.addAbove}
                    handleAddBelow={this.addBelow}
                />
            );
        } else {
            return (
                <DialogueMessage 
                    message={message}
                    handleEdit={this.editMessage}
                    handleDelete={this.deleteMessage}
                    handleAddAbove={this.addAbove}
                    handleAddBelow={this.addBelow}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    conversations: state.dialogue.conversations,
    messages: state.dialogue.messages
})

export default connect(mapStateToProps, {
    editConversationMessage,
    deleteConversationMessage,
    addMessageAtPosition
})(DialogueMessageContainer);
