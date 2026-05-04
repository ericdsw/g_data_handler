import { TOGGLE_SIDEBAR, COLLAPSE_SIDEBAR, TOGGLE_DARK_MODE } from './types';
import { Dispatch } from '@reduxjs/toolkit';

export const toggleDrawer = () => (dispatch: Dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

export const collapseDrawer = () => (dispatch: Dispatch) => {
  dispatch({
    type: COLLAPSE_SIDEBAR,
  });
};

export const toggleDarkMode = () => (dispatch: Dispatch) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  });
};
