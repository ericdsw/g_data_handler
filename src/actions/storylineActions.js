import {
    UPDATE_STORYLINE,
    UPDATE_WITH_EMPTY_STORYLINE,
    UPDATE_STORYLINE_NAME,

    ADD_STORYLINE_STEP,
    ADD_ENTITY_TO_NEW_MAP,
    ADD_ENTITY_TO_EXISTING_MAP,
    ADD_STEP_COMPLETION_BUNDLE,
    ADD_NPC_INTERACTION,
    ADD_STEP_COMPLETE_CONDITION,

    UPDATE_MAP_ENTITY_NAME,
    UPDATE_OR_ADD_MAP_ENTITY_PARAM,
    UPDATE_MAP_ENTITY,
    UPDATE_CONDITION,
    UPDATE_BUNDLE,
    UPDATE_INTERACTION,

    DELETE_STEP,
    DELETE_MAP_ENTITY,
    DELETE_MAP_ENTITY_PARAM,
    DELETE_NPC_INTERACTION,
    DELETE_CONDITION,
    DELETE_BUNDLE,

    UPDATE_STEP_NAME,
    CLEAR_STORYLINE,
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

export const updateMapEntity = (entityId, newName, params) => dispatch => {
    dispatch({
        type: UPDATE_MAP_ENTITY,
        payload: { entityId, newName, params }
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

export const deleteNPCInteraction = interactionId => dispatch => {
    dispatch({
        type: DELETE_NPC_INTERACTION,
        payload: { interactionId }
    });
}

export const addNPCInteraction = (entityId, type, parameters) => dispatch => {
    dispatch({
        type: ADD_NPC_INTERACTION,
        payload: { entityId, type, parameters }
    });
}

export const updateNPCInteraction = (entityId, parameters) => dispatch => {
    dispatch({
        type: UPDATE_INTERACTION,
        payload: { entityId, parameters } 
    });
}

export const addStepCompleteCondition = (bundleId, type, name, parameters) => dispatch => {
    dispatch({
        type: ADD_STEP_COMPLETE_CONDITION,
        payload: { bundleId, type, name, parameters }
    });
}

export const deleteCondition = conditionId => dispatch => {
    dispatch({
        type: DELETE_CONDITION,
        payload: { conditionId }
    });
}

export const updateCondition = (conditionId, name, parameters) => dispatch => {
    dispatch({
        type: UPDATE_CONDITION,
        payload: { conditionId, name, parameters }
    });
}

export const updateBundle = (bundleId, data) => dispatch => {
    dispatch({
        type: UPDATE_BUNDLE,
        payload: { bundleId, data }
    });
}

export const deleteBundle = bundleId => dispatch => {
    dispatch({
        type: DELETE_BUNDLE,
        payload: { bundleId }
    });
}

export const clearStoryline = () => dispatch => {
    dispatch({
        type: CLEAR_STORYLINE,
        payload: {}
    });
}
