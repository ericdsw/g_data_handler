import { createReducer } from '@reduxjs/toolkit';

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
} from '../actions/types';

const initialState = {
  currentCutscene: null,
  currentCutsceneJumps: {},
  fileName: '',
  hideBars: false,
};

const cutsceneReducer = createReducer(initialState, builder => {
  builder
    .addCase(UPDATE_CUTSCENE, updateCutscene)
    .addCase(ADD_CUTSCENE_ROW, addCutsceneRow)
    .addCase(ADD_CUTSCENE_ROW_AT_POS, addCutsceneRowAtPosition)
    .addCase(DELETE_CUTSCENE_ROW, deleteCutsceneRow)
    .addCase(ADD_CUTSCENE_EVENT, addCutsceneEvent)
    .addCase(DELETE_CUTSCENE_EVENT, deleteCutsceneEvent)
    .addCase(EDIT_CUTSCENE_EVENT, editCutsceneEvent)
    .addCase(UPDATE_CUTSCENE_FILE_NAME, updateCutsceneFileName)
    .addCase(UPDATE_CUTSCENE_HIDE_BARS, updateCutsceneHideBars)
    .addCase(ADD_CUTSCENE_JUMP, addCutsceneJump)
    .addCase(DELETE_CUTSCENE_JUMP, deleteCutsceneJump)
});


function updateCutscene(state, action) {
  const { cutscene, jumps, fileName, hideBars } = action.payload;
  state.currentCutscene = cutscene;
  state.currentCutsceneJumps = jumps;
  state.fileName = fileName;
  state.hideBars = hideBars;
}

function addCutsceneRow(state, action) {
  state.currentCutscene = [...state.currentCutscene, []]
}

function addCutsceneRowAtPosition(state, action) {
  const { position } = action.payload;
  state.currentCutscene.splice(position, 0, [])
}

function deleteCutsceneRow(state, action) {
  state.currentCutscene.splice(action.payload, 1);
}

function addCutsceneEvent(state, action) {
  const { rowOffset, cutsceneEventData } = action.payload;
  state.currentCutscene[rowOffset].push(cutsceneEventData);
}

function deleteCutsceneEvent(state, action) {
  const { rowOffset, eventOffset } = action.payload;
  state.currentCutscene[rowOffset].splice(eventOffset, 1);
}

function editCutsceneEvent(state, action) {
  const { rowOffset, eventOffset, data } = action.payload;
  state.currentCutscene[rowOffset].splice(eventOffset, 1, data);
}

function updateCutsceneFileName(state, action) {
  const { newFileName } = action.payload;
  state.fileName = newFileName;
}

function addCutsceneJump(state, action) {
  const { jumpName, cutsceneFile } = action.payload;
  state.currentCutsceneJumps[jumpName] = cutsceneFile;
}

function deleteCutsceneJump(state, action) {
  const { jumpName } = action.payload;
  delete state.currentCutsceneJumps[jumpName];
}

function updateCutsceneHideBars(state, action) {
  const { hideBars } = action.payload;
  state.hideBars = hideBars;
}


export default cutsceneReducer;