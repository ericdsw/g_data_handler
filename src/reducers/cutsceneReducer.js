import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { deleteReference } from './reducerActions';

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

  UPDATE_WITH_EMPTY_CUTSCENE,
  DELETE_CUTSCENE,

  ADD_PRE_LOADED_CUTSCENE_NAMES,
  DELETE_PRELOADED_CUTSCENE_NAMES,
  REORDER_CUTSCENE_ROWS,

  REORDER_CUTSCENE_EVENT,
  MOVE_CUTSCENE_EVENT,

  CREATE_TEMPLATE,
  ADD_EXISTING_EVENT_TO_TEMPLATE,
  UPDATE_TEMPLATE_NAME,
  DELETE_TEMPLATE_NAME,
  INJECT_TEMPLATE,
  CREATE_TEMPLATE_WITH_DATA
} from '../actions/types';

const initialState = {

  currentCutsceneId: '',

  cutscenes: {},
  cutsceneRows: {},
  cutsceneEvents: {},

  currentCutsceneJumps: {},

  fileName: '',
  hideBars: false,

  preloadedCutsceneFileNames: [],

  templateIds: [],
  eventTemplates: {},
};

const cutsceneReducer = createReducer(initialState, (builder) => {
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
    .addCase(UPDATE_WITH_EMPTY_CUTSCENE, updateWithEmptyCutscene)
    .addCase(DELETE_CUTSCENE, deleteCutscene)
    .addCase(ADD_PRE_LOADED_CUTSCENE_NAMES, addPreLoadedCutscenes)
    .addCase(DELETE_PRELOADED_CUTSCENE_NAMES, deletePreLoadedCutscenes)
    .addCase(REORDER_CUTSCENE_ROWS, reorderCutsceneRows)
    .addCase(REORDER_CUTSCENE_EVENT, reorderCutsceneEvent)
    .addCase(MOVE_CUTSCENE_EVENT, moveCutsceneEvent)
    .addCase(CREATE_TEMPLATE, createTemplate)
    .addCase(ADD_EXISTING_EVENT_TO_TEMPLATE, addExistingEventToTemplate)
    .addCase(UPDATE_TEMPLATE_NAME, updateTemplateName)
    .addCase(DELETE_TEMPLATE_NAME, deleteTemplate)
    .addCase(INJECT_TEMPLATE, injectTemplate)
    .addCase(CREATE_TEMPLATE_WITH_DATA, createTemplateWithData)
});

function createTemplateWithData(state, action) {

  const { templateName, eventDataList } = action.payload;

  const templateId = uuidv4();
  state.eventTemplates[templateId] = {
    id: templateId,
    name: templateName,
    templateEvents: []
  }
  state.templateIds.push(templateId);

  eventDataList.forEach(eventData => {
    const eventId = uuidv4();
    const cutsceneEvent = {
      ...eventData,
      id: eventId
    };
    state.eventTemplates[templateId].templateEvents.push(eventId);
    state.cutsceneEvents[eventId] = cutsceneEvent
  });

}

function injectTemplate(state, action) {
  const { rowId, templateId } = action.payload;
  state.eventTemplates[templateId].templateEvents.forEach(eventId => {
    const newEventId = uuidv4();
    const newEvent = {
      ...state.cutsceneEvents[eventId],
      id: newEventId
    }
    state.cutsceneEvents[newEventId] = newEvent;
    state.cutsceneRows[rowId].cutsceneEvents.push(newEventId)
  })
}

function updateTemplateName(state, action) {
  const { templateId, newTemplateName } = action.payload;
  state.eventTemplates[templateId].name = newTemplateName
}

function deleteTemplate(state, action) {
  const { templateId } = action.payload;
  state.eventTemplates[templateId].templateEvents.forEach(eventId => {
    delete state.cutsceneEvents[eventId];
  });
  delete state.eventTemplates[templateId];
  state.templateIds.splice(state.templateIds.indexOf(templateId), 1);
}

function createTemplate(state, action) {
  const { templateName } = action.payload;
  const templateId = uuidv4();
  state.eventTemplates[templateId] = {
    id: templateId,
    name: templateName,
    templateEvents: []
  }
  state.templateIds.push(templateId);
}

function addExistingEventToTemplate(state, action) {
  const { eventData, templateId } = action.payload;
  const newId = uuidv4();
  const newEvent = {
    ...eventData,
    id: newId
  };

  state.eventTemplates[templateId].templateEvents.push(newId);
  state.cutsceneEvents[newId] = newEvent;
}

function reorderCutsceneRows(state, action) {

  const { sourcePosition, destinationPosition, rowId } = action.payload;
  const cutsceneId = state.currentCutsceneId;

  state.cutscenes[cutsceneId].cutsceneRows.splice(sourcePosition, 1);
  state.cutscenes[cutsceneId].cutsceneRows.splice(
    destinationPosition,
    0,
    rowId
  );
}

function reorderCutsceneEvent(state, action) {
  const { sourcePosition, destinationPosition, rowId, eventId } = action.payload;
  state.cutsceneRows[rowId].cutsceneEvents.splice(sourcePosition, 1);
  state.cutsceneRows[rowId].cutsceneEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function moveCutsceneEvent(state, action) {
  const {
    sourcePosition,
    destinationPosition,
    sourceRowId,
    destinationRowId,
    eventId
  } = action.payload;

  state.cutsceneRows[sourceRowId].cutsceneEvents.splice(sourcePosition, 1);
  state.cutsceneRows[destinationRowId].cutsceneEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function addPreLoadedCutscenes(state, action) {
  const { preLoadedCutsceneNames } = action.payload;
  state.preloadedCutsceneFileNames = preLoadedCutsceneNames;
}

function deletePreLoadedCutscenes(state, action) {
  state.preloadedCutsceneFileNames = [];
}

function updateCutscene(state, action) {
  const {
    currentCutsceneId,
    cutscenes,
    cutsceneRows,
    cutsceneEvents,
    jumps,
    fileName,
    hideBars
  } = action.payload;

  state.currentCutsceneId = currentCutsceneId;
  state.cutscenes = cutscenes;
  state.cutsceneRows = cutsceneRows;
  state.cutsceneEvents = cutsceneEvents;
  state.currentCutsceneJumps = jumps
  state.fileName = fileName;
  state.hideBars = hideBars
}

function updateWithEmptyCutscene(state, action) {

  let custsceneRelatedEvents = [];
  Object.keys(state.cutsceneRows).forEach(rowId => {
    custsceneRelatedEvents = [
      ...custsceneRelatedEvents,
      ...state.cutsceneRows[rowId].cutsceneEvents
    ]
  });

  const cutsceneId = uuidv4();
  state.currentCutsceneId = cutsceneId;
  state.cutscenes[cutsceneId] = {
    id: cutsceneId,
    cutsceneRows: []
  }
  state.cutsceneRows = {};
  state.currentCutsceneJumps = {};
  state.fileName = 'cutscene_file_name.json';
  state.hideBars = false;

  custsceneRelatedEvents.forEach(cutsceneId => {
    delete state.cutsceneEvents[cutsceneId];
  });
}

function deleteCutscene(state, action) {

  let custsceneRelatedEvents = [];
  Object.keys(state.cutsceneRows).forEach(rowId => {
    custsceneRelatedEvents = [
      ...custsceneRelatedEvents,
      ...state.cutsceneRows[rowId].cutsceneEvents
    ]
  });

  state.currentCutsceneId = '';
  state.cutscenes = {};
  state.cutsceneRows = {};
  state.currentCutsceneJumps = {};
  state.fileName = '';
  state.hideBars = false;

  custsceneRelatedEvents.forEach(cutsceneId => {
    delete state.cutsceneEvents[cutsceneId];
  });
}

function addCutsceneRow(state, action) {
  const rowId = uuidv4();
  state.cutsceneRows[rowId] = {
    id: rowId,
    cutsceneEvents: []
  }
  state.cutscenes[state.currentCutsceneId].cutsceneRows.push(rowId)
}

function addCutsceneRowAtPosition(state, action) {
  const { position } = action.payload;
  const rowId = uuidv4();
  state.cutsceneRows[rowId] = {
    id: rowId,
    cutsceneEvents: []
  }
  state.cutscenes[state.currentCutsceneId].cutsceneRows.splice(position, 0, rowId)
}

function deleteCutsceneRow(state, action) {
  const { rowId } = action.payload;
  const rowEvents = state.cutsceneRows[rowId].cutsceneEvents;
  rowEvents.forEach(eventId => {
    delete state.cutsceneEvents[eventId];
  });
  delete state.cutsceneRows[rowId];
  deleteReference(state.cutscenes, 'cutsceneRows', rowId);
}

function addCutsceneEvent(state, action) {
  const { rowId, cutsceneEventData } = action.payload;
  const eventId = uuidv4();
  state.cutsceneRows[rowId].cutsceneEvents.push(eventId);
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...cutsceneEventData
  }
}

function deleteCutsceneEvent(state, action) {
  const { eventId } = action.payload;
  delete state.cutsceneEvents[eventId];
  deleteReference(state.cutsceneRows, 'cutsceneEvents', eventId);
}

function editCutsceneEvent(state, action) {
  const { eventId, data } = action.payload;
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...data
  }
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
