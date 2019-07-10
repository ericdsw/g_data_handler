import React from 'react';
import { connect } from 'react-redux';
import {
    editConversationMessage, 
    deleteConversationMessage,
    addMessageAtPosition,
    updateEditingMessage
} from '../../actions/dialogueActions';
import DialogueMessage from '../pages/dialogues/DialogueMessage';
import DialogueEmote from '../pages/dialogues/DialogueEmote';

class DialogueMessageContainer extends React.Component {

    editMessage = () => {
        const { updateEditingMessage, conversation , offset, message } = this.props;
        const sourceInfo = {
            conversationName: conversation,
            messageOffset: offset
        };
        updateEditingMessage(sourceInfo, message);
    }

    addAbove = (isEmote = false) => {
        const { updateEditingMessage, conversation , offset } = this.props;
        const sourceInfo = {
            conversationName: conversation,
            messageOffset: offset
        };
        updateEditingMessage(sourceInfo, {is_emote: isEmote});
    }

    addBelow = (isEmote = false) => {
        const { updateEditingMessage, conversation , offset } = this.props;
        const sourceInfo = {
            conversationName: conversation,
            messageOffset: offset + 1
        };
        updateEditingMessage(sourceInfo, {is_emote: isEmote});
    }

    deleteMessage = () => {
        const { conversation, offset, deleteConversationMessage } = this.props;
        deleteConversationMessage(conversation, offset);
    }

    render() {

        const { offset, conversation, message } = this.props;

        if (message.is_emote) {
            return (
                <DialogueEmote
                    offset={offset}
                    conversation={conversation}
                    message={message}
                    handleDelete={this.deleteMessage}
                    handleAddAbove={this.addAbove}
                    handleAddBelow={this.addBelow}
                />
            );
        } else {
            return (
                <DialogueMessage 
                    offset={offset}
                    conversation={conversation}
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

export default connect(null, {
    editConversationMessage,
    deleteConversationMessage,
    addMessageAtPosition,
    updateEditingMessage
})(DialogueMessageContainer);
