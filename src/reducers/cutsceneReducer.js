import {
  UPDATE_CUTSCENE,
  ADD_CUTSCENE_ROW,
  ADD_CUTSCENE_ROW_AT_POS,
  DELETE_CUTSCENE_ROW,
  ADD_CUTSCENE_EVENT,
  DELETE_CUTSCENE_EVENT,
  EDIT_CUTSCENE_EVENT,
  UPDATE_CUTSCENE_FILE_NAME,
  UPDATE_CUTSCENE_HIDE_BARS,
  ADD_CUTSCENE_JUMP,
  DELETE_CUTSCENE_JUMP,
} from "../actions/types";

const initialState = {
  currentCutscene: null,
  currentCutsceneJumps: {},
  fileName: "",
  hideBars: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CUTSCENE:
      return updateCutscene(state, action);
    case ADD_CUTSCENE_ROW:
      return addCutsceneRow(state, action);
    case ADD_CUTSCENE_ROW_AT_POS:
      return addCutsceneRowAtPosition(state, action);
    case DELETE_CUTSCENE_ROW:
      return deleteCutsceneRow(state, action);
    case ADD_CUTSCENE_EVENT:
      return addCutsceneEvent(state, action);
    case DELETE_CUTSCENE_EVENT:
      return deleteCutsceneEvent(state, action);
    case EDIT_CUTSCENE_EVENT:
      return editCutsceneEvent(state, action);
    case UPDATE_CUTSCENE_FILE_NAME:
      return updateCutsceneFileName(state, action);
    case UPDATE_CUTSCENE_HIDE_BARS:
      return updateCutsceneHideBars(state, action);
    case ADD_CUTSCENE_JUMP:
      return addCutsceneJump(state, action);
    case DELETE_CUTSCENE_JUMP:
      return deleteCutsceneJump(state, action);
    default:
      return state;
  }
}

function updateCutscene(state, action) {
  const { cutscene, jumps, fileName, hideBars } = action.payload;
  return {
    ...state,
    currentCutscene: cutscene,
    currentCutsceneJumps: jumps,
    fileName: fileName,
    hideBars: hideBars,
  };
}

function addCutsceneRow(state, action) {
  return { ...state, currentCutscene: [...state.currentCutscene, []] };
}

function addCutsceneRowAtPosition(state, action) {
  const { position } = action.payload;
  let rows = [...state.currentCutscene];
  rows.splice(position, 0, []);
  return { ...state, currentCutscene: rows };
}

function deleteCutsceneRow(state, action) {
  let rows = state.currentCutscene.slice(0);
  rows.splice(action.payload, 1);
  return { ...state, currentCutscene: rows };
}

function addCutsceneEvent(state, action) {
  const { rowOffset, cutsceneEventData } = action.payload;
  let rows = [...state.currentCutscene];
  rows[rowOffset].push(cutsceneEventData);
  return { ...state, currentCutscene: rows };
}

function deleteCutsceneEvent(state, action) {
  const { rowOffset, eventOffset } = action.payload;
  let rows = [...state.currentCutscene];
  rows[rowOffset] = [...rows[rowOffset]];
  rows[rowOffset].splice(eventOffset, 1);
  return { ...state, currentCutscene: rows };
}

function editCutsceneEvent(state, action) {
  const { rowOffset, eventOffset, data } = action.payload;
  let rows = [...state.currentCutscene];
  rows[rowOffset] = [...rows[rowOffset]];
  rows[rowOffset].splice(eventOffset, 1);
  rows[rowOffset].splice(eventOffset, 0, data);
  return { ...state, currentCutscene: rows };
}

function updateCutsceneFileName(state, action) {
  const { newFileName } = action.payload;
  return { ...state, fileName: newFileName };
}

function addCutsceneJump(state, action) {
  const { jumpName, cutsceneFile } = action.payload;
  let newJumps = { ...state.currentCutsceneJumps };
  newJumps[jumpName] = cutsceneFile;
  return { ...state, currentCutsceneJumps: newJumps };
}

function deleteCutsceneJump(state, action) {
  const { jumpName } = action.payload;
  let newJumps = { ...state.currentCutsceneJumps };
  delete newJumps[jumpName];
  return { ...state, currentCutsceneJumps: newJumps };
}

function updateCutsceneHideBars(state, action) {
  const { hideBars } = action.payload;
  return { ...state, hideBars };
}
