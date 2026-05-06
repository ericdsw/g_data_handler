import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import type CutsceneSliceState  from './CutsceneSliceState';
import { updateCutscene, addCutsceneRow } from './reducerMethods';

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

const cutsceneSlice = createSlice({
  name: 'cutscene',
  initialState,
  reducers: {
    updateCutscene,
    addCutsceneRow
    // updateCutscene: (state, action) => {
    //   const {
    //     currentCutsceneId,
    //     cutscenes,
    //     cutsceneRows,
    //     cutsceneEvents,
    //     jumps,
    //     fileName,
    //     hideBars,
    //   } = action.payload;
    //
    //   const templateEventIds = [];
    //   Object.keys(state.eventTemplates).forEach((templateId) => {
    //     state.eventTemplates[templateId].templateEvents.forEach((eventId) => {
    //       templateEventIds.push(eventId);
    //     });
    //   });
    //
    //   Object.keys(state.cutsceneEvents).forEach((eventId) => {
    //     if (!templateEventIds.includes(eventId)) {
    //       delete state.cutsceneEvents[eventId];
    //     }
    //   });
    //
    //   state.currentCutsceneId = currentCutsceneId;
    //   state.cutscenes = cutscenes;
    //   state.cutsceneRows = cutsceneRows;
    //   state.currentCutsceneJumps = jumps;
    //   state.fileName = fileName;
    //   state.hideBars = hideBars;
    //
    //   state.cutsceneEvents = {
    //     ...state.cutsceneEvents,
    //     ...cutsceneEvents,
    //   };
    // },

    addCutsceneRow: (state) => {
      const rowId = uuidv4();
      state.cutsceneRows[rowId] = {
        id: rowId,
        cutsceneEvents: [],
      };
      state.cutscenes[state.currentCutsceneId].cutsceneRows.push(rowId);     
    },

    // addCutsceneRowAtPosition: fooMethod,


  }
});
