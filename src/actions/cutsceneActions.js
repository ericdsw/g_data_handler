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
  MOVE_CUTSCENE_EVENT
} from './types';

export const moveCutsceneEvent = (sourcePosition, destinationPosition, sourceRowId, destinationRowId, eventId) => dispatch => {
  dispatch({
    type: MOVE_CUTSCENE_EVENT,
    payload: {
      sourcePosition,
      destinationPosition,
      sourceRowId,
      destinationRowId,
      eventId
    }
  })
}

export const reorderCutsceneEvent = (sourcePosition, destinationPosition, rowId, eventId) => dispatch => {
  dispatch({
    type: REORDER_CUTSCENE_EVENT,
    payload: { sourcePosition, destinationPosition, rowId, eventId }
  })
}

export const reorderCutsceneRows = (sourcePosition, destinationPosition, rowId) => dispatch => {
  dispatch({
    type: REORDER_CUTSCENE_ROWS,
    payload: { sourcePosition, destinationPosition, rowId }
  })
}

export const addPreLoadedCutscenes = preLoadedCutsceneNames => dispatch => {
  dispatch({
    type: ADD_PRE_LOADED_CUTSCENE_NAMES,
    payload: { preLoadedCutsceneNames }
  })
}

export const deletePreLoadedCutscenes = () => dispatch => {
  dispatch({
    type: DELETE_PRELOADED_CUTSCENE_NAMES,
    payload: {}
  })
}

// Cutscenes

export const updateCutscene = (cutsceneData) => (dispatch) => {
  dispatch({
    type: UPDATE_CUTSCENE,
    payload: cutsceneData,
  });
};

export const updateWithEmptyCutscene = () => dispatch => {
  dispatch({
    type: UPDATE_WITH_EMPTY_CUTSCENE,
    payload: {}
  })
}

export const deleteCutscene = () => dispatch => {
  dispatch({
    type: DELETE_CUTSCENE,
    payload: {}
  })
}

// Cutscene Rows

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

export const deleteCutsceneRow = (rowId) => (dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_ROW,
    payload: { rowId },
  });
};

// Cutscene Event

export const addCutsceneEvent =
  (rowId, cutsceneEventData) => (dispatch) => {
    dispatch({
      type: ADD_CUTSCENE_EVENT,
      payload: {
        rowId,
        cutsceneEventData,
      },
    });
  };

export const deleteCutsceneEvent = (eventId) => (dispatch) => {
  dispatch({
    type: DELETE_CUTSCENE_EVENT,
    payload: {
      eventId
    },
  });
};

export const editCutsceneEvent =
  (eventId, data) => (dispatch) => {
    dispatch({
      type: EDIT_CUTSCENE_EVENT,
      payload: {
        eventId,
        data,
      },
    });
  };

// Extra

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
