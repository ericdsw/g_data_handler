import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";

export default function(
  state: CutsceneSliceState,
  action: PayloadAction<{ jumpName: string, cutsceneFile: string }>
) {
  const { jumpName, cutsceneFile } = action.payload;
  state.currentCutsceneJumps[jumpName] = cutsceneFile;
}