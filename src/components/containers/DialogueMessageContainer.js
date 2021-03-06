import React from "react";
import { connect } from "react-redux";
import {
  editConversationMessage,
  deleteConversationMessage,
  addMessageAtPosition,
  splitConversation,
} from "../../actions/dialogueActions";
import { Draggable } from "react-beautiful-dnd";

import DialogueMessage from "../pages/dialogues/DialogueMessage";
import DialogueEmote from "../pages/dialogues/DialogueEmote";
import MessageSwarm from "../pages/dialogues/MessageSwarm";
import GiveMoneyFromDialogue from '../pages/dialogues/GiveMoneyFromDialogue';
import GiveItemFromDialogue from '../pages/dialogues/GiveItemFromDialogue';

class DialogueMessageContainer extends React.Component {
  editMessage = (data) => {
    const { messageId, editConversationMessage } = this.props;
    editConversationMessage(messageId, data);
  };

  addAbove = (data) => {
    const {
      conversationId,
      messageId,
      conversations,
      addMessageAtPosition,
    } = this.props;
    const currentConversation = conversations[conversationId];
    const offset = currentConversation.messages.indexOf(messageId);

    addMessageAtPosition(conversationId, offset, data);
  };

  addBelow = (data) => {
    const {
      conversationId,
      messageId,
      conversations,
      addMessageAtPosition,
    } = this.props;
    const currentConversation = conversations[conversationId];
    const offset = currentConversation.messages.indexOf(messageId);

    addMessageAtPosition(conversationId, offset + 1, data);
  };

  deleteMessage = () => {
    const { messageId, deleteConversationMessage } = this.props;
    deleteConversationMessage(messageId);
  };

  splitBelow = (newConversationName) => {
    const { conversationId, messageId, splitConversation } = this.props;
    splitConversation(conversationId, messageId, newConversationName);
  };

  render() {
    const { messageId, messages, index, isDragDisabled } = this.props;
    const message = messages[messageId];

    let content;
    switch (message.type) {
      case "message":
        content = (
          <DialogueMessage
            message={message}
            handleEdit={this.editMessage}
            handleDelete={this.deleteMessage}
            handleAddAbove={this.addAbove}
            handleAddBelow={this.addBelow}
            handleSplitBelow={this.splitBelow}
          />
        );
        break;
      case "emote":
        content = (
          <DialogueEmote
            message={message}
            handleDelete={this.deleteMessage}
            handleAddAbove={this.addAbove}
            handleAddBelow={this.addBelow}
            handleSplitBelow={this.splitBelow}
          />
        );
        break;
      case "swarm":
        content = (
          <MessageSwarm
            swarmData={message}
            handleEdit={this.editMessage}
            handleDelete={this.deleteMessage}
            handleSplitBelow={this.splitBelow}
          />
        );
        break;
      case "give_money":
        content = (
          <GiveMoneyFromDialogue
            message={message}
            handleEdit={this.editMessage}
            handleDelete={this.deleteMessage}
            handleAddAbove={this.addAbove}
            handleAddBelow={this.addBelow}
            handleSplitBelow={this.splitBelow}
          />
        );
        break;
      case "give_item":
        content = (
          <GiveItemFromDialogue
            message={message}
            handleEdit={this.editMessage}
            handleDelete={this.deleteMessage}
            handleAddAbove={this.addAbove}
            handleAddBelow={this.addBelow}
            handleSplitBelow={this.splitBelow}
            buttonText="Edit"
          />
        );
        break;
      default:
        content = <React.Fragment />;
        break;
    }

    return (
      <Draggable
        draggableId={messageId}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
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

const mapStateToProps = (state) => ({
  conversations: state.dialogue.conversations,
  messages: state.dialogue.messages,
});

export default connect(mapStateToProps, {
  editConversationMessage,
  deleteConversationMessage,
  addMessageAtPosition,
  splitConversation,
})(DialogueMessageContainer);

