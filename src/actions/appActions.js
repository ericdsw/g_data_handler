import {
    TOGGLE_SIDEBAR,
    COLLAPSE_SIDEBAR
} from './types'

export const toggleDrawer = () => dispatch => {
    dispatch({
        type: TOGGLE_SIDEBAR,
    })
}

export const collapseDrawer = () => dispatch => {
    dispatch({
        type: COLLAPSE_SIDEBAR
    })
}
