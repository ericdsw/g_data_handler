import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState, action: PayloadAction<{ newFileName: string }>) {
  const { newFileName } = action.payload;
  state.fileName = newFileName;
}