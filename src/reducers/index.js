import { combineReducers } from 'redux';
import cutsceneReducer from './cutsceneReducer';
import appReducer from './appReducer';

export default combineReducers({
    cutscene: cutsceneReducer,
    app: appReducer
});
