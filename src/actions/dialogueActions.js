import {
    UPDATE_DIALOGUE,
    ADD_CONVERSATION,
    EDIT_CONVERSATION,
    DELETE_CONVERSATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_CONVERSATION_MESSAGE_AT_POS,
    EDIT_CONVERSATION_MESSAGE,
    DELETE_CONVERSATION_MESSAGE,
    UPDATE_DIALOGUE_FILENAME,
} from './types';

export const updateDialogue = dialogueData => dispatch => {
    dispatch({
        type: UPDATE_DIALOGUE,
        payload: dialogueData
    });
}

export const addDialogueConversation = conversationName => dispatch => {
    dispatch({
        type: ADD_CONVERSATION,
        payload: {
            conversationName
        }
    });
}

export const editDialogueConversation = conversation => dispatch => {
    dispatch({
        type: EDIT_CONVERSATION,
        payload: {
            conversation
        }
    });
}

export const deleteDialogueConversation = conversation => dispatch => {
    dispatch({
        type: DELETE_CONVERSATION,
        payload: {
            conversation
        }
    });
}

export const addMessageToConversation = (conversationName, data) => dispatch => {
    dispatch({
        type: ADD_CONVERSATION_MESSAGE,
        payload: {
            conversationName, data
        }
    });
}

export const addMessageAtPosition = (conversation, offset, data) => dispatch => {
    dispatch({
        type: ADD_CONVERSATION_MESSAGE_AT_POS,
        payload: {
            conversation, offset, data
        }
    });
}

export const editConversationMessage = (conversation, offset, data) => dispatch => {
    dispatch({
        type: EDIT_CONVERSATION_MESSAGE,
        payload: {
            conversation, offset, data
        }
    });
}

export const deleteConversationMessage = (conversation, offset) => dispatch => {
    dispatch({
        type: DELETE_CONVERSATION_MESSAGE,
        payload: {
            conversation, offset
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
