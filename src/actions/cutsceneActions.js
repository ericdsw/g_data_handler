import {
    UPDATE_CUTSCENE,
    ADD_CUTSCENE_ROW,
    DELETE_CUTSCENE_ROW
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
