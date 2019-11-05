import uuidv4 from 'uuid/v4';
import { deleteReference } from './reducerActions';
import {
    UPDATE_DIALOGUE,
    UPDATE_EMPTY_DIALOGUE,
    ADD_CONVERSATION,
    DELETE_CONVERSATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_CONVERSATION_MESSAGE_AT_POS,
    EDIT_CONVERSATION,
    EDIT_CONVERSATION_MESSAGE,
    DELETE_CONVERSATION_MESSAGE,
    UPDATE_DIALOGUE_FILENAME,
    DELETE_DIALOGUE
} from '../actions/types'

const initialState = {

    fileName: '',
    currentDialogue: '',

    dialogues: {},
    conversations: {},
    messages: {},
};

export default function(state = initialState, action) {

    switch(action.type) {

        case ADD_CONVERSATION:
            return addDialogueConversation(state, action);
        case ADD_CONVERSATION_MESSAGE:
            return addConversationMessage(state, action);
        case ADD_CONVERSATION_MESSAGE_AT_POS:
            return addConversationMessageAtPos(state, action);

        case UPDATE_DIALOGUE:
            return updateDialogue(state, action);
        case UPDATE_EMPTY_DIALOGUE:
            return updateWithEmptyDialogue(state, action);
        case EDIT_CONVERSATION:
            return updateDialogueConversation(state, action);
        case EDIT_CONVERSATION_MESSAGE:
            return editConversationMessage(state, action);
        case UPDATE_DIALOGUE_FILENAME:
            return updateDialogueFilename(state, action);

        case DELETE_DIALOGUE:
            return deleteCurrentDialogue(state, action);
        case DELETE_CONVERSATION:
            return deleteDialogueConversation(state, action);
        case DELETE_CONVERSATION_MESSAGE:
            return deleteConversationMessage(state, action);
        
        default:
            return state;
    }
}

// Create

function addDialogueConversation(state, action) {

    const { dialogueId, conversationName } = action.payload;
    const conversationId = uuidv4();

    const dialogues = {...state.dialogues};
    const conversations = {...state.conversations};

    const conversation = {
        id: conversationId,
        conversationName: conversationName,
        messages: []
    }

    conversations[conversationId] = conversation;
    dialogues[dialogueId].conversations.push(conversationId);

    return Object.assign({}, state, { dialogues, conversations })
}

function addConversationMessage(state, action) {

    const { conversationId, data } = action.payload;
    const newMessageId = uuidv4();

    const conversations = {...state.conversations};
    const messages = {...state.messages};

    const newMessage = Object.assign({
        id: newMessageId,
    }, data);

    conversations[conversationId].messages.push(newMessageId);
    messages[newMessageId] = newMessage;

    return Object.assign({}, state, { conversations, messages });
}

function addConversationMessageAtPos(state, action) {

    const { conversationId, offset, data} = action.payload;
    const newMessageId = uuidv4(); 

    const conversations = {...state.conversations};
    const messages = {...state.messages};

    const newMessage = Object.assign({
        id: newMessageId,
    }, data);

    conversations[conversationId].messages.splice(offset, 0, newMessage);
    messages[newMessageId] = newMessage;

    return Object.assign({}, state, { conversations, messages });
}

// Update / Edit

function updateDialogue(state, action) {
    const { fileName, dialogueId, entities } = action.payload;
    return Object.assign({...initialState}, {
        fileName: fileName,
        currentDialogue: dialogueId
   }, entities);
}

function updateWithEmptyDialogue(state, action) {

    const { fileName } = action.payload;
    const dialogueId = uuidv4();

    var emptyDialogueData = {
        [dialogueId]: {
            id: dialogueId,
            conversations: []
        }
    }

    return Object.assign({}, state, {
        fileName: fileName,
        currentDialogue: dialogueId,
        dialogues: emptyDialogueData,
        conversations: {},
        messages: {},
    });
}

function updateDialogueConversation(state, action) {

    const { conversationId, data } = action.payload;
    const conversations = {...state.conversations};

    conversations[conversationId] = Object.assign(
        conversations[conversationId], data
    );

    return Object.assign({}, state, { conversations });
}

function editConversationMessage(state, action) {

    const { messageId, data } = action.payload;
    const messages = {...state.messages};

    messages[messageId] = Object.assign(messages[messageId], data)

    return Object.assign({}, state, { messages });
}

function updateDialogueFilename(state, action) {
    const { fileName } = action.payload;
    return Object.assign({}, state, { fileName });
}

// Delete

function deleteCurrentDialogue(state, action) {
    return Object.assign({}, {...initialState});
}

function deleteDialogueConversation(state, action) {

    const { conversationId } = action.payload;

    const conversations = {...state.conversations};
    delete conversations[conversationId];

    const dialogues = {...state.dialogues};
    deleteReference(dialogues, 'conversations', conversationId);

    return Object.assign({}, state, { dialogues, conversations });
}

function deleteConversationMessage(state, action) {

    const { messageId } = action.payload;

    const messages = {...state.messages};
    delete messages[messageId];

    const conversations = {...state.conversations};
    deleteReference(conversations, 'messages', messageId);

    return Object.assign({}, state, { conversations, messages });
}
