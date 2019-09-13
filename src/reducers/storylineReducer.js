import uuidv4 from 'uuid/v4';

import {
    ADD_STORYLINE_STEP,
    ADD_STEP_COMPLETION_BUNDLE,
    ADD_ENTITY_TO_NEW_MAP,
    ADD_ENTITY_TO_EXISTING_MAP,
    ADD_NPC_INTERACTION,
    ADD_STEP_COMPLETE_CONDITION,

    UPDATE_STORYLINE,
    UPDATE_WITH_EMPTY_STORYLINE,
    UPDATE_STORYLINE_NAME,
    UPDATE_STEP_NAME,
    UPDATE_MAP_ENTITY_NAME,
    UPDATE_OR_ADD_MAP_ENTITY_PARAM,
    UPDATE_MAP_ENTITY,
    UPDATE_CONDITION,
    UPDATE_BUNDLE,
    
    DELETE_STEP,
    DELETE_MAP_ENTITY,
    DELETE_MAP_ENTITY_PARAM,
    DELETE_NPC_INTERACTION,
    DELETE_CONDITION,
    DELETE_BUNDLE,
    CLEAR_STORYLINE,
} from '../actions/types';

const initialState = {
    currentStoryline: '',
    storylines: {},
    storylineSteps: {},
    completionBundles: {},
    stepMaps: {},
    stepMapEntities: {},
    completeConditions: {},
    entityConfigurators: {}
}

export default function(state = initialState, action) {

    switch(action.type) {

        case ADD_STORYLINE_STEP:
            return addStorylineStep(state, action);
        case ADD_ENTITY_TO_NEW_MAP:
            return addEntityToNewMap(state, action);
        case ADD_ENTITY_TO_EXISTING_MAP:
            return addEntityToExistingMap(state, action);
        case ADD_STEP_COMPLETION_BUNDLE:
            return addStepCompletionBundle(state, action);
        case ADD_NPC_INTERACTION:
            return addNPCInteraction(state, action);
        case ADD_STEP_COMPLETE_CONDITION:
            return addStepCompleteCondition(state, action);

        case UPDATE_STORYLINE:
            return updateStoryline(state, action);
        case UPDATE_WITH_EMPTY_STORYLINE:
            return updateWithEmptyStoryline(state, action);
        case UPDATE_STORYLINE_NAME:
            return updateStorylineName(state, action);
        case UPDATE_STEP_NAME:
            return updateStorylineStepName(state, action);
        case UPDATE_MAP_ENTITY_NAME:
            return updateMapEntityName(state, action);
        case UPDATE_CONDITION:
            return updateCondition(state, action);
        case UPDATE_OR_ADD_MAP_ENTITY_PARAM:
            return updateOrAddMapEntityParam(state, action);
        case UPDATE_MAP_ENTITY:
            return updateMapEntity(state, action);
        case UPDATE_BUNDLE:
            return updateBundle(state, action);

        case DELETE_MAP_ENTITY_PARAM:
            return deleteMapEntityParam(state, action);
        case DELETE_NPC_INTERACTION:
            return deleteNPCInteraction(state, action);
        case DELETE_STEP:
            return deleteStorylineStep(state, action);
        case DELETE_MAP_ENTITY:
            return deleteMapEntity(state, action);
        case DELETE_CONDITION:
            return deleteCondition(state, action);
        case DELETE_BUNDLE:
            return deleteBundle(state, action);
        case CLEAR_STORYLINE:
            return clearStoryline(state, action);
        default:
            return state;
    }
}

// ADDS

function addStorylineStep(state, action) {

    const { storylineId, stepName } = action.payload;
    const id = uuidv4();

    const steps = {...state.storylineSteps};
    const storylines = {...state.storylines};

    const newStep = {
        id: id,
        name: stepName,
        configuration: [],
        completion: []
    };
    steps[id] = newStep;

    const curStoryline = state.storylines[storylineId];
    curStoryline.steps.push(id);
    storylines[storylineId] = curStoryline;

    return Object.assign({}, state, {
        storylineSteps: steps,
        storylines: storylines
    });
}

function addEntityToNewMap(state, action) {

    const { stepId, mapName, entityData } = action.payload;

    let foundMap
    for (const curMapId in state.stepMaps) {
        if (state.stepMaps.hasOwnProperty(curMapId)) {
            const currentMap = state.stepMaps[curMapId];
            if (currentMap.map_name === mapName) {
                foundMap = currentMap;
                break;
            }
        }
    }

    const entityId = uuidv4();
    const entity = Object.assign({
        id: entityId, configurator_data: []
    }, entityData);

    let mapId;
    let map;

    if (!foundMap) {
        mapId = uuidv4();
        map = {
            id: mapId,
            map_name: mapName,
            entity_nodes: [entityId]
        }
    } else {
        mapId = foundMap.id;
        map = foundMap;
        map.entity_nodes.push(entityId);
    }

    const maps = {...state.stepMaps};
    maps[mapId] = map;

    const mapEntities = {...state.stepMapEntities};
    mapEntities[entityId] = entity;

    const steps = {...state.storylineSteps};
    if (!steps[stepId].configuration.includes(mapId)) {
        steps[stepId].configuration.push(mapId);
    }

    return Object.assign({}, state, {
        stepMaps: maps,
        stepMapEntities: mapEntities,
        storylineSteps: steps
    });
}

function addStepCompletionBundle(state, action) {

    const { stepId, data } = action.payload;
    const bundleId = uuidv4();

    const newBundle = {
        id: bundleId,
        next_step: data.next_step,
        use_fade: (data.use_fade) ? data.use_fade : false,
        change_cutscene: (data.change_cutscene) ? data.change_cutscene : '',
        affected_map: (data.affected_map) ? data.affected_map : '',
        conditions: []
    };

    const bundles = {...state.completionBundles};
    bundles[bundleId] = newBundle;

    const steps = {...state.storylineSteps};
    steps[stepId].completion.push(bundleId);

    return Object.assign({}, state, {
        storylineSteps: steps,
        completionBundles: bundles
    });
}

function addNPCInteraction(state, action) {

    const { entityId, type, parameters } = action.payload;

    const interactions = {...state.entityConfigurators};
    const entities = {...state.stepMapEntities};

    const interactionId = uuidv4();

    const newInteraction = {
        id: interactionId,
        type: type,
        parameters: parameters
    }

    interactions[interactionId] = newInteraction;
    entities[entityId].configurator_data.push(interactionId);

    return Object.assign({}, state, {
        entityConfigurators: interactions,
        stepMapEntities: entities
    });
}

function addStepCompleteCondition(state, action) {

    const { bundleId, type, name, parameters } = action.payload;
    const conditionId = uuidv4();

    const bundles = {...state.completionBundles};
    const conditions = {...state.completeConditions};

    const newCondition = {
        id: conditionId,
        type: type,
        unique_name: name,
        parameters: parameters
    }
    conditions[conditionId] = newCondition;

    bundles[bundleId].conditions.push(conditionId);

    return Object.assign({}, state, {
        completionBundles: bundles,
        completeConditions: conditions
    });
}

function addEntityToExistingMap(state, action) {

    const { mapId, entityData } = action.payload;
    const entityId = uuidv4();

    const entity = Object.assign(
        {id: entityId, configurator_data: []}, entityData
    );
    const entities = {...state.stepMapEntities};
    entities[entityId] = entity;

    const maps = {...state.stepMaps};
    maps[mapId].entity_nodes.push(entityId);

    return Object.assign({}, state, {
        stepMapEntities: entities,
        stepMaps: maps
    });
}

// UPDATES

function updateStoryline(state, action) {
    const { currentStoryline, data } = action.payload;
    return Object.assign({}, {currentStoryline}, data);
}

function updateWithEmptyStoryline(state, action) {

    const defaultData = {
        'DefaultStoryline': {
            id: 'DefaultStoryline',
            name: 'DefaultStoryline',
            steps: []
        }
    }
    return {
        currentStoryline: 'DefaultStoryline',
        storylines: defaultData,
        storylineSteps: {},
        completionBundles: {},
        stepMaps: {},
        stepMapEntities: {},
        completeConditions: {},
        entityConfigurators: {}
    }
}

function updateStorylineName(state, action) {
    const { storylineId, name } = action.payload;
    const newStorylines = {...state.storylines};
    newStorylines[storylineId].name = name;
    return Object.assign({}, state, {
        storylines: newStorylines
    });
}

function updateStorylineStepName(state, action) {
    const { stepId, newName } = action.payload;
    const steps = {...state.storylineSteps};
    steps[stepId].name = newName;
    return Object.assign({}, state, {
        storylineSteps: steps
    });
}

function updateMapEntityName(state, action) {

    const { entityId, newName } = action.payload;

    const entities = {...state.stepMapEntities};
    entities[entityId].name = newName;

    return Object.assign({}, state, {
        stepMapEntities: entities
    });
}

function updateOrAddMapEntityParam(state, action) {

    const { entityId, name, value } = action.payload;
    const entities = {...state.stepMapEntities};

    entities[entityId].parameters[name] = value;

    return Object.assign({}, state, {
        stepMapEntities: entities
    });
}

function updateMapEntity(state, action) {

    const { entityId, newName, params } = action.payload;
    const entities = {...state.stepMapEntities};

    entities[entityId].name = newName;
    entities[entityId].parameters = params;

    return Object.assign({}, state, {
        stepMapEntities: entities
    });
}

function updateCondition(state, action) {

    const { conditionId, name, parameters } = action.payload;

    const conditions = {...state.completeConditions};

    conditions[conditionId].unique_name = name;
    conditions[conditionId].parameters = parameters;

    return Object.assign({}, state, {
        completeConditions: conditions
    });
}

function updateBundle(state, action) {

    const { bundleId, data } = action.payload;

    const bundles = {...state.completionBundles};

    bundles[bundleId].next_step = data.next_step;
    bundles[bundleId].use_fade = data.use_fade;
    bundles[bundleId].change_cutscene = data.change_cutscene;
    bundles[bundleId].affected_map = data.affected_map;

    return Object.assign({}, state, {
        completionBundles: bundles
    });
}

// DELETES

function deleteStorylineStep(state, action) {

    const { stepId } = action.payload;

    const steps = {...state.storylineSteps};
    delete steps[stepId];

    const storylines = {...state.storylines}
    deleteReference(storylines, 'steps', stepId);

    return Object.assign({}, state, {
        storylines: storylines,
        storylineSteps: steps
    });
}

function deleteMapEntity(state, action) {

    const { entityId } = action.payload;

    const entities = {...state.stepMapEntities};
    const maps = {...state.stepMaps};

    delete entities[entityId];
    
    deleteReference(maps, 'entity_nodes', entityId);

    return Object.assign({}, state, {
        stepMapEntities: entities,
        stepMaps: maps
    });
}

function deleteMapEntityParam(state, action) {

    const { entityId, name } = action.payload;
    const entities = {...state.stepMapEntities};
    delete entities[entityId].parameters[name];

    return Object.assign({}, state, {
        stepMapEntities: entities
    });
}

function deleteNPCInteraction(state, action) {

    const { interactionId } = action.payload;

    const interactions = {...state.entityConfigurators};
    delete interactions[interactionId];

    const entities = {...state.stepMapEntities};
    deleteReference(entities, 'configurator_data', interactionId);

    return Object.assign({}, state, {
        entityConfigurators: interactions,
        stepMapEntities: entities
    });
}

function deleteCondition(state, action) {

    const { conditionId } = action.payload;

    const conditions = {...state.completeConditions};
    const bundles = {...state.completionBundles};

    delete conditions[conditionId];

    deleteReference(bundles, 'conditions', conditionId);

    return Object.assign({}, state, {
        completeConditions: conditions,
        completionBundles: bundles
    });
}

function deleteBundle(state, action) {

    const { bundleId } = action.payload;

    const bundles = {...state.completionBundles};
    const steps = {...state.storylineSteps};

    delete bundles[bundleId];
    deleteReference(steps, 'completion', bundleId);

    return Object.assign({}, state, {
        completionBundles: bundles,
        storylineSteps: steps
    });
}

function clearStoryline(state, action) {
    return initialState;
}

// EXTRA

/**
 * Deletes the reference from the provided dictionary
 */
function deleteReference(fromDictionary, referenceName, value) {
    for (const dictionaryKey in fromDictionary) {
        const curElement = fromDictionary[dictionaryKey];
        if (curElement[referenceName].includes(value)) {
            curElement[referenceName].splice(
                curElement[referenceName].indexOf(value), 1
            )
        }
    }
}

function deleteElementWithChildren(elementId, list, state) {
    const curList = list[elementId];
    for (const listKey in curList) {
        if (curList.hasOwnProperty(listKey)) {
            const curListVal = curList[listKey];
            if (Array.isArray(curListVal)) {
                const newSourceList = getListForProperty(listKey, state);
                if (!newSourceList) {

                } else {
                    for (let i = 0; i < curListVal.length; i++) {
                        deleteElementWithChildren(
                            curListVal[i], newSourceList, state
                        );
                    }
                }
            }
        }
    }
}

function getListForProperty(propertyName, state) {
    switch (propertyName) {
        case 'configurator_data':
            return state.entityConfigurators;
        case 'entity_nodes':
            return state.stepMapEntities;
        case 'conditions':
            return state.completeConditions;
        case 'configuration':
            return state.stepMaps;
        case 'completion':
            return state.completionBundles;
        case 'steps':
            return state.storylineSteps;
        default:
            return null;
    }
}
