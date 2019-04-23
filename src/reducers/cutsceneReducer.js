import {
    UPDATE_CUTSCENE,
    ADD_CUTSCENE_ROW,
    DELETE_CUTSCENE_ROW
} from '../actions/types'

const initialState = {
    currentCutscene: null,
    currentCutsceneJumps: [],
    fileName: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_CUTSCENE:
            return {
                currentCutscene: action.payload.cutscene,
                currentCutsceneJumps: action.payload.jumps,
                fileName: action.payload.fileName
            }
        case ADD_CUTSCENE_ROW:
            return {
                currentCutscene: [...state.currentCutscene, []],
                currentCutsceneJumps: state.currentCutsceneJumps,
                fileName: state.fileName
            }
        case DELETE_CUTSCENE_ROW:
            let rows = state.currentCutscene.slice(0)
            rows.splice(action.payload, 1)
            return {
                currentCutscene: rows,
                currentCutsceneJumps: state.currentCutsceneJumps,
                fileName: state.fileName
            }
        default:
            return state
    }
}
