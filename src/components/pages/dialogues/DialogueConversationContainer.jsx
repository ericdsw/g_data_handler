import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Draggable } from 'react-beautiful-dnd';

import {
  deleteDialogueConversation,
  addMessageToConversation,
  editDialogueConversation,
  addToConversationMerger,
} from '../../../actions/dialogueActions';

import DialogueConversation from './DialogueConversation';

const memoizedSelectDialogueConversationData = createSelector(
  (state) => state.dialogue.conversations,
  (_, conversationId) => conversationId,
  (dialogueConversationData, conversationId) => {
    return dialogueConversationData[conversationId];
  }
);

const memoizedIsInConversationsToMerge = createSelector(
  (state) => state.dialogue.conversationsToMerge,
  (_, conversationId) => conversationId,
  (conversationsToMergeData, conversationId) => {
    return conversationsToMergeData.includes(conversationId);
  }
);

const DialogueConversationContainer = ({ conversationId, index }) => {
  const dispatch = useDispatch();
  const conversationData = useSelector((state) =>
    memoizedSelectDialogueConversationData(state, conversationId)
  );
  const isInMergeMode = useSelector((state) =>
    memoizedIsInConversationsToMerge(state, conversationId)
  );

  const handleDeleteConversation = useCallback(
    () => dispatch(deleteDialogueConversation(conversationId)),
    [dispatch, conversationId]
  );
  const handleAddNewMessageToConversation = useCallback(
    (newEntryData) =>
      dispatch(addMessageToConversation(conversationId, newEntryData)),
    [dispatch, conversationId]
  );
  const handleUpdateConversation = useCallback(
    (newName) => {
      dispatch(
        editDialogueConversation(conversationId, {
          conversationName: newName,
        })
      );
    },
    [dispatch, conversationId]
  );
  const handleToggleFromMerger = useCallback(
    (checked) => dispatch(addToConversationMerger(conversationId, checked)),
    [dispatch, conversationId]
  );

  return (
    <Draggable draggableId={conversationId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <DialogueConversation
            conversation={conversationData}
            isInMergeMode={isInMergeMode}
            handleDeleteConversation={handleDeleteConversation}
            handleAddToConversation={handleAddNewMessageToConversation}
            handleUpdateConversation={handleUpdateConversation}
            handleToggleFromMerger={handleToggleFromMerger}
            dragHandleProps={provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DialogueConversationContainer;
