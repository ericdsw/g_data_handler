import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { deleteReference } from './reducerActions';
import {
  UPDATE_DIALOGUE,
  UPDATE_EMPTY_DIALOGUE,
  ADD_CONVERSATION,
  ADD_TO_CONVERSATION_MERGER,
  DELETE_CONVERSATION,
  ADD_CONVERSATION_MESSAGE,
  ADD_CONVERSATION_MESSAGE_AT_POS,
  EDIT_CONVERSATION,
  EDIT_CONVERSATION_MESSAGE,
  DELETE_CONVERSATION_MESSAGE,
  UPDATE_DIALOGUE_FILENAME,
  DELETE_DIALOGUE,
  REORDER_CONVERSATION,
  REORDER_MESSAGE,
  MOVE_MESSAGE,
  SPLIT_CONVERSATION,
  CONFIRM_CONVERSATION_MERGE,
  DELETE_CONVERSATIONS_TO_MERGE,
  SELECT_ALL_CONVERSATIONS,
  UNSELECT_ALL_CONVERSATIONS,
  ADD_PRE_UPLOADED_FILE,
  UPDATE_PRE_UPLOADED_FILE_NAME,
  CLEAR_PRE_UPLOADED_FILES,
  ADD_SAVED_TARGET_OBJECT,
  REMOVE_SAVED_TARGET_OBJECT,
  REMOVE_ALL_SAVED_TARGET_OBJECTS,
  DELETE_PRE_UPLOADED_FILE_NAME,
} from '../actions/types';

const initialState = {
  fileName: '',
  currentDialogue: '',
  conversationsToMerge: [],
  dialogues: {},
  conversations: {},
  messages: {},
  preUploadedFiles: {},
  savedTargetObjects: []
};

const dialogueReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_CONVERSATION, addDialogueConversation)
    .addCase(ADD_CONVERSATION_MESSAGE, addConversationMessage)
    .addCase(ADD_CONVERSATION_MESSAGE_AT_POS, addConversationMessageAtPos)
    .addCase(ADD_TO_CONVERSATION_MERGER, addToConversationMerger)

    .addCase(UPDATE_DIALOGUE, updateDialogue)
    .addCase(UPDATE_EMPTY_DIALOGUE, updateWithEmptyDialogue)
    .addCase(EDIT_CONVERSATION, updateDialogueConversation)
    .addCase(EDIT_CONVERSATION_MESSAGE, editConversationMessage)
    .addCase(UPDATE_DIALOGUE_FILENAME, updateDialogueFilename)

    .addCase(DELETE_DIALOGUE, deleteCurrentDialogue)
    .addCase(DELETE_CONVERSATION, deleteDialogueConversation)
    .addCase(DELETE_CONVERSATION_MESSAGE, deleteConversationMessage)

    .addCase(REORDER_CONVERSATION, reorderConversations)
    .addCase(REORDER_MESSAGE, reorderMessage)
    .addCase(MOVE_MESSAGE, moveMessage)
    .addCase(SPLIT_CONVERSATION, splitConversation)

    .addCase(DELETE_CONVERSATIONS_TO_MERGE, deleteAllConversationsToMerge)
    .addCase(CONFIRM_CONVERSATION_MERGE, confirmConversationMerge)
    .addCase(SELECT_ALL_CONVERSATIONS, selectAllConversations)
    .addCase(UNSELECT_ALL_CONVERSATIONS, unselectAllConversations)

    .addCase(ADD_PRE_UPLOADED_FILE, addPreUploadedFile)
    .addCase(UPDATE_PRE_UPLOADED_FILE_NAME, updatePreUploadedFile)
    .addCase(CLEAR_PRE_UPLOADED_FILES, clearPreUploadedFiles)

    .addCase(ADD_SAVED_TARGET_OBJECT, addSavedTargetObject)
    .addCase(REMOVE_SAVED_TARGET_OBJECT, removeSavedTargetObject)
    .addCase(REMOVE_ALL_SAVED_TARGET_OBJECTS, removeAllSavedTargetObjects)
    .addCase(DELETE_PRE_UPLOADED_FILE_NAME, deletePreUploadedFileName)
});

function deletePreUploadedFileName(state, action) {
  const { fileId } = action.payload;
  delete state.preUploadedFiles[fileId];
}

function addSavedTargetObject(state, action) {
  const { targetObject } = action.payload;
  if (!state.savedTargetObjects.includes(targetObject)) {
    state.savedTargetObjects.push(targetObject);
  }
}

function removeSavedTargetObject(state, action) {
  const { targetObject } = action.payload;
  if (state.savedTargetObjects.has(targetObject)) {
    state.savedTargetObjects.splice(state.savedTargetObjects.indexOf(targetObject), 1);
  }
}

function removeAllSavedTargetObjects(state, action) {
  state.savedTargetObjects = [];
}

function clearPreUploadedFiles(state, action) {
  state.preUploadedFiles = {};
}

function updatePreUploadedFile(state, action) {
  const { fileId, newFileName } = action.payload;
  state.preUploadedFiles[fileId].fileName = newFileName;
}

function addPreUploadedFile(state, action) {
  const { fileName, conversationKeys, fileId } = action.payload;
  state.preUploadedFiles[fileId] = {
    fileName,
    conversationKeys,
  };
}

// Create

function addDialogueConversation(state, action) {
  const { dialogueId, conversationName } = action.payload;
  const conversationId = uuidv4();
  state.conversations[conversationId] = {
    id: conversationId,
    conversationName: conversationName,
    messages: [],
  };
  state.dialogues[dialogueId].conversations.push(conversationId);
}

function addConversationMessage(state, action) {
  const { conversationId, data } = action.payload;
  const newMessageId = uuidv4();

  state.messages[newMessageId] = {
    id: newMessageId,
    ...data,
  };
  state.conversations[conversationId].messages.push(newMessageId);
}

function addConversationMessageAtPos(state, action) {
  const { conversationId, offset, data } = action.payload;
  const newMessageId = uuidv4();

  state.messages[newMessageId] = {
    id: newMessageId,
    ...data,
  };
  state.conversations[conversationId].messages.splice(offset, 0, newMessageId);
}

function addToConversationMerger(state, action) {
  const { conversationId, shouldAdd } = action.payload;
  if (shouldAdd) {
    state.conversationsToMerge.push(conversationId);
  } else {
    state.conversationsToMerge.splice(
      state.conversationsToMerge.indexOf(conversationId, 1)
    );
  }
}

// Update / Edit

function updateDialogue(state, action) {
  const { fileName, dialogueId, entities } = action.payload;
  return {
    ...state,
    ...entities,
    fileName,
    currentDialogue: dialogueId,
  };
}

function updateWithEmptyDialogue(state, action) {
  const { fileName } = action.payload;
  const dialogueId = uuidv4();

  var emptyDialogueData = {
    [dialogueId]: {
      id: dialogueId,
      conversations: [],
    },
  };

  return {
    ...state,
    fileName,
    currentDialogue: dialogueId,
    dialogues: emptyDialogueData,
    conversations: {},
    messages: {},
  };
}

function updateDialogueConversation(state, action) {
  const { conversationId, data } = action.payload;
  state.conversations[conversationId] = {
    ...state.conversations[conversationId],
    ...data,
  };
}

function editConversationMessage(state, action) {
  const { messageId, data } = action.payload;

  state.messages[messageId] = {
    id: state.messages[messageId].id,
    ...data,
  };
}

function updateDialogueFilename(state, action) {
  const { fileName } = action.payload;
  state.fileName = fileName;
}

// Delete

function deleteCurrentDialogue(state, action) {
  return initialState;
}

function deleteDialogueConversation(state, action) {
  const { conversationId } = action.payload;

  // First, delete the conversation
  delete state.conversations[conversationId];

  // Second, if the conversation is in a merge transaction, remove it from the array
  if (state.conversationsToMerge.includes(conversationId)) {
    state.conversationsToMerge.splice(
      state.conversationsToMerge.indexOf(conversationId),
      1
    );
  }

  // Third, delete the reference from the dialogue
  deleteReference(state.dialogues, 'conversations', conversationId);
}

function deleteConversationMessage(state, action) {
  const { messageId } = action.payload;
  delete state.messages[messageId];
  deleteReference(state.conversations, 'messages', messageId);
}

// Extra

function reorderConversations(state, action) {
  const { sourcePosition, destinationPosition, dialogueId, conversationId } =
    action.payload;

  state.dialogues[dialogueId].conversations.splice(sourcePosition, 1);
  state.dialogues[dialogueId].conversations.splice(
    destinationPosition,
    0,
    conversationId
  );
}

function reorderMessage(state, action) {
  const { sourcePosition, destinationPosition, conversationId, messageId } =
    action.payload;

  state.conversations[conversationId].messages.splice(sourcePosition, 1);
  state.conversations[conversationId].messages.splice(
    destinationPosition,
    0,
    messageId
  );
}

function moveMessage(state, action) {
  const {
    sourcePosition,
    destinationPosition,
    sourceConversationId,
    destinationConversationId,
    messageId,
  } = action.payload;

  state.conversations[sourceConversationId].messages.splice(sourcePosition, 1);
  state.conversations[destinationConversationId].messages.splice(
    destinationPosition,
    0,
    messageId
  );
}

function splitConversation(state, action) {
  const { conversationId, messageId, newName } = action.payload;

  const conversations = { ...state.conversations };
  const convMessages = [...conversations[conversationId].messages];

  const messageOffset = convMessages.indexOf(messageId);
  const messagesToMove = convMessages.splice(messageOffset);

  const newConversationId = uuidv4();

  const newConversation = {
    id: newConversationId,
    conversationName: newName,
    messages: messagesToMove,
  };

  state.conversations[newConversationId] = newConversation;

  const dialogues = { ...state.dialogues };
  const conversationPos =
    dialogues[state.currentDialogue].conversations.indexOf(conversationId);

  state.dialogues[state.currentDialogue].conversations.splice(
    conversationPos + 1,
    0,
    newConversationId
  );
  state.conversations[conversationId].messages = convMessages;
}

function deleteAllConversationsToMerge(state) {
  const dialogues = { ...state.dialogues };

  state.conversationsToMerge.forEach((conversationId) => {
    delete state.conversations[conversationId];
    deleteReference(dialogues, 'conversations', conversationId);
  });
  state.conversationsToMerge = [];
}

function confirmConversationMerge(state) {
  const finalConversationId = state.conversationsToMerge[0];

  state.conversationsToMerge.forEach((conversationId) => {
    if (conversationId !== finalConversationId) {
      // Add conversations to the final conversation
      const convMessages = state.conversations[conversationId].messages;
      state.conversations[finalConversationId].messages = [
        ...state.conversations[finalConversationId].messages,
        ...convMessages,
      ];

      // Delete the conversation form the state
      delete state.conversations[conversationId];

      // Delete any reference to this conversation
      deleteReference(state.dialogues, 'conversations', conversationId);
    }
  });

  state.conversationsToMerge = [];
}

function selectAllConversations(state) {
  state.conversationsToMerge =
    state.dialogues[state.currentDialogue].conversations;
}

function unselectAllConversations(state) {
  state.conversationsToMerge = [];
}

export default dialogueReducer;
