import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<{ jumpName: string }>) {
  const { jumpName } = action.payload;
  delete state.currentCutsceneJumps[jumpName];
}