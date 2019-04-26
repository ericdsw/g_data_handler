import {
    TOGGLE_SIDEBAR
} from './types'

export const toggleDrawer = () => dispatch => {
    dispatch({
        type: TOGGLE_SIDEBAR,
    })
}
