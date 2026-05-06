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
    addCutsceneRow,
  }
});
