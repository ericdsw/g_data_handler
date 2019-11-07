import React from 'react';
import { connect } from 'react-redux';
import {
    editConversationMessage, 
    deleteConversationMessage,
    addMessageAtPosition
} from '../../actions/dialogueActions';
import { Draggable } from 'react-beautiful-dnd';
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

        const { messageId, messages, index, isDragDisabled } = this.props;
        const message = messages[messageId];

        let content;

        if (message.is_emote) {
            content = (
                <DialogueEmote
                    message={message}
                    handleDelete={this.deleteMessage}
                    handleAddAbove={this.addAbove}
                    handleAddBelow={this.addBelow}
                />
            );
        } else {
            content = (
                <DialogueMessage 
                    message={message}
                    handleEdit={this.editMessage}
                    handleDelete={this.deleteMessage}
                    handleAddAbove={this.addAbove}
                    handleAddBelow={this.addBelow}
                />
            );
        }

        return (
            <Draggable
                draggableId={messageId}
                index={index}
                isDragDisabled={isDragDisabled}
            >
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {content}
                    </div>
                )}
            </Draggable>
        );
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
