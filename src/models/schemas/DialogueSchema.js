import { schema } from "normalizr";

const MessageSchema = new schema.Entity("messages");

const ConversationSchema = new schema.Entity("conversations", {
  messages: [MessageSchema],
});

const DialogueSchema = new schema.Entity("dialogues", {
  conversations: [ConversationSchema],
});

export default DialogueSchema;
