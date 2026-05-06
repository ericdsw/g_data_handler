import { v4 as uuidv4 } from 'uuid';
import CutsceneSliceState from "../CutsceneSliceState";

export default function(state: CutsceneSliceState): void {
  const rowId = uuidv4();
  state.cutsceneRows[rowId] = {
    id: rowId,
    cutsceneEvents: [],
  };
  state.cutscenes[state.currentCutsceneId].cutsceneRows.push(rowId);
}
