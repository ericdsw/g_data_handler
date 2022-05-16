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
} from "./types";

export const updateCutscene = (cutsceneData) => (dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE,
    payload: cutsceneData,
  });
};

export const addCutsceneRow = () => (dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_ROW,
  });
};

export const addCutsceneRowAtPosition = (position) => (dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_ROW_AT_POS,
    payload: { position },
  });
};

export const deleteCutsceneRow = (rowOffset) => (dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_ROW,
    payload: rowOffset,
  });
};

export const addCutsceneEvent =
  (rowOffset, cutsceneEventData) => (dispatch) => {
    dispatch({
      type: ADD_CUTSCENE_EVENT,
      payload: {
        rowOffset,
        cutsceneEventData,
      },
    });
  };

export const deleteCutsceneEvent = (rowOffset, eventOffset) => (dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_EVENT,
    payload: {
      rowOffset,
      eventOffset,
    },
  });
};

export const editCutsceneEvent =
  (rowOffset, eventOffset, data) => (dispatch) => {
    dispatch({
      type: EDIT_CUTSCENE_EVENT,
      payload: {
        rowOffset,
        eventOffset,
        data,
      },
    });
  };

export const updateCutsceneFileName = (newFileName) => (dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE_FILE_NAME,
    payload: {
      newFileName,
    },
  });
};

export const updateCutsceneHideBars = (hideBars) => (dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE_HIDE_BARS,
    payload: {
      hideBars,
    },
  });
};

export const addCutsceneJump = (jumpName, cutsceneFile) => (dispatch) => {
  dispatch({
    type: ADD_CUTSCENE_JUMP,
    payload: {
      jumpName,
      cutsceneFile,
    },
  });
};

export const deleteCutsceneJump = (jumpName) => (dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_JUMP,
    payload: {
      jumpName,
    },
  });
};
