import {
    UPDATE_DIALOGUE,
    ADD_CONVERSATION,
    DELETE_CONVERSATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_CONVERSATION_MESSAGE_AT_POS,
    EDIT_CONVERSATION_MESSAGE,
    DELETE_CONVERSATION_MESSAGE,
    UPDATE_DIALOGUE_FILENAME,
    UPDATE_EDITING_MESSAGE
} from '../actions/types'

const initialState = {
    currentDialogueData: null,
    fileName: '',
    editingMessage: '',
    editingMessageConversation: '',
    editingMessageOffset: 0,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DIALOGUE:
            return updateDialogue(state, action);
        case ADD_CONVERSATION:
            return addDialogueConversation(state, action);
        case DELETE_CONVERSATION:
            return deleteDialogueConversation(state, action);
        case ADD_CONVERSATION_MESSAGE:
            return addConversationMessage(state, action);
        case ADD_CONVERSATION_MESSAGE_AT_POS:
            return addConversationMessageAtPos(state, action);
        case EDIT_CONVERSATION_MESSAGE:
            return editConversationMessage(state, action);
        case DELETE_CONVERSATION_MESSAGE:
            return deleteConversationMessage(state, action);
        case UPDATE_DIALOGUE_FILENAME:
            return updateDialogueFilename(state, action);
        case UPDATE_EDITING_MESSAGE:
            return updateEditingMessage(state, action);
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

function deleteDialogueConversation(state, action) {
    const { conversation } = action.payload;
    let newConversations = {...state.currentDialogueData};
    delete newConversations[conversation];
    console.log(conversation);
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}

function addConversationMessage(state, action) {
    const { conversationName, data } = action.payload;
    let newConversations = {...state.currentDialogueData};
    newConversations[conversationName] = [...newConversations[conversationName]];
    newConversations[conversationName].push(data);
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}

function addConversationMessageAtPos(state, action) {
    const { conversation, offset, data } = action.payload;
    let newConversations = {...state.currentDialogueData};
    newConversations[conversation] = [...newConversations[conversation]];
    newConversations[conversation].splice(offset, 0, data);
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}

function editConversationMessage(state, action) {
    const { conversation, offset, data } = action.payload;
    let newConversations = {...state.currentDialogueData};
    newConversations[conversation] = [...newConversations[conversation]];
    newConversations[conversation].splice(offset, 1, data);
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}

function deleteConversationMessage(state, action) {
    const { conversation, offset } = action.payload;
    let newConversations = {...state.currentDialogueData};
    newConversations[conversation] = [...newConversations[conversation]];
    newConversations[conversation].splice(offset, 1);
    return Object.assign({}, state, {
        currentDialogueData: newConversations
    });
}

function updateDialogueFilename(state, action) {
    const { fileName } = action.payload;
    return Object.assign({}, state, {
        fileName
    });
}

function updateEditingMessage(state, action) {
    const { editSourceInfo, data } = action.payload;
    return Object.assign({}, state, {
        editingMessage: data,
        editingMessageConversation: editSourceInfo.conversationName,
        editingMessageOffset: editSourceInfo.messageOffset
    });
}
