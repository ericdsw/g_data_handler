import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<any>) {
  const { eventId, data } = action.payload;
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...data,
  };
}