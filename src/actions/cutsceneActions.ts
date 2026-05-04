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
  EXPORT_CUTSCENE,
  ADD_CUTSCENE_ROW_TO_BULK,
  REMOVE_CUTSCENE_ROW_FROM_BULK,
  DELETE_CUTSCENE_ROW_BULK,
  BULK_SELECT_ALL_CUTSCENE_ROWS,
  BULK_UNSELECT_ALL_CUTSCENE_ROWS,
} from './types';
import { Dispatch } from '@reduxjs/toolkit';

export const addSavedNodeTarget = (nodeTarget: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_SAVED_NODE_TARGET,
    payload: { nodeTarget },
  });
};

export const removeSavedNodeTarget = (nodeTarget: string) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_SAVED_NODE_TARGET,
    payload: { nodeTarget },
  });
};

export const addSinglePreLoadedCutsceneName = (newName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_SINGLE_PRE_LOADED_CUTSCENE_NAME,
    payload: { newName },
  });
};

export const editPreLoadedCutsceneName = (oldName: string, newName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: EDIT_PRE_LOADED_CUTSCENE_NAME,
    payload: { oldName, newName },
  });
};

export const deletePreLoadedCutsceneName = (cutsceneName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_PRE_LOADED_CUTSCENE_NAME,
    payload: { cutsceneName },
  });
};

export const reorderTemplate =
  (sourcePosition: number, destinationPosition: number, templateId: string) => (dispatch: Dispatch) => {
    dispatch({
      type: REORDER_TEMPLATE,
      payload: { sourcePosition, destinationPosition, templateId },
    });
  };

export const moveEventBetweenTemplates =
  (sourcePosition: number, destinationPosition: number, templateId: string, newTemplateId: string, eventId: string) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: MOVE_EVENT_BETWEEN_TEMPLATES,
      payload: {
        sourcePosition,
        destinationPosition,
        templateId,
        newTemplateId,
        eventId,
      },
    });
  };

export const reorderEventInTemplate =
  (sourcePosition: number, destinationPosition: number, templateId: string, eventId: string) => (dispatch: Dispatch) => {
    dispatch({
      type: REORDER_EVENT_IN_TEMPLATE,
      payload: { sourcePosition, destinationPosition, templateId, eventId },
    });
  };

export const createTemplateWithData =
  (templateName: string, eventDataList: any[]) => (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_TEMPLATE_WITH_DATA,
      payload: { templateName, eventDataList },
    });
  };

export const injectTemplate = (rowId: string, templateId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: INJECT_TEMPLATE,
    payload: { rowId, templateId },
  });
};

export const deleteTemplate = (templateId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_TEMPLATE_NAME,
    payload: { templateId },
  });
};

export const updateTemplateName =
  (templateId: string, newTemplateName: string) => (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_TEMPLATE_NAME,
      payload: { templateId, newTemplateName },
    });
  };

export const createTemplate = (templateName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CREATE_TEMPLATE,
    payload: { templateName },
  });
};

export const addExistingEventToTemplate =
  (templateId: string, eventData: string) => (dispatch: Dispatch) => {
    dispatch({
      type: ADD_EXISTING_EVENT_TO_TEMPLATE,
      payload: { templateId, eventData },
    });
  };

export const moveCutsceneEvent =
  (
    sourcePosition: number,
    destinationPosition: number,
    sourceRowId: string,
    destinationRowId: string,
    eventId: string
  ) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: MOVE_CUTSCENE_EVENT,
      payload: {
        sourcePosition,
        destinationPosition,
        sourceRowId,
        destinationRowId,
        eventId,
      },
    });
  };

export const reorderCutsceneEvent =
  (sourcePosition: number, destinationPosition: number, rowId: string, eventId: string) => (dispatch: Dispatch) => {
    dispatch({
      type: REORDER_CUTSCENE_EVENT,
      payload: { sourcePosition, destinationPosition, rowId, eventId },
    });
  };

export const reorderCutsceneRows =
  (sourcePosition: number, destinationPosition: number, rowId: string) => (dispatch: Dispatch) => {
    dispatch({
      type: REORDER_CUTSCENE_ROWS,
      payload: { sourcePosition, destinationPosition, rowId },
    });
  };

export const addPreLoadedCutscenes = (preLoadedCutsceneNames: string[]) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_PRE_LOADED_CUTSCENE_NAMES,
    payload: { preLoadedCutsceneNames },
  });
};

export const deletePreLoadedCutscenes = () => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_PRELOADED_CUTSCENE_NAMES,
    payload: {},
  });
};

// Cutscenes

export const updateCutscene = (cutsceneData: any) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE,
    payload: cutsceneData,
  });
};

export const updateWithEmptyCutscene = () => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_WITH_EMPTY_CUTSCENE,
    payload: {},
  });
};

export const deleteCutscene = () => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE,
    payload: {},
  });
};

// Cutscene Rows

export const addCutsceneRow = () => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_ROW,
  });
};

export const addCutsceneRowAtPosition = (position: number) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_ROW_AT_POS,
    payload: { position },
  });
};

export const deleteCutsceneRow = (rowId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_ROW,
    payload: { rowId },
  });
};

// Cutscene Event

export const addCutsceneEvent = (rowId: string, cutsceneEventData: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_EVENT,
    payload: {
      rowId,
      cutsceneEventData,
    },
  });
};

export const deleteCutsceneEvent = (eventId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_EVENT,
    payload: {
      eventId,
    },
  });
};

export const editCutsceneEvent = (eventId: string, data: any) => (dispatch: Dispatch) => {
  dispatch({
    type: EDIT_CUTSCENE_EVENT,
    payload: {
      eventId,
      data,
    },
  });
};

// Extra

export const updateCutsceneFileName = (newFileName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE_FILE_NAME,
    payload: {
      newFileName,
    },
  });
};

export const updateCutsceneHideBars = (hideBars: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE_HIDE_BARS,
    payload: {
      hideBars,
    },
  });
};

export const addCutsceneJump = (jumpName: string, cutsceneFile: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_JUMP,
    payload: {
      jumpName,
      cutsceneFile,
    },
  });
};

export const deleteCutsceneJump = (jumpName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_JUMP,
    payload: {
      jumpName,
    },
  });
};

export const addCutsceneRowToBulk = (rowId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_ROW_TO_BULK,
    payload: { rowId },
  });
};

export const removeCutsceneRowFromBulk = (rowId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_CUTSCENE_ROW_FROM_BULK,
    payload: { rowId },
  });
};

export const deleteCutsceneRowBulk = () => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_ROW_BULK,
    payload: {},
  });
};

export const bulkSelectAll = () => (dispatch: Dispatch) => {
  dispatch({
    type: BULK_SELECT_ALL_CUTSCENE_ROWS,
    payload: {},
  });
};

export const bulkUnselectAllCutsceneRows = () => (dispatch: Dispatch) => {
  dispatch({
    type: BULK_UNSELECT_ALL_CUTSCENE_ROWS,
    payload: {},
  });
};

export const exportCurrentCutscene = () => (dispatch: Dispatch) => {
  dispatch({
    type: EXPORT_CUTSCENE,
    payload: {},
  });
};
