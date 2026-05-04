import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppSliceState = {
  drawerOpen: boolean,
  darkMode: boolean,
}

const initialState: AppSliceState = {
  drawerOpen: false,
  darkMode: true
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { toggleDarkMode, toggleSidebar } = appSlice.actions;

export default appSlice.reducer;