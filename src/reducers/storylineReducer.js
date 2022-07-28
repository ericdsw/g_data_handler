/* eslint-disable import/no-anonymous-default-export */
import { v4 as uuidv4 } from 'uuid';

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
  UPDATE_INTERACTION,
  DELETE_STEP,
  DELETE_MAP_ENTITY,
  DELETE_MAP_ENTITY_PARAM,
  DELETE_NPC_INTERACTION,
  DELETE_CONDITION,
  DELETE_BUNDLE,
  CLEAR_STORYLINE,
  DUPLICATE_CONFIGURATIONS,
} from '../actions/types';

const initialState = {
  currentStoryline: '',
  storylines: {},
  storylineSteps: {},
  completionBundles: {},
  stepMaps: {},
  stepMapEntities: {},
  completeConditions: {},
  entityConfigurators: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    case UPDATE_INTERACTION:
      return updateInteraction(state, action);

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

    case DUPLICATE_CONFIGURATIONS:
      return duplicateConfigurations(state, action);

    default:
      return state;
  }
}

// ADDS

function addStorylineStep(state, action) {
  const { storylineId, stepName } = action.payload;
  const id = uuidv4();

  const steps = { ...state.storylineSteps };
  const storylines = { ...state.storylines };

  const newStep = {
    id: id,
    name: stepName,
    configuration: [],
    completion: [],
  };
  steps[id] = newStep;

  const curStoryline = state.storylines[storylineId];
  curStoryline.steps.push(id);
  storylines[storylineId] = { ...curStoryline };

  return {
    ...state,
    storylines,
    storylineSteps: steps,
  };
}

function addEntityToNewMap(state, action) {
  const { stepId, mapName, entityData } = action.payload;

  const steps = { ...state.storylineSteps };

  let foundMap;
  for (let i = 0; i < steps[stepId].configuration.length; i++) {
    const curMapId = steps[stepId].configuration[i];
    const currentMap = state.stepMaps[curMapId];
    if (currentMap.map_name === mapName) {
      foundMap = currentMap;
      break;
    }
  }

  const entityId = uuidv4();
  const entity = Object.assign(
    {
      id: entityId,
      configurator_data: [],
    },
    entityData
  );

  let mapId;
  let map;

  if (!foundMap) {
    mapId = uuidv4();
    map = {
      id: mapId,
      map_name: mapName,
      entity_nodes: [entityId],
    };
  } else {
    mapId = foundMap.id;
    map = foundMap;
    map.entity_nodes.push(entityId);
  }

  const maps = { ...state.stepMaps };
  maps[mapId] = map;

  const mapEntities = { ...state.stepMapEntities };
  mapEntities[entityId] = entity;

  if (!steps[stepId].configuration.includes(mapId)) {
    steps[stepId].configuration.push(mapId);
  }

  return {
    ...state,
    stepMaps: maps,
    stepMapEntities: mapEntities,
    storylineSteps: steps,
  };
}

function addStepCompletionBundle(state, action) {
  const { stepId, data } = action.payload;
  const bundleId = uuidv4();

  const newBundle = {
    id: bundleId,
    next_step: data.next_step,
    use_fade: data.use_fade ? data.use_fade : false,
    change_cutscene: data.change_cutscene ? data.change_cutscene : '',
    affected_map: data.affected_map ? data.affected_map : '',
    conditions: [],
  };

  const bundles = { ...state.completionBundles };
  bundles[bundleId] = newBundle;

  const steps = { ...state.storylineSteps };
  steps[stepId].completion.push(bundleId);

  return {
    ...state,
    storylineSteps: steps,
    completionBundles: bundles,
  };
}

function addNPCInteraction(state, action) {
  const { entityId, type, parameters } = action.payload;

  const interactions = { ...state.entityConfigurators };
  const entities = { ...state.stepMapEntities };

  const interactionId = uuidv4();

  const newInteraction = {
    id: interactionId,
    type: type,
    parameters: parameters,
  };

  interactions[interactionId] = newInteraction;
  entities[entityId].configurator_data.push(interactionId);

  return {
    ...state,
    entityConfigurators: interactions,
    stepMapEntities: entities,
  };
}

function addStepCompleteCondition(state, action) {
  const { bundleId, type, name, parameters } = action.payload;
  const conditionId = uuidv4();

  const bundles = { ...state.completionBundles };
  const conditions = { ...state.completeConditions };

  const newCondition = {
    id: conditionId,
    type: type,
    unique_name: name,
    parameters: parameters,
  };
  conditions[conditionId] = newCondition;

  bundles[bundleId].conditions.push(conditionId);

  return {
    ...state,
    completionBundles: bundles,
    completeConditions: conditions,
  };
}

function addEntityToExistingMap(state, action) {
  const { mapId, entityData } = action.payload;
  const entityId = uuidv4();

  const entity = Object.assign(
    { id: entityId, configurator_data: [] },
    entityData
  );
  const entities = { ...state.stepMapEntities };
  entities[entityId] = entity;

  const maps = { ...state.stepMaps };
  maps[mapId].entity_nodes.push(entityId);

  return {
    ...state,
    stepMapEntities: entities,
    stepMaps: maps,
  };
}

// UPDATES

function updateStoryline(state, action) {
  const { currentStoryline, data } = action.payload;
  return { ...state, currentStoryline, ...data };
}

function updateWithEmptyStoryline(state, action) {
  const defaultData = {
    DefaultStoryline: {
      id: 'DefaultStoryline',
      name: 'DefaultStoryline',
      steps: [],
    },
  };
  return {
    currentStoryline: 'DefaultStoryline',
    storylines: defaultData,
    storylineSteps: {},
    completionBundles: {},
    stepMaps: {},
    stepMapEntities: {},
    completeConditions: {},
    entityConfigurators: {},
  };
}

function updateStorylineName(state, action) {
  const { storylineId, name } = action.payload;
  const newStorylines = { ...state.storylines };
  newStorylines[storylineId].name = name;
  return {
    ...state,
    storylines: newStorylines,
  };
}

function updateStorylineStepName(state, action) {
  const { stepId, newName } = action.payload;
  const steps = { ...state.storylineSteps };
  steps[stepId].name = newName;

  return {
    ...state,
    storylineSteps: steps,
  };
}

function updateMapEntityName(state, action) {
  const { entityId, newName } = action.payload;

  const entities = { ...state.stepMapEntities };
  entities[entityId].name = newName;

  return {
    ...state,
    stepMapEntities: entities,
  };
}

function updateOrAddMapEntityParam(state, action) {
  const { entityId, name, value } = action.payload;
  const entities = { ...state.stepMapEntities };

  entities[entityId].parameters[name] = value;

  return {
    ...state,
    stepMapEntities: entities,
  };
}

function updateMapEntity(state, action) {
  const { entityId, newName, params } = action.payload;
  const entities = { ...state.stepMapEntities };

  entities[entityId].name = newName;
  entities[entityId].parameters = params;

  return {
    ...state,
    stepMapEntities: entities,
  };
}

function updateCondition(state, action) {
  const { conditionId, name, parameters } = action.payload;

  const conditions = { ...state.completeConditions };

  conditions[conditionId].unique_name = name;
  conditions[conditionId].parameters = parameters;

  return {
    ...state,
    completeConditions: conditions,
  };
}

function updateBundle(state, action) {
  const { bundleId, data } = action.payload;

  const bundles = { ...state.completionBundles };

  bundles[bundleId].next_step = data.next_step;
  bundles[bundleId].use_fade = data.use_fade;
  bundles[bundleId].change_cutscene = data.change_cutscene;
  bundles[bundleId].affected_map = data.affected_map;

  return {
    ...state,
    completionBundles: bundles,
  };
}

function updateInteraction(state, action) {
  const { entityId, parameters } = action.payload;

  const interactions = { ...state.entityConfigurators };
  interactions[entityId].parameters = parameters;

  return {
    ...state,
    entityConfigurators: interactions,
  };
}

// DELETES

function deleteStorylineStep(state, action) {

  const { stepId } = action.payload;


  const steps = { ...state.storylineSteps };
  delete steps[stepId];

  console.log(steps)

  const storylines = { ...state.storylines };
  deleteReference(storylines, 'steps', stepId);

  return {
    ...state,
    storylines: storylines,
    storylineSteps: steps,
  };
}

function deleteMapEntity(state, action) {
  const { entityId } = action.payload;

  const steps = { ...state.storylineSteps };
  const entities = { ...state.stepMapEntities };
  const maps = { ...state.stepMaps };

  delete entities[entityId];

  deleteReference(maps, 'entity_nodes', entityId);
  for (const mapId in maps) {
    var mapEntityAmount = maps[mapId].entity_nodes.length;
    if (mapEntityAmount <= 0) {
      delete maps[mapId];
      deleteReference(steps, 'configuration', mapId);
    }
  }

  return {
    ...state,
    storylineSteps: steps,
    stepMapEntities: entities,
    stepMaps: maps,
  };
}

function deleteMapEntityParam(state, action) {
  const { entityId, name } = action.payload;
  const entities = { ...state.stepMapEntities };
  delete entities[entityId].parameters[name];

  return {
    ...state,
    stepMapEntities: entities,
  };
}

function deleteNPCInteraction(state, action) {
  const { interactionId } = action.payload;

  const interactions = { ...state.entityConfigurators };
  delete interactions[interactionId];

  const entities = { ...state.stepMapEntities };
  deleteReference(entities, 'configurator_data', interactionId);

  return {
    ...state,
    entityConfigurators: interactions,
    stepMapEntities: entities,
  };
}

function deleteCondition(state, action) {
  const { conditionId } = action.payload;

  const conditions = { ...state.completeConditions };
  const bundles = { ...state.completionBundles };

  delete conditions[conditionId];

  deleteReference(bundles, 'conditions', conditionId);

  return {
    ...state,
    completeConditions: conditions,
    completionBundles: bundles,
  };
}

function deleteBundle(state, action) {
  const { bundleId } = action.payload;

  const bundles = { ...state.completionBundles };
  const steps = { ...state.storylineSteps };

  delete bundles[bundleId];
  deleteReference(steps, 'completion', bundleId);

  return {
    ...state,
    completionBundles: bundles,
    storylineSteps: steps,
  };
}

function clearStoryline(state, action) {
  return initialState;
}

function duplicateConfigurations(state, action) {
  const { sourceStepId, targetStepId } = action.payload;

  const steps = { ...state.storylineSteps };
  const maps = { ...state.stepMaps };
  const entities = { ...state.stepMapEntities };
  const configurators = { ...state.entityConfigurators };

  steps[sourceStepId].configuration.forEach((curMapId) => {
    const curMap = maps[curMapId];

    let duplicateMap;

    // Check if a map with that name already exist
    for (let i = 0; i < steps[targetStepId].configuration.length; i++) {
      const foundMap = maps[steps[targetStepId].configuration[i]];
      if (foundMap.map_name === curMap.map_name) {
        duplicateMap = foundMap;
        break;
      }
    }

    if (!duplicateMap) {
      duplicateMap = { ...curMap };
      duplicateMap.id = uuidv4();
      duplicateMap.entity_nodes = [];

      steps[targetStepId].configuration.push(duplicateMap.id);
      maps[duplicateMap.id] = duplicateMap;
    }

    curMap.entity_nodes.forEach((curEntityNodeId) => {
      const curEntityNode = entities[curEntityNodeId];
      const duplicateEntity = { ...curEntityNode };
      duplicateEntity.id = uuidv4();
      duplicateEntity.configurator_data = [];

      curEntityNode.configurator_data.forEach((curConfId) => {
        const curConf = configurators[curConfId];
        const duplicateConf = { ...curConf };
        duplicateConf.id = uuidv4();

        duplicateEntity.configurator_data.push(duplicateConf.id);
        configurators[duplicateConf.id] = duplicateConf;
      });

      duplicateMap.entity_nodes.push(duplicateEntity.id);
      entities[duplicateEntity.id] = duplicateEntity;
    });
  });

  return {
    ...state,
    storylineSteps: steps,
    stepMaps: maps,
    stepMapEntities: entities,
    entityConfigurators: configurators,
  };
}

// EXTRA

/**
 * Deletes the reference from the provided dictionary
 */
function deleteReference(fromDictionary, referenceName, value) {
  console.log(fromDictionary);
  for (const dictionaryKey in fromDictionary) {
    const curElement = fromDictionary[dictionaryKey];
    if (curElement[referenceName].includes(value)) {
      curElement[referenceName].splice(
        curElement[referenceName].indexOf(value),
        1
      );
    }
  }

}
