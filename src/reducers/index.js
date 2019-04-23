import { combineReducers } from 'redux'
import cutsceneReducer from './cutsceneReducer'

export default combineReducers({
    cutscene: cutsceneReducer
})
