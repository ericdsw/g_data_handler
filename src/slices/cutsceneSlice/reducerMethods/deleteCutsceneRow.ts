import { PayloadAction } from "@reduxjs/toolkit";
import { deleteReference } from "@/reducers/reducerActions";
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<{ rowId: string }>) {
  const { rowId } = action.payload;
  const rowEvents = state.cutsceneRows[rowId].cutsceneEvents;
  rowEvents.forEach((eventId: string) => {
    delete state.cutsceneEvents[eventId];
  });
  delete state.cutsceneRows[rowId];
  deleteReference(state.cutscenes, 'cutsceneRows', rowId);
}