import { combineReducers } from "redux";
import cutsceneReducer from "./cutsceneReducer";
import dialogueReducer from "./dialogueReducer";
import storylineReducer from "./storylineReducer";
import appReducer from "./appReducer";

export default combineReducers({
  cutscene: cutsceneReducer,
  dialogue: dialogueReducer,
  storyline: storylineReducer,
  app: appReducer,
});
