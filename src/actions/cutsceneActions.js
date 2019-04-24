import {
    UPDATE_CUTSCENE,
    ADD_CUTSCENE_ROW,
    DELETE_CUTSCENE_ROW,
    ADD_CUTSCENE_EVENT,
    DELETE_CUTSCENE_EVENT,
    UPDATE_CUTSCENE_FILE_NAME,
} from './types'

export const updateCutscene = cutsceneData => dispatch => {
    dispatch({
        type: UPDATE_CUTSCENE,
        payload: cutsceneData
    })
}

export const addCutsceneRow = () => dispatch => {
    dispatch({
        type: ADD_CUTSCENE_ROW
    })
}

export const deleteCutsceneRow = rowOffset => dispatch => {
    dispatch({
        type: DELETE_CUTSCENE_ROW,
        payload: rowOffset
    })
}

export const addCutsceneEvent = (rowOffset, cutsceneEventData) => dispatch => {
    dispatch({
        type: ADD_CUTSCENE_EVENT,
        payload: {
            rowOffset,
            cutsceneEventData
        }
    })
}

export const deleteCutsceneEvent = (rowOffset, eventOffset) => dispatch => {
    dispatch({
        type: DELETE_CUTSCENE_EVENT,
        payload: {
            rowOffset,
            eventOffset
        }
    })
}

export const updateCutsceneFileName = newFileName => dispatch => {
    dispatch(
        {
            type: UPDATE_CUTSCENE_FILE_NAME,
            payload: {
                newFileName
            }
        }
    )
}
