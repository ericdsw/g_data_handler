import { createReducer, PayloadAction, createAction } from '@reduxjs/toolkit';
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
  REORDER_CUTSCENE_ROWS,
  REORDER_CUTSCENE_EVENT,
  MOVE_CUTSCENE_EVENT,
  CREATE_TEMPLATE,
  ADD_EXISTING_EVENT_TO_TEMPLATE,
  UPDATE_TEMPLATE_NAME,
  DELETE_TEMPLATE_NAME,
  INJECT_TEMPLATE,
  CREATE_TEMPLATE_WITH_DATA,
  REORDER_TEMPLATE,
  REORDER_EVENT_IN_TEMPLATE,
  MOVE_EVENT_BETWEEN_TEMPLATES,
  ADD_PRE_LOADED_CUTSCENE_NAMES,
  DELETE_PRELOADED_CUTSCENE_NAMES,
  ADD_SINGLE_PRE_LOADED_CUTSCENE_NAME,
  EDIT_PRE_LOADED_CUTSCENE_NAME,
  DELETE_PRE_LOADED_CUTSCENE_NAME,
  ADD_SAVED_NODE_TARGET,
  REMOVE_SAVED_NODE_TARGET,
  ADD_CUTSCENE_ROW_TO_BULK,
  REMOVE_CUTSCENE_ROW_FROM_BULK,
  DELETE_CUTSCENE_ROW_BULK,
  EXPORT_CUTSCENE,
  BULK_SELECT_ALL_CUTSCENE_ROWS,
  BULK_UNSELECT_ALL_CUTSCENE_ROWS,
} from '@/actions/types';
import { transformOut } from '@/models/transformers/CutsceneTransformer';
import { downloadJSON } from '@/functions';

type CutsceneSliceState = {
  currentCutsceneId: string,

  cutscenes: {},
  cutsceneRows: {},
  cutsceneEvents: {},

  currentCutsceneJumps: {},

  fileName: string,
  hideBars: boolean,

  preloadedCutsceneFileNames: string[],

  templateIds: string[],
  eventTemplates: {},

  savedNodeTargets: string[],

  cutsceneRowsToMerge: string[]
}

const initialState: CutsceneSliceState = {
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

  savedNodeTargets: [],

  cutsceneRowsToMerge: [],
};

const cutsceneReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction(UPDATE_CUTSCENE), updateCutscene)
    .addCase(createAction(ADD_CUTSCENE_ROW), addCutsceneRow)
    .addCase(createAction(ADD_CUTSCENE_ROW_AT_POS), addCutsceneRowAtPosition)
    .addCase(createAction(DELETE_CUTSCENE_ROW), deleteCutsceneRow)
    .addCase(createAction(ADD_CUTSCENE_EVENT), addCutsceneEvent)
    .addCase(createAction(DELETE_CUTSCENE_EVENT), deleteCutsceneEvent)
    .addCase(createAction(EDIT_CUTSCENE_EVENT), editCutsceneEvent)
    .addCase(createAction(UPDATE_CUTSCENE_FILE_NAME), updateCutsceneFileName)
    .addCase(createAction(UPDATE_CUTSCENE_HIDE_BARS), updateCutsceneHideBars)
    .addCase(createAction(ADD_CUTSCENE_JUMP), addCutsceneJump)
    .addCase(createAction(DELETE_CUTSCENE_JUMP), deleteCutsceneJump)
    .addCase(createAction(UPDATE_WITH_EMPTY_CUTSCENE), updateWithEmptyCutscene)
    .addCase(createAction(DELETE_CUTSCENE), deleteCutscene)
    .addCase(createAction(ADD_PRE_LOADED_CUTSCENE_NAMES), addPreLoadedCutscenes)
    .addCase(createAction(DELETE_PRELOADED_CUTSCENE_NAMES), deletePreLoadedCutscenes)
    .addCase(createAction(REORDER_CUTSCENE_ROWS), reorderCutsceneRows)
    .addCase(createAction(REORDER_CUTSCENE_EVENT), reorderCutsceneEvent)
    .addCase(createAction(MOVE_CUTSCENE_EVENT), moveCutsceneEvent)
    .addCase(createAction(CREATE_TEMPLATE), createTemplate)
    .addCase(createAction(ADD_EXISTING_EVENT_TO_TEMPLATE), addExistingEventToTemplate)
    .addCase(createAction(UPDATE_TEMPLATE_NAME), updateTemplateName)
    .addCase(createAction(DELETE_TEMPLATE_NAME), deleteTemplate)
    .addCase(createAction(INJECT_TEMPLATE), injectTemplate)
    .addCase(createAction(CREATE_TEMPLATE_WITH_DATA), createTemplateWithData)
    .addCase(createAction(REORDER_TEMPLATE), reorderTemplate)
    .addCase(createAction(REORDER_EVENT_IN_TEMPLATE), reorderEventInTemplate)
    .addCase(createAction(MOVE_EVENT_BETWEEN_TEMPLATES), moveEventBetweenTemplates)
    .addCase(
      createAction(ADD_SINGLE_PRE_LOADED_CUTSCENE_NAME),
      addSinglePreLoadedCutsceneName
    )
    .addCase(createAction(EDIT_PRE_LOADED_CUTSCENE_NAME), editPreLoadedCutsceneName)
    .addCase(createAction(DELETE_PRE_LOADED_CUTSCENE_NAME), deletePreLoadedCutsceneName)
    .addCase(createAction(ADD_SAVED_NODE_TARGET), addSavedNodeTarget)
    .addCase(createAction(REMOVE_SAVED_NODE_TARGET), removeSavedNodeTarget)
    .addCase(createAction(ADD_CUTSCENE_ROW_TO_BULK), addCutsceneRowToBulk)
    .addCase(createAction(REMOVE_CUTSCENE_ROW_FROM_BULK), removeCutsceneRowFromBulk)
    .addCase(createAction(DELETE_CUTSCENE_ROW_BULK), deleteCutsceneRowBulk)
    .addCase(createAction(EXPORT_CUTSCENE), exportCutscene)
    .addCase(createAction(BULK_SELECT_ALL_CUTSCENE_ROWS), bulkSelectAll)
    .addCase(createAction(BULK_UNSELECT_ALL_CUTSCENE_ROWS), bulkUnselectAll);
});

function updateCutscene(state: CutsceneSliceState, action: PayloadAction<any>) {
  const {
    currentCutsceneId,
    cutscenes,
    cutsceneRows,
    cutsceneEvents,
    jumps,
    fileName,
    hideBars,
  } = action.payload;

  const templateEventIds = [];
  Object.keys(state.eventTemplates).forEach((templateId) => {
    state.eventTemplates[templateId].templateEvents.forEach((eventId) => {
      templateEventIds.push(eventId);
    });
  });

  Object.keys(state.cutsceneEvents).forEach((eventId) => {
    if (!templateEventIds.includes(eventId)) {
      delete state.cutsceneEvents[eventId];
    }
  });

  state.currentCutsceneId = currentCutsceneId;
  state.cutscenes = cutscenes;
  state.cutsceneRows = cutsceneRows;
  state.currentCutsceneJumps = jumps;
  state.fileName = fileName;
  state.hideBars = hideBars;

  state.cutsceneEvents = {
    ...state.cutsceneEvents,
    ...cutsceneEvents,
  };
}

function addCutsceneRow(state: CutsceneSliceState) {
  const rowId = uuidv4();
  state.cutsceneRows[rowId] = {
    id: rowId,
    cutsceneEvents: [],
  };
  state.cutscenes[state.currentCutsceneId].cutsceneRows.push(rowId);
}

function addCutsceneRowAtPosition(state: CutsceneSliceState, action: PayloadAction<{position: number}>) {
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

function deleteCutsceneRow(state: CutsceneSliceState, action: PayloadAction<{ rowId: string }>) {
  const { rowId } = action.payload;
  const rowEvents = state.cutsceneRows[rowId].cutsceneEvents;
  rowEvents.forEach((eventId) => {
    delete state.cutsceneEvents[eventId];
  });
  delete state.cutsceneRows[rowId];
  deleteReference(state.cutscenes, 'cutsceneRows', rowId);
}

function addSavedNodeTarget(state: CutsceneSliceState, action: PayloadAction<{ nodeTarget: string }>): void {
  const { nodeTarget } = action.payload;
  if (!state.savedNodeTargets.includes(nodeTarget)) {
    state.savedNodeTargets.push(nodeTarget);
  }
}

function removeSavedNodeTarget(state: CutsceneSliceState, action: PayloadAction<{ nodeTarget: string }>): void {
  const { nodeTarget } = action.payload;
  if (state.savedNodeTargets.includes(nodeTarget)) {
    state.savedNodeTargets.splice(
      state.savedNodeTargets.indexOf(nodeTarget),
      1
    );
  }
}

function addSinglePreLoadedCutsceneName(state: CutsceneSliceState, action: PayloadAction<{ newName: string }>) {
  const { newName } = action.payload;
  if (!state.preloadedCutsceneFileNames.includes(newName)) {
    state.preloadedCutsceneFileNames.push(newName);
  }
}

function editPreLoadedCutsceneName(state: CutsceneSliceState, action: PayloadAction<{oldName: string, newName: string}>) {
  const { oldName, newName } = action.payload;
  if (state.preloadedCutsceneFileNames.includes(oldName)) {
    const index = state.preloadedCutsceneFileNames.indexOf(oldName);
    state.preloadedCutsceneFileNames.splice(index, 1);
    state.preloadedCutsceneFileNames.splice(index, 0, newName);
  }
}

function deletePreLoadedCutsceneName(state: CutsceneSliceState, action: PayloadAction<{ cutsceneName: string }>) {
  const { cutsceneName } = action.payload;
  if (state.preloadedCutsceneFileNames.includes(cutsceneName)) {
    const index = state.preloadedCutsceneFileNames.indexOf(cutsceneName);
    state.preloadedCutsceneFileNames.splice(index, 1);
  }
}

function reorderTemplate(state: CutsceneSliceState, action: PayloadAction<{ sourcePosition: number, destinationPosition: number, templateId: string }>) {
  const { sourcePosition, destinationPosition, templateId } = action.payload;
  state.templateIds.splice(sourcePosition, 1);
  state.templateIds.splice(destinationPosition, 0, templateId);
}

function reorderEventInTemplate(
  state: CutsceneSliceState,
  action: PayloadAction<{
    sourcePosition: number,
    destinationPosition: number,
    templateId: string,
    eventId: string
  }>
) {
  const { sourcePosition, destinationPosition, templateId, eventId } =
    action.payload;
  state.eventTemplates[templateId].templateEvents.splice(sourcePosition, 1);
  state.eventTemplates[templateId].templateEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function moveEventBetweenTemplates(
  state: CutsceneSliceState,
  action: PayloadAction<{
    sourcePosition: number,
    destinationPosition: number,
    templateId: string,
    newTemplateId: string,
    eventId: string
  }>
) {
  const {
    sourcePosition,
    destinationPosition,
    templateId,
    newTemplateId,
    eventId,
  } = action.payload;
  state.eventTemplates[templateId].templateEvents.splice(sourcePosition, 1);
  state.eventTemplates[newTemplateId].templateEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function createTemplateWithData(state: CutsceneSliceState, action: PayloadAction<any>) {
  const { templateName, eventDataList } = action.payload;

  const templateId = uuidv4();
  state.eventTemplates[templateId] = {
    id: templateId,
    name: templateName,
    templateEvents: [],
  };
  state.templateIds.push(templateId);

  eventDataList.forEach((eventData) => {
    const eventId = uuidv4();
    const cutsceneEvent = {
      ...eventData,
      id: eventId,
    };
    state.eventTemplates[templateId].templateEvents.push(eventId);
    state.cutsceneEvents[eventId] = cutsceneEvent;
  });
}

function injectTemplate(state: CutsceneSliceState, action: PayloadAction<{ rowId: string, templateId: string }>) {
  const { rowId, templateId } = action.payload;
  state.eventTemplates[templateId].templateEvents.forEach((eventId) => {
    const newEventId = uuidv4();
    const newEvent = {
      ...state.cutsceneEvents[eventId],
      id: newEventId,
    };
    state.cutsceneEvents[newEventId] = newEvent;
    state.cutsceneRows[rowId].cutsceneEvents.push(newEventId);
  });
}

function updateTemplateName(state: CutsceneSliceState, action: PayloadAction<{ templateId: string, newTemplateName: string }>) {
  const { templateId, newTemplateName } = action.payload;
  state.eventTemplates[templateId].name = newTemplateName;
}

function deleteTemplate(state: CutsceneSliceState, action: PayloadAction<{ templateId: string }>) {
  const { templateId } = action.payload;
  state.eventTemplates[templateId].templateEvents.forEach((eventId) => {
    delete state.cutsceneEvents[eventId];
  });
  delete state.eventTemplates[templateId];
  state.templateIds.splice(state.templateIds.indexOf(templateId), 1);
}

function createTemplate(state: CutsceneSliceState, action: PayloadAction<{ templateName: string }>) {
  const { templateName } = action.payload;
  const templateId = uuidv4();
  state.eventTemplates[templateId] = {
    id: templateId,
    name: templateName,
    templateEvents: [],
  };
  state.templateIds.push(templateId);
}

function addExistingEventToTemplate(state: CutsceneSliceState, action: PayloadAction<any>) {
  const { eventData, templateId } = action.payload;
  const newId = uuidv4();
  const newEvent = {
    ...eventData,
    id: newId,
  };

  state.eventTemplates[templateId].templateEvents.push(newId);
  state.cutsceneEvents[newId] = newEvent;
}

function reorderCutsceneRows(
  state: CutsceneSliceState,
  action: PayloadAction<{
    sourcePosition: number,
    destinationPosition: number,
    rowId: string
  }>
) {
  const { sourcePosition, destinationPosition, rowId } = action.payload;
  const cutsceneId = state.currentCutsceneId;

  state.cutscenes[cutsceneId].cutsceneRows.splice(sourcePosition, 1);
  state.cutscenes[cutsceneId].cutsceneRows.splice(
    destinationPosition,
    0,
    rowId
  );
}

function reorderCutsceneEvent(
  state: CutsceneSliceState,
  action: PayloadAction<{
    sourcePosition: number,
    destinationPosition: number,
    rowId: string,
    eventId: string
  }>
) {
  const { sourcePosition, destinationPosition, rowId, eventId } =
    action.payload;
  state.cutsceneRows[rowId].cutsceneEvents.splice(sourcePosition, 1);
  state.cutsceneRows[rowId].cutsceneEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function moveCutsceneEvent(
  state: CutsceneSliceState,
  action: PayloadAction<{
    sourcePosition: number,
    destinationPosition: number,
    sourceRowId: string,
    destinationRowId: string,
    eventId: string
  }>
) {
  const {
    sourcePosition,
    destinationPosition,
    sourceRowId,
    destinationRowId,
    eventId,
  } = action.payload;

  state.cutsceneRows[sourceRowId].cutsceneEvents.splice(sourcePosition, 1);
  state.cutsceneRows[destinationRowId].cutsceneEvents.splice(
    destinationPosition,
    0,
    eventId
  );
}

function addPreLoadedCutscenes(state: CutsceneSliceState, action: PayloadAction<any>) {
  const { preLoadedCutsceneNames } = action.payload;
  state.preloadedCutsceneFileNames = preLoadedCutsceneNames;
}

function deletePreLoadedCutscenes(state: CutsceneSliceState) {
  state.preloadedCutsceneFileNames = [];
}

function updateWithEmptyCutscene(state: CutsceneSliceState) {
  let custsceneRelatedEvents = [];
  Object.keys(state.cutsceneRows).forEach((rowId) => {
    custsceneRelatedEvents = [
      ...custsceneRelatedEvents,
      ...state.cutsceneRows[rowId].cutsceneEvents,
    ];
  });

  const cutsceneId = uuidv4();
  state.currentCutsceneId = cutsceneId;
  state.cutscenes[cutsceneId] = {
    id: cutsceneId,
    cutsceneRows: [],
  };
  state.cutsceneRows = {};
  state.currentCutsceneJumps = {};
  state.fileName = 'cutscene_file_name.json';
  state.hideBars = false;

  custsceneRelatedEvents.forEach((cutsceneId) => {
    delete state.cutsceneEvents[cutsceneId];
  });
}

function deleteCutscene(state: CutsceneSliceState) {
  let custsceneRelatedEvents = [];
  Object.keys(state.cutsceneRows).forEach((rowId) => {
    custsceneRelatedEvents = [
      ...custsceneRelatedEvents,
      ...state.cutsceneRows[rowId].cutsceneEvents,
    ];
  });

  state.currentCutsceneId = '';
  state.cutscenes = {};
  state.cutsceneRows = {};
  state.currentCutsceneJumps = {};
  state.fileName = '';
  state.hideBars = false;

  custsceneRelatedEvents.forEach((cutsceneId) => {
    delete state.cutsceneEvents[cutsceneId];
  });
}

function addCutsceneEvent(state: CutsceneSliceState, action: PayloadAction<{ rowId: string, cutsceneEventData: any }>) {
  const { rowId, cutsceneEventData } = action.payload;
  const eventId = uuidv4();
  state.cutsceneRows[rowId].cutsceneEvents.push(eventId);
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...cutsceneEventData,
  };
}

function deleteCutsceneEvent(state: CutsceneSliceState, action: PayloadAction<{ eventId: string }>) {
  const { eventId } = action.payload;
  delete state.cutsceneEvents[eventId];
  deleteReference(state.cutsceneRows, 'cutsceneEvents', eventId);
  deleteReference(state.eventTemplates, 'templateEvents', eventId);
}

function editCutsceneEvent(state: CutsceneSliceState, action: PayloadAction<any>) {
  const { eventId, data } = action.payload;
  state.cutsceneEvents[eventId] = {
    id: eventId,
    ...data,
  };
}

function updateCutsceneFileName(state: CutsceneSliceState, action: PayloadAction<{ newFileName: string }>) {
  const { newFileName } = action.payload;
  state.fileName = newFileName;
}

function addCutsceneJump(state: CutsceneSliceState, action: PayloadAction<{ jumpName: string, cutsceneFile: string }>) {
  const { jumpName, cutsceneFile } = action.payload;
  state.currentCutsceneJumps[jumpName] = cutsceneFile;
}

function deleteCutsceneJump(state: CutsceneSliceState, action: PayloadAction<{ jumpName: string }>) {
  const { jumpName } = action.payload;
  delete state.currentCutsceneJumps[jumpName];
}

function updateCutsceneHideBars(state: CutsceneSliceState, action: PayloadAction<{ hideBars: boolean }>) {
  const { hideBars } = action.payload;
  state.hideBars = hideBars;
}

function addCutsceneRowToBulk(state: CutsceneSliceState, action: PayloadAction<{ rowId: string }>) {
  const { rowId } = action.payload;
  state.cutsceneRowsToMerge.push(rowId);
}

function removeCutsceneRowFromBulk(state: CutsceneSliceState, action: PayloadAction<{ rowId: string }>) {
  const { rowId } = action.payload;
  state.cutsceneRowsToMerge.splice(state.cutsceneRowsToMerge.indexOf(rowId), 1);
}

function bulkSelectAll(state: CutsceneSliceState) {
  state.cutsceneRowsToMerge =
    state.cutscenes[state.currentCutsceneId].cutsceneRows;
}

function bulkUnselectAll(state: CutsceneSliceState) {
  state.cutsceneRowsToMerge.length = 0;
}

function deleteCutsceneRowBulk(state: CutsceneSliceState) {
  const { cutsceneRowsToMerge } = state;
  cutsceneRowsToMerge.forEach((rowId) => {
    const rowEvents = state.cutsceneRows[rowId].cutsceneEvents;
    rowEvents.forEach((eventId) => {
      delete state.cutsceneEvents[eventId];
    });
    delete state.cutsceneRows[rowId];
    deleteReference(state.cutscenes, 'cutsceneRows', rowId);
  });
  state.cutsceneRowsToMerge.length = 0;
}

function exportCutscene(state: CutsceneSliceState) {
  const {
    currentCutsceneId,
    cutscenes,
    hideBars,
    cutsceneEvents,
    cutsceneRows,
    currentCutsceneJumps,
    fileName,
  } = state;
  const currentCutscene = cutscenes[currentCutsceneId];
  const result = {
    data: transformOut(currentCutsceneId, {
      cutscenes: {
        [currentCutsceneId]: currentCutscene,
      },
      cutsceneRows,
      cutsceneEvents,
    }),
    cutscene_jumps: currentCutsceneJumps,
    hide_black_bars: hideBars,
  };
  downloadJSON(fileName, result);
}

export default cutsceneReducer;
