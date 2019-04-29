import {
    UPDATE_DIALOGUE,
    ADD_CONVERSATION
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
