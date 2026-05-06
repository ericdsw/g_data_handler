import { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<{ rowId: string, cutsceneEventData: any }>) {
  const { rowId, cutsceneEventData } = action.payload;
  const eventId = uuidv4();
  state.cutsceneRows[rowId].cutsceneEvents.push(eventId);
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...cutsceneEventData,
  };
}