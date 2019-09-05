import {
    UPDATE_STORYLINE,
    UPDATE_WITH_EMPTY_STORYLINE,
    UPDATE_STORYLINE_NAME,

    ADD_STORYLINE_STEP,
    ADD_STEP_MAP_ELEMENT_CONFIG,
    ADD_STEP_COMPLETION_BUNDLE,
    ADD_COMPLETION_BUNDLE_CONDITION,
    UPDATE_STEP_NAME,
    UPDATE_STEP_MAP_ELEMENT_CONFIG,
    UPDATE_STEP_COMPLETION_BUNDLE,
    UPDATE_COMPLETION_BUNDLE_COND,
    DELETE_STEP,
    DELETE_STEP_MAP_ELEMENT_CONFIG,
    DELETE_STEP_COMPLETION_BUNDLE,
    DELETE_COMPLETION_BUNDLE_COND
} from './types';

export const updateStoryline = (currentStoryline, data) => dispatch => {
    dispatch({
        type: UPDATE_STORYLINE,
        payload: {
            currentStoryline, data
        }
    });
}

export const updateWithEmptyStoryline = () => dispatch => {
    dispatch({
        type: UPDATE_WITH_EMPTY_STORYLINE,
        payload: {}
    });
}

export const updateStorylineName = (storylineId, name) => dispatch => {
    dispatch({
        type: UPDATE_STORYLINE_NAME,
        payload: {
            storylineId, name
        }
    });
}

export const addStorylineStep = stepName => dispatch => {
    dispatch({
        type: ADD_STORYLINE_STEP,
        payload: { stepName }
    });
}

export const addStepMapElementConfig = (stepName, mapName, elementName, data) => dispatch => {
    dispatch({
        type: ADD_STEP_MAP_ELEMENT_CONFIG,
        payload: { stepName, mapName, elementName, data }
    });
}

export const addStepCompletionBundle = (stepName, data) => dispatch => {
    dispatch({
        type: ADD_STEP_COMPLETION_BUNDLE,
        payload: { stepName, data }
    });
}

export const addCompletionBundleCondition = (stepName, bundleOffset, data) => dispatch => {
    dispatch({
        type: ADD_COMPLETION_BUNDLE_CONDITION,
        payload: { stepName, bundleOffset, data }
    });
}

export const updateStepName = (oldName, newName) => dispatch => {
    dispatch({
        type: UPDATE_STEP_NAME,
        payload: { oldName, newName }
    });
}

export const updateStepMapElementConfig = (stepName, mapName, elementName, data) => dispatch => {
    dispatch({
        type: UPDATE_STEP_MAP_ELEMENT_CONFIG,
        payload: {
            stepName, mapName, elementName, data
        }
    });
}

export const updateStepCompletionBundle = (stepName, bundleOffset, data) => dispatch => {
    dispatch({
        type: UPDATE_STEP_COMPLETION_BUNDLE,
        payload: {
            stepName, bundleOffset, data
        }
    });
}

export const updateCompletionBundleCond = (stepName, bundleOffset, conditionOffset, data) => dispatch => {
    dispatch({
        type: UPDATE_COMPLETION_BUNDLE_COND,
        payload: {
            stepName, bundleOffset, conditionOffset, data
        }
    });
}

export const deleteStep = stepName => dispatch => {
    dispatch({
        type: DELETE_STEP,
        payload: { stepName }
    });
}

export const deleteStepMapElementConfig = (stepName, mapName, elementName) => dispatch => {
    dispatch({
        type: DELETE_STEP_MAP_ELEMENT_CONFIG,
        payload: {
            stepName, mapName, elementName
        }
    });
}

export const deleteStepCompletionBundle = (stepName, bundleOffset) => dispatch => {
    dispatch({
        type: DELETE_STEP_COMPLETION_BUNDLE,
        payload: {
            stepName, bundleOffset
        }
    });
}

export const deleteCompletionBundleCond = (stepName, bundleOffset, conditionOffset) => dispatch => {
    dispatch({
        type: DELETE_COMPLETION_BUNDLE_COND,
        payload: {
            stepName, bundleOffset, conditionOffset
        }
    });
}
