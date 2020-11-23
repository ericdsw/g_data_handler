/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_SIDEBAR, COLLAPSE_SIDEBAR } from "../actions/types";

const initialState = {
  drawerOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, drawerOpen: !state.drawerOpen };
    case COLLAPSE_SIDEBAR:
      return { ...state, drawerOpen: false };
    default:
      return state;
  }
}
