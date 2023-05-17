import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
  COLLAPSE_SIDEBAR,
  TOGGLE_DARK_MODE,
} from '../actions/types';

const initialState = {
  drawerOpen: false,
  darkMode: true,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(TOGGLE_SIDEBAR, (state) => {
      state.drawerOpen = !state.drawerOpen;
    })
    .addCase(COLLAPSE_SIDEBAR, (state) => {
      state.drawerOpen = false;
    })
    .addCase(TOGGLE_DARK_MODE, (state) => {
      state.darkMode = !state.darkMode;
    });
});

export default appReducer;
