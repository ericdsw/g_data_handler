import {
    UPDATE_DIALOGUE,
    UPDATE_EMPTY_DIALOGUE,
    ADD_CONVERSATION,
    EDIT_CONVERSATION,
    DELETE_CONVERSATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_CONVERSATION_MESSAGE_AT_POS,
    EDIT_CONVERSATION_MESSAGE,
    DELETE_CONVERSATION_MESSAGE,
    UPDATE_DIALOGUE_FILENAME,
    DELETE_DIALOGUE,
    REORDER_CONVERSATION
} from './types';

// Create

export const addDialogueConversation = (dialogueId, conversationName) => dispatch => {
    dispatch({
        type: ADD_CONVERSATION,
        payload: {
            dialogueId, conversationName
        }
    });
}

export const addMessageToConversation = (conversationId, data) => dispatch => {
    dispatch({
        type: ADD_CONVERSATION_MESSAGE,
        payload: {
            conversationId, data
        }
    });
}

export const addMessageAtPosition = (conversationId, offset, data) => dispatch => {
    dispatch({
        type: ADD_CONVERSATION_MESSAGE_AT_POS,
        payload: {
            conversationId, offset, data
        }
    });
}

// Edit / Update

export const updateDialogue = (fileName, dialogueId, entities) => dispatch => {
    dispatch({
        type: UPDATE_DIALOGUE,
        payload: { fileName, dialogueId, entities }
    });
}

export const updateWithEmptyDialogue = fileName => dispatch => {
    dispatch({
        type: UPDATE_EMPTY_DIALOGUE,
        payload: { fileName }
    });
}

export const editDialogueConversation = (conversationId, data) => dispatch => {
    dispatch({
        type: EDIT_CONVERSATION,
        payload: {
            conversationId, data
        }
    });
}

export const editConversationMessage = (messageId, data) => dispatch => {
    dispatch({
        type: EDIT_CONVERSATION_MESSAGE,
        payload: {
            messageId, data
        }
    });
}

export const updateDialogueFilename = fileName => dispatch => {
    dispatch({
        type: UPDATE_DIALOGUE_FILENAME,
        payload: {
            fileName
        }
    });
}

// Delete

export const deleteCurrentDialogue = () => dispatch => {
    dispatch({
        type: DELETE_DIALOGUE, 
        payload: {}
    })
}

export const deleteDialogueConversation = conversationId => dispatch => {
    dispatch({
        type: DELETE_CONVERSATION,
        payload: {
            conversationId
        }
    });
}

export const deleteConversationMessage = messageId => dispatch => {
    dispatch({
        type: DELETE_CONVERSATION_MESSAGE,
        payload: {
            messageId
        }
    });
}

// Extra

export const reorderConversations = (
    sourcePosition, destinationPosition, dialogueId, conversationId
) => dispatch => {
    dispatch({
        type: REORDER_CONVERSATION,
        payload: {
            sourcePosition, destinationPosition, dialogueId, conversationId
        }
    })
}


