import {
  UPDATE_DIALOGUE,
  UPDATE_EMPTY_DIALOGUE,
  ADD_CONVERSATION,
  ADD_TO_CONVERSATION_MERGER,
  EDIT_CONVERSATION,
  DELETE_CONVERSATION,
  ADD_CONVERSATION_MESSAGE,
  ADD_CONVERSATION_MESSAGE_AT_POS,
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
  DELETE_PRE_UPLOADED_FILE_NAME
} from './types';

export const deletePreUploadedFileName = fileId => dispatch => {
  dispatch({
    type: DELETE_PRE_UPLOADED_FILE_NAME,
    payload: { fileId }
  })
}

export const addSavedTargetObject = targetObject => dispatch => {
  dispatch({
    type: ADD_SAVED_TARGET_OBJECT,
    payload: { targetObject }
  });
}

export const removeSavedTargetObject = targetObject => dispatch => {
  dispatch({
    type: REMOVE_SAVED_TARGET_OBJECT,
    payload: { targetObject }
  });
}

export const removeAllSavedTargetObjects = () => dispatch => {
  dispatch({
    type: REMOVE_ALL_SAVED_TARGET_OBJECTS,
    payload: {}
  })
}

export const clearPreUploadedFiles = () => (dispatch) => {
  dispatch({
    type: CLEAR_PRE_UPLOADED_FILES,
    payload: {},
  });
};

export const addPreUploadedFile =
  (fileName, conversationKeys, fileId) => (dispatch) => {
    dispatch({
      type: ADD_PRE_UPLOADED_FILE,
      payload: {
        fileName,
        conversationKeys,
        fileId,
      },
    });
  };

export const updatePreUploadedFile = (fileId, newFileName) => (dispatch) => {
  dispatch({
    type: UPDATE_PRE_UPLOADED_FILE_NAME,
    payload: {
      fileId,
      newFileName,
    },
  });
};

// Create

export const addDialogueConversation =
  (dialogueId, conversationName) => (dispatch) => {
    dispatch({
      type: ADD_CONVERSATION,
      payload: {
        dialogueId,
        conversationName,
      },
    });
  };

export const addMessageToConversation =
  (conversationId, data) => (dispatch) => {
    dispatch({
      type: ADD_CONVERSATION_MESSAGE,
      payload: {
        conversationId,
        data,
      },
    });
  };

export const addMessageAtPosition =
  (conversationId, offset, data) => (dispatch) => {
    dispatch({
      type: ADD_CONVERSATION_MESSAGE_AT_POS,
      payload: {
        conversationId,
        offset,
        data,
      },
    });
  };

export const addToConversationMerger =
  (conversationId, shouldAdd) => (dispatch) => {
    dispatch({
      type: ADD_TO_CONVERSATION_MERGER,
      payload: {
        conversationId,
        shouldAdd,
      },
    });
  };

// Edit / Update

export const updateDialogue =
  (fileName, dialogueId, entities) => (dispatch) => {
    dispatch({
      type: UPDATE_DIALOGUE,
      payload: { fileName, dialogueId, entities },
    });
  };

export const updateWithEmptyDialogue = (fileName) => (dispatch) => {
  dispatch({
    type: UPDATE_EMPTY_DIALOGUE,
    payload: { fileName },
  });
};

export const editDialogueConversation =
  (conversationId, data) => (dispatch) => {
    dispatch({
      type: EDIT_CONVERSATION,
      payload: {
        conversationId,
        data,
      },
    });
  };

export const editConversationMessage = (messageId, data) => (dispatch) => {
  dispatch({
    type: EDIT_CONVERSATION_MESSAGE,
    payload: {
      messageId,
      data,
    },
  });
};

export const updateDialogueFilename = (fileName) => (dispatch) => {
  dispatch({
    type: UPDATE_DIALOGUE_FILENAME,
    payload: {
      fileName,
    },
  });
};

// Delete

export const deleteCurrentDialogue = () => (dispatch) => {
  dispatch({
    type: DELETE_DIALOGUE,
    payload: {},
  });
};

export const deleteDialogueConversation = (conversationId) => (dispatch) => {
  dispatch({
    type: DELETE_CONVERSATION,
    payload: {
      conversationId,
    },
  });
};

export const deleteConversationMessage = (messageId) => (dispatch) => {
  dispatch({
    type: DELETE_CONVERSATION_MESSAGE,
    payload: {
      messageId,
    },
  });
};

// Extra

export const reorderConversations =
  (sourcePosition, destinationPosition, dialogueId, conversationId) =>
  (dispatch) => {
    dispatch({
      type: REORDER_CONVERSATION,
      payload: {
        sourcePosition,
        destinationPosition,
        dialogueId,
        conversationId,
      },
    });
  };

export const reorderMessage =
  (sourcePosition, destinationPosition, conversationId, messageId) =>
  (dispatch) => {
    dispatch({
      type: REORDER_MESSAGE,
      payload: {
        sourcePosition,
        destinationPosition,
        conversationId,
        messageId,
      },
    });
  };

export const moveMessage =
  (
    sourcePosition,
    destinationPosition,
    sourceConversationId,
    destinationConversationId,
    messageId
  ) =>
  (dispatch) => {
    dispatch({
      type: MOVE_MESSAGE,
      payload: {
        sourcePosition,
        destinationPosition,
        sourceConversationId,
        destinationConversationId,
        messageId,
      },
    });
  };

export const splitConversation =
  (conversationId, messageId, newName) => (dispatch) => {
    dispatch({
      type: SPLIT_CONVERSATION,
      payload: {
        conversationId,
        messageId,
        newName,
      },
    });
  };

export const confirmConversationMerge = () => (dispatch) => {
  dispatch({
    type: CONFIRM_CONVERSATION_MERGE,
    payload: {},
  });
};

export const deleteConversationsToMerge = () => (dispatch) => {
  dispatch({
    type: DELETE_CONVERSATIONS_TO_MERGE,
    payload: {},
  });
};

export const selectAllConversations = () => (dispatch) => {
  dispatch({
    type: SELECT_ALL_CONVERSATIONS,
    payload: {},
  });
};

export const unselectAllConversations = () => (dispatch) => {
  dispatch({
    type: UNSELECT_ALL_CONVERSATIONS,
    payload: {},
  });
};
