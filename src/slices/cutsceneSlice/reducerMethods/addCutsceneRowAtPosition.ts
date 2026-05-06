import { v4 as uuidv4 } from 'uuid';
import { PayloadAction } from '@reduxjs/toolkit';
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<{position: number}>) {
  const { position } = action.payload;
  const rowId = uuidv4();
  state.cutsceneRows[rowId] = {
    id: rowId,
    cutsceneEvents: [],
  };
  state.cutscenes[state.currentCutsceneId].cutsceneRows.splice(
    position,
    0,
    rowId
  );
}