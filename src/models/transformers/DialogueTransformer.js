import { normalize, denormalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';

import DialogueSchema from '../schemas/DialogueSchema';

/**
 * Converts the data from the game's format to the tool's format.
 * This includes packing the conversations inside an array and adding
 * unique IDs to all entities.
 */
export const transformIn = (inData) => {
  const dialogueConversations = Object.keys(inData).map((conversationName) => {
    const curConversation = inData[conversationName];
    const conversationMessages = curConversation.map((message) => ({
      ...message,
      id: uuidv4(),
    }));
    return {
      id: uuidv4(),
      conversationName,
      messages: conversationMessages,
    };
  });

  return normalize(
    {
      id: uuidv4(),
      conversations: dialogueConversations,
    },
    DialogueSchema
  );
};

/**
 * Converts the data from the tool's format to the game's format.
 */
export const transformOut = (dialogueId, outData) => {
  /** Step 1: denormalize */
  var denormalizedData = denormalize(dialogueId, DialogueSchema, outData);

  /** Step 2: transform */
  var outputData = {};
  denormalizedData.conversations.forEach((curDialogue) => {
    outputData[curDialogue.conversationName] = curDialogue.messages;
  });

  return outputData;
};
