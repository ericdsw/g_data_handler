import {
    UPDATE_CUTSCENE,
    ADD_CUTSCENE_ROW,
    DELETE_CUTSCENE_ROW,
    ADD_CUTSCENE_EVENT,
    DELETE_CUTSCENE_EVENT,
    UPDATE_CUTSCENE_FILE_NAME,
    ADD_CUTSCENE_JUMP
} from '../actions/types'

const initialState = {
    currentCutscene: null,
    currentCutsceneJumps: {},
    fileName: ''
}

export default function(state = initialState, action) {

    switch(action.type) {

        case UPDATE_CUTSCENE:
            return updateCutscene(state, action)
            
        case ADD_CUTSCENE_ROW:
            return addCutsceneRow(state, action)

        case DELETE_CUTSCENE_ROW:
            return deleteCutsceneRow(state, action)
            
        case ADD_CUTSCENE_EVENT:
            return addCutsceneEvent(state, action)

        case DELETE_CUTSCENE_EVENT:
            return deleteCutsceneEvent(state, action)

        case UPDATE_CUTSCENE_FILE_NAME:
            return updateCutsceneFileName(state, action)

        case ADD_CUTSCENE_JUMP:
            return addCutsceneJump(state, action)

        default:
            return state
    }
}

function updateCutscene(state, action) {
    return Object.assign({}, state, {
        currentCutscene: action.payload.cutscene,
        currentCutsceneJumps: action.payload.jumps,
        fileName: action.payload.fileName
    })
}

function addCutsceneRow(state, action) {
    return Object.assign({}, state, {
        currentCutscene: [...state.currentCutscene, []]
    })
}

function deleteCutsceneRow(state, action) {
    let rows = state.currentCutscene.slice(0)
    rows.splice(action.payload, 1)
    return Object.assign({}, state, {
        currentCutscene: rows
    })
}

function addCutsceneEvent(state, action) {
    const { rowOffset, cutsceneEventData } = action.payload
    let rows = [...state.currentCutscene]
    rows[rowOffset].push(cutsceneEventData)
    return Object.assign({}, state, {
        currentCutscene: rows,
    })
}

function deleteCutsceneEvent(state, action) {
    const { rowOffset, eventOffset } = action.payload
    let rows = [...state.currentCutscene]
    rows[rowOffset] = [...rows[rowOffset]]
    rows[rowOffset].splice(eventOffset, 1)
    return Object.assign({}, state, {
        currentCutscene: rows,
    })
}

function updateCutsceneFileName(state, action) {
    const { newFileName } = action.payload
    return Object.assign({}, state, {
        fileName: newFileName
    })
}

function addCutsceneJump(state, action) {
    const { jumpName, cutsceneFile } = action.payload
    let newJumps = {...state.currentCutsceneJumps}
    newJumps[jumpName] = cutsceneFile
    return Object.assign({}, state, {
        currentCutsceneJumps: newJumps
    })
}
