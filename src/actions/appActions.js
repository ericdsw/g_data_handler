import { TOGGLE_SIDEBAR, COLLAPSE_SIDEBAR, TOGGLE_DARK_MODE } from './types';

export const toggleDrawer = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

export const collapseDrawer = () => (dispatch) => {
  dispatch({
    type: COLLAPSE_SIDEBAR,
  });
};

export const toggleDarkMode = () => (dispatch) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  });
};
