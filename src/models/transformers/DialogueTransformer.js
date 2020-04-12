import DialogueSchema from "../schemas/DialogueSchema";
import uuidv4 from "uuid/v4";
import { normalize, denormalize } from "normalizr";

// Converts the data from the game's format to the tool's format.
// This includes packing the conversations inside an array and adding
// unique IDs to all entities.
export const transformIn = (inData) => {
  var dialogueConversations = [];

  // Convert conversations
  Object.keys(inData).forEach((conversationName) => {
    const curConversation = inData[conversationName];
    const conversationMessages = [];

    // Convert messages
    curConversation.forEach((message) => {
      conversationMessages.push(
        Object.assign(message, {
          id: uuidv4(),
        })
      );
    });

    dialogueConversations.push({
      id: uuidv4(),
      conversationName: conversationName,
      messages: conversationMessages,
    });
  });

  // Wrap it all together
  var dialogueData = {
    id: uuidv4(),
    conversations: dialogueConversations,
  };

  // Normalize the data using normalizr to facilitate state manipulation
  return normalize(dialogueData, DialogueSchema);
};

// Converts the data from the tool's format to the game's format
export const transformOut = (dialogueId, outData) => {
  // First, denormalize using normalizr
  var denormalizedData = denormalize(dialogueId, DialogueSchema, outData);

  // Format to the appropiate schema for the game
  var outputData = {};
  denormalizedData.conversations.forEach((curDialogue) => {
    outputData[curDialogue.conversationName] = curDialogue.messages;
  });

  return outputData;
};
