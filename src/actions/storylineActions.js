import {
    UPDATE_STORYLINE,
    UPDATE_WITH_EMPTY_STORYLINE,
    UPDATE_STORYLINE_NAME,

    ADD_STORYLINE_STEP,
    ADD_ENTITY_TO_NEW_MAP,
    ADD_ENTITY_TO_EXISTING_MAP,
    ADD_STEP_COMPLETION_BUNDLE,

    UPDATE_MAP_ENTITY_NAME,
    UPDATE_OR_ADD_MAP_ENTITY_PARAM,

    DELETE_STEP,
    DELETE_MAP_ENTITY,
    DELETE_MAP_ENTITY_PARAM,

    ADD_COMPLETION_BUNDLE_CONDITION,
    UPDATE_STEP_NAME,
    UPDATE_STEP_COMPLETION_BUNDLE,
    UPDATE_COMPLETION_BUNDLE_COND,
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

export const addStorylineStep = (storylineId, stepName) => dispatch => {
    dispatch({
        type: ADD_STORYLINE_STEP,
        payload: { storylineId, stepName }
    });
}

export const addEntityToNewMap = (stepId, mapName, entityData) => dispatch => {
    dispatch({
        type: ADD_ENTITY_TO_NEW_MAP,
        payload: {
            stepId, mapName, entityData
        }
    });
}

export const addEntityToExistingMap = (mapId, entityData) => dispatch => {
    dispatch({
        type: ADD_ENTITY_TO_EXISTING_MAP,
        payload: { mapId, entityData }
    });
}

export const addStepCompletionBundle = (stepId, data) => dispatch => {
    dispatch({
        type: ADD_STEP_COMPLETION_BUNDLE,
        payload: { stepId, data }
    });
}

export const updateStepName = (stepId, newName) => dispatch => {
    dispatch({
        type: UPDATE_STEP_NAME,
        payload: { stepId, newName }
    });
}

export const deleteStep = stepId => dispatch => {
    dispatch({
        type: DELETE_STEP,
        payload: { stepId }
    });
}

export const updateMapEntityName = (entityId, newName) => dispatch => {
    dispatch({
        type: UPDATE_MAP_ENTITY_NAME,
        payload: { entityId, newName }
    });
}

export const deleteMapEntity = entityId => dispatch => {
    dispatch({
        type: DELETE_MAP_ENTITY,
        payload: { entityId }
    });
}

export const updateOrAddMapEntityParam = (entityId, name, value) => dispatch => {
    dispatch({
        type: UPDATE_OR_ADD_MAP_ENTITY_PARAM,
        payload: { entityId, name, value }
    });
}

export const deleteMapEntityParam = (entityId, name) => dispatch => {
    dispatch({
        type: DELETE_MAP_ENTITY_PARAM,
        payload: { entityId, name }
    });
}




export const addCompletionBundleCondition = (stepName, bundleOffset, data) => dispatch => {
    dispatch({
        type: ADD_COMPLETION_BUNDLE_CONDITION,
        payload: { stepName, bundleOffset, data }
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
