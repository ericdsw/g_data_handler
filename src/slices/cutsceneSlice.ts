import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const cutsceneSlice = createSlice({
  name: 'cutscene',
  initialState,
  reducers: {

    updateCutscene: (state, action) => {
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
    },

    addCutsceneRow: (state, action) => {
      
    }
  }
});
