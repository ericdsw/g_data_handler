import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";
import { deleteReference } from "@/reducers/reducerActions";

export default function(
  state: CutsceneSliceState,
  action: PayloadAction<{ eventId: string }>
) {
  const { eventId } = action.payload;
  delete state.cutsceneEvents[eventId];
  deleteReference(state.cutsceneRows, 'cutsceneEvents', eventId);
  deleteReference(state.eventTemplates, 'templateEvents', eventId);
}