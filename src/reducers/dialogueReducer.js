import {
    UPDATE_DIALOGUE,
    ADD_CONVERSATION,
} from '../actions/types'

const initialState = {
    currentDialogueData: null,
    fileName: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DIALOGUE:
            return updateDialogue(state, action);
        case ADD_CONVERSATION:
            return addDialogueConversation(state, action);
        default:
            return state;
    }
}

function updateDialogue(state, action) {
    const { dialogueData, fileName } = action.payload;
    return Object.assign({}, state, {
        currentDialogueData: dialogueData,
        fileName: fileName,
    });
}

function addDialogueConversation(state, action) {
    const { conversationName } = action.payload;
    let newConversations = {...state.currentDialogueData};
    newConversations[conversationName] = [];
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}
