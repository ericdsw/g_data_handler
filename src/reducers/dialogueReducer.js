import uuidv4 from 'uuid/v4';
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
    DELETE_CONVERSATIONS_TO_MERGE
} from '../actions/types'

const initialState = {

    fileName: '',
    currentDialogue: '',
    conversationsToMerge: [],

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
        case ADD_TO_CONVERSATION_MERGER:
            return addToConversationMerger(state, action);

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

        case REORDER_CONVERSATION:
            return reorderConversations(state, action);
        case REORDER_MESSAGE:
            return reorderMessage(state, action);
        case MOVE_MESSAGE:
            return moveMessage(state, action);
        case SPLIT_CONVERSATION:
            return splitConversation(state, action);
        case CONFIRM_CONVERSATION_MERGE:
            return confirmConversationMerge(state, action);
        case DELETE_CONVERSATIONS_TO_MERGE:
            return deleteAllConversationsToMerge(state, action);
        
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

function addToConversationMerger(state, action) {

    const { conversationId, shouldAdd }= action.payload;
    const conversationsToMerge = [...state.conversationsToMerge];
    if (shouldAdd) {
        conversationsToMerge.push(conversationId);
    } else {
        const removeIndex = conversationsToMerge.indexOf(conversationId)
        conversationsToMerge.splice(removeIndex, 1)
    }

    return Object.assign({}, state, {
        conversationsToMerge
    })
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

    const conversationsToMerge = [...state.conversationsToMerge];
    if (conversationsToMerge.includes(conversationId)) {
        conversationsToMerge.splice(
            conversationsToMerge.indexOf(conversationId, 1)
        )
    }

    const dialogues = {...state.dialogues};
    deleteReference(dialogues, 'conversations', conversationId);

    return Object.assign({}, state, { 
        dialogues, conversations, conversationsToMerge
    });
}

function deleteConversationMessage(state, action) {

    const { messageId } = action.payload;

    const messages = {...state.messages};
    delete messages[messageId];

    const conversations = {...state.conversations};
    deleteReference(conversations, 'messages', messageId);

    return Object.assign({}, state, { conversations, messages });
}

// Extra

function reorderConversations(state, action) {

    const {
        sourcePosition, destinationPosition, dialogueId, conversationId
    } = action.payload;

    const dialogues = {...state.dialogues};
    const newConversationArray = dialogues[dialogueId].conversations;

    newConversationArray.splice(sourcePosition, 1);
    newConversationArray.splice(destinationPosition, 0, conversationId);

    dialogues[dialogueId].conversations = newConversationArray;

    return Object.assign({}, state, {
        dialogues
    });
}

function reorderMessage(state, action) {

    const {
        sourcePosition, destinationPosition, conversationId, messageId
    } = action.payload;

    const conversations = {...state.conversations};
    const messagesArray = conversations[conversationId].messages;

    messagesArray.splice(sourcePosition, 1);
    messagesArray.splice(destinationPosition, 0, messageId);

    conversations[conversationId].messages = messagesArray;

    return Object.assign({}, state, {
        conversations
    });
}

function moveMessage(state, action) {

    const {
        sourcePosition, destinationPosition,
        sourceConversationId, destinationConversationId, messageId
    } = action.payload;

    const conversations = {...state.conversations};

    conversations[sourceConversationId].messages.splice(sourcePosition, 1);
    conversations[destinationConversationId].messages.splice(
        destinationPosition, 0, messageId
    )

    return Object.assign({}, state, {
        conversations
    });
}

function splitConversation(state, action) {

    const { conversationId, messageId, newName } = action.payload;

    const conversations = {...state.conversations};
    const convMessages = [...conversations[conversationId].messages];

    const messageOffset = convMessages.indexOf(messageId);
    const messagesToMove = convMessages.splice(messageOffset);

    const newConversationId = uuidv4();

    const newConversation = {
        id: newConversationId,
        conversationName: newName,
        messages: messagesToMove
    }

    conversations[newConversationId] = newConversation;

    const dialogues = {...state.dialogues};
    const conversationPos = dialogues[state.currentDialogue].conversations.indexOf(conversationId);
    
    dialogues[state.currentDialogue].conversations.splice(conversationPos + 1, 0, newConversationId);

    conversations[conversationId].messages = convMessages;

    return Object.assign({}, state, {
        dialogues, conversations
    });
}

function deleteAllConversationsToMerge(state, action) {

    const dialogues = {...state.dialogues};
    const conversations = {...state.conversations};
    let conversationsToMerge = [...state.conversationsToMerge];

    conversationsToMerge.forEach(conversationId => {
        delete conversations[conversationId];
        deleteReference(dialogues, 'conversations', conversationId);
    });

    conversationsToMerge = [];

    return Object.assign({}, state, {
        dialogues, conversations, conversationsToMerge
    });
}

function confirmConversationMerge(state, action) {

    const dialogues = {...state.dialogues};
    const conversations = {...state.conversations};
    let conversationsToMerge = [...state.conversationsToMerge];

    const finalConversationId = conversationsToMerge[0];

    conversationsToMerge.forEach(conversationId => {
        if (conversationId !== finalConversationId) {

            // Add conversations to the final conversation
            const convMessages = conversations[conversationId].messages;
            conversations[finalConversationId].messages = [
                ...conversations[finalConversationId].messages, ...convMessages
            ]

            // Delete the conversation form the state
            delete conversations[conversationId];

            // Delete any reference to this conversation
            deleteReference(dialogues, 'conversations', conversationId);
        }
    });

    conversationsToMerge = [];

    return Object.assign({}, state, {
        dialogues, conversations, conversationsToMerge
    })

}
