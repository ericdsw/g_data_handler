/* eslint-disable import/no-anonymous-default-export */
import { 
  TOGGLE_SIDEBAR,
  COLLAPSE_SIDEBAR,
  TOGGLE_DARK_MODE
} from "../actions/types";

const initialState = {
  drawerOpen: false,
  darkMode: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, drawerOpen: !state.drawerOpen };
    case COLLAPSE_SIDEBAR:
      return { ...state, drawerOpen: false };
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}
