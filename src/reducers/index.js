import { combineReducers } from 'redux';
import cutsceneReducer from './cutsceneReducer';
import dialogueReducer from './dialogueReducer';
import appReducer from './appReducer';

export default combineReducers({
    cutscene: cutsceneReducer,
    dialogue: dialogueReducer,
    app: appReducer
});
