import {
    TOGGLE_SIDEBAR,
    COLLAPSE_SIDEBAR
} from '../actions/types'

const initialState = {
    drawerOpen: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {
                drawerOpen: !state.drawerOpen
            })
        case COLLAPSE_SIDEBAR:
            return Object.assign({}, state, {
                drawerOpen: false
            })
        default:
            return state
    }
}
