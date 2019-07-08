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

    editMessage = messageData => {
        const { conversation , offset, editConversationMessage } = this.props;
        editConversationMessage(conversation, offset, messageData);
    }

    deleteMessage = () => {
        const { conversation, offset, deleteConversationMessage } = this.props;
        deleteConversationMessage(conversation, offset);
    }

    addAbove = messageData => {
        const { conversation, offset, addMessageAtPosition } = this.props;
        addMessageAtPosition(conversation, offset, messageData);
    }

    addBelow = messageData => {
        const { conversation, offset, addMessageAtPosition } = this.props;
        addMessageAtPosition(conversation, offset + 1, messageData);
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
    addMessageAtPosition
})(DialogueMessageContainer);
