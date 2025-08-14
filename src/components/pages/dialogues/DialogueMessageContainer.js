import React, { useCallback, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { createSelector } from '@reduxjs/toolkit';

import {
  editConversationMessage,
  deleteConversationMessage,
  addMessageAtPosition,
  splitConversation,
} from '../../../actions/dialogueActions';

import DialogueMessage from './DialogueMessage';
import DialogueEmote from './DialogueEmote';
import MessageSwarm from './MessageSwarm';
import GiveMoneyFromDialogue from './GiveMoneyFromDialogue';
import GiveItemFromDialogue from './GiveItemFromDialogue';
import PickItem from './PickItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const memoizedSelectDialogueMessageData = createSelector(
  (state) => state.dialogue.messages,
  (_, messageId) => messageId,
  (dialogueMessageData, messageId) => {
    return dialogueMessageData[messageId];
  }
);

const DialogueMessageContainer = ({
  messageId,
  conversationId,
  index,
  isDragDisabled,
}) => {
  const dispatch = useDispatch();
  const messageData = useSelector((state) =>
    memoizedSelectDialogueMessageData(state, messageId)
  );

  const handleEditMessage = useCallback(
    (data) => dispatch(editConversationMessage(messageId, data)),
    [dispatch, messageId]
  );
  const handleDeleteMessage = useCallback(
    () => dispatch(deleteConversationMessage(messageId)),
    [dispatch, messageId]
  );
  const handleSplitBelow = useCallback(
    (newConversationName) =>
      dispatch(
        splitConversation(conversationId, messageId, newConversationName)
      ),
    [dispatch, conversationId, messageId]
  );
  const handleAddAbove = useCallback(
    (data) => dispatch(addMessageAtPosition(conversationId, index, data)),
    [dispatch, conversationId, index]
  );
  const handleAddBelow = useCallback(
    (data, additionalOffset) =>
      dispatch(
        addMessageAtPosition(conversationId, index + 1 + additionalOffset, data)
      ),
    [dispatch, conversationId, index]
  );

  const content = useMemo(() => {
    let result;
    switch (messageData.type) {
      case 'message':
        result = (
          <DialogueMessage
            message={messageData}
            handleEdit={handleEditMessage}
            handleDelete={handleDeleteMessage}
            handleAddAbove={handleAddAbove}
            handleAddBelow={handleAddBelow}
            handleSplitBelow={handleSplitBelow}
          />
        );
        break;
      case 'emote':
        result = (
          <DialogueEmote
            message={messageData}
            handleDelete={handleDeleteMessage}
            handleAddAbove={handleAddAbove}
            handleAddBelow={handleAddBelow}
            handleSplitBelow={handleSplitBelow}
          />
        );
        break;
      case 'swarm':
        result = (
          <MessageSwarm
            swarmData={messageData}
            handleEdit={handleEditMessage}
            handleDelete={handleDeleteMessage}
            handleSplitBelow={handleSplitBelow}
          />
        );
        break;
      case 'give_money':
        result = (
          <GiveMoneyFromDialogue
            message={messageData}
            handleEdit={handleEditMessage}
            handleDelete={handleDeleteMessage}
            handleAddAbove={handleAddAbove}
            handleAddBelow={handleAddBelow}
            handleSplitBelow={handleSplitBelow}
          />
        );
        break;
      case 'give_item':
        result = (
          <GiveItemFromDialogue
            message={messageData}
            handleEdit={handleEditMessage}
            handleDelete={handleDeleteMessage}
            handleAddAbove={handleAddAbove}
            handleAddBelow={handleAddBelow}
            handleSplitBelow={handleSplitBelow}
            buttonText="Edit"
          />
        );
        break;
      case 'pick_item':
        result = (
          <PickItem
            pickItemData={messageData}
            handleEdit={handleEditMessage}
            handleDelete={handleDeleteMessage}
            handleAddAbove={handleAddAbove}
            handleAddBelow={handleAddBelow}
            handleSplitBelow={handleSplitBelow}
          />
        );
        break;
      default:
        result = <></>;
    }
    return result;
  }, [
    messageData,
    handleEditMessage,
    handleDeleteMessage,
    handleAddAbove,
    handleAddBelow,
    handleSplitBelow,
  ]);

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
};

export default DialogueMessageContainer;
