import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { deleteReference } from './reducerActions';

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
  UPDATE_STORYLINE_APPLIES_TO_END_RUN,
  UPDATE_APPLIED_RUNS_STRING,
  RE_ORDER_STEP,
  DUPLICATE_ENTITY_IN_MAPS,
  UPDATE_MAP_NAME,
} from '../actions/types';

const initialState = {
  currentStoryline: '',
  appliesToEndRun: false,
  appliedRunsString: '',
  storylines: {},
  storylineSteps: {},
  completionBundles: {},
  stepMaps: {},
  stepMapEntities: {},
  completeConditions: {},
  entityConfigurators: {},
};

const storylineReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_STORYLINE_STEP, addStorylineStep)
    .addCase(ADD_ENTITY_TO_NEW_MAP, addEntityToNewMap)
    .addCase(ADD_ENTITY_TO_EXISTING_MAP, addEntityToExistingMap)
    .addCase(ADD_STEP_COMPLETION_BUNDLE, addStepCompletionBundle)
    .addCase(ADD_NPC_INTERACTION, addNPCInteraction)
    .addCase(ADD_STEP_COMPLETE_CONDITION, addStepCompleteCondition)

    .addCase(UPDATE_STORYLINE, updateStoryline)
    .addCase(UPDATE_WITH_EMPTY_STORYLINE, updateWithEmptyStoryline)
    .addCase(UPDATE_STORYLINE_NAME, updateStorylineName)
    .addCase(UPDATE_STEP_NAME, updateStorylineStepName)
    .addCase(UPDATE_MAP_ENTITY_NAME, updateMapEntityName)
    .addCase(UPDATE_CONDITION, updateCondition)
    .addCase(UPDATE_OR_ADD_MAP_ENTITY_PARAM, updateOrAddMapEntityParam)
    .addCase(UPDATE_MAP_ENTITY, updateMapEntity)
    .addCase(UPDATE_BUNDLE, updateBundle)
    .addCase(UPDATE_INTERACTION, updateInteraction)
    .addCase(UPDATE_MAP_NAME, updateMapName)

    .addCase(DELETE_MAP_ENTITY_PARAM, deleteMapEntityParam)
    .addCase(DELETE_NPC_INTERACTION, deleteNPCInteraction)
    .addCase(DELETE_STEP, deleteStorylineStep)
    .addCase(DELETE_MAP_ENTITY, deleteMapEntity)
    .addCase(DELETE_CONDITION, deleteCondition)
    .addCase(DELETE_BUNDLE, deleteBundle)
    .addCase(CLEAR_STORYLINE, clearStoryline)

    .addCase(DUPLICATE_CONFIGURATIONS, duplicateConfigurations)
    .addCase(UPDATE_STORYLINE_APPLIES_TO_END_RUN, updateAppliesToEndRun)
    .addCase(UPDATE_APPLIED_RUNS_STRING, updateAppliedRuns)
    .addCase(RE_ORDER_STEP, reorderStep)
    .addCase(DUPLICATE_ENTITY_IN_MAPS, duplicateEntityInMaps);
});

function updateMapName(state, action) {
  const { mapId, newName } = action.payload;
  state.stepMaps[mapId].map_name = newName;
}

function duplicateEntityInMaps(state, action) {
  const { entityId, mapIds } = action.payload;
  const entityToDuplicate = state.stepMapEntities[entityId];

  mapIds.forEach((mapId) => {
    var newEntityId = uuidv4();
    var newConfigIds = [];

    entityToDuplicate.configurator_data.forEach((configKey) => {
      var configuratorData = state.entityConfigurators[configKey];
      var newConfiguratorId = uuidv4();
      var newConfiguratorData = {
        ...configuratorData,
        id: newConfiguratorId,
      };
      state.entityConfigurators[newConfiguratorId] = newConfiguratorData;
      newConfigIds.push(newConfiguratorId);
    });

    var newEntity = {
      ...entityToDuplicate,
      id: newEntityId,
      configurator_data: newConfigIds,
    };

    state.stepMaps[mapId].entity_nodes.push(newEntityId);
    state.stepMapEntities[newEntityId] = newEntity;
  });
}

function reorderStep(state, action) {
  const { sourcePosition, destinationPosition, stepId } = action.payload;
  const storylineId = state.currentStoryline;
  state.storylines[storylineId].steps.splice(sourcePosition, 1);
  state.storylines[storylineId].steps.splice(destinationPosition, 0, stepId);
}

function updateAppliesToEndRun(state, action) {
  const { appliesToEndRun } = action.payload;
  state.appliesToEndRun = appliesToEndRun;
}

function updateAppliedRuns(state, action) {
  const { appliedRunsString } = action.payload;
  state.appliedRunsString = appliedRunsString;
}

// ADDS

function addStorylineStep(state, action) {
  const { storylineId, stepName } = action.payload;
  const id = uuidv4();

  state.storylineSteps[id] = {
    id: id,
    name: stepName,
    configuration: [],
    completion: [],
  };
  state.storylines[storylineId].steps.push(id);
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
  const entity = {
    id: entityId,
    configurator_data: [],
    ...entityData,
  };

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

  state.stepMaps[mapId] = map;
  state.stepMapEntities[entityId] = entity;
  if (!state.storylineSteps[stepId].configuration.includes(mapId)) {
    state.storylineSteps[stepId].configuration.push(mapId);
  }
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

  state.completionBundles[bundleId] = newBundle;
  state.storylineSteps[stepId].completion.push(bundleId);
}

function addNPCInteraction(state, action) {
  const { entityId, type, parameters } = action.payload;

  const interactionId = uuidv4();
  state.entityConfigurators[interactionId] = {
    id: interactionId,
    type: type,
    parameters: parameters,
  };
  state.stepMapEntities[entityId].configurator_data.push(interactionId);
}

function addStepCompleteCondition(state, action) {
  const { bundleId, type, name, parameters } = action.payload;
  const conditionId = uuidv4();

  state.completeConditions[conditionId] = {
    id: conditionId,
    type: type,
    unique_name: name,
    parameters: parameters,
  };
  state.completionBundles[bundleId].conditions.push(conditionId);
}

function addEntityToExistingMap(state, action) {
  const { mapId, entityData } = action.payload;
  const entityId = uuidv4();

  const entity = {
    id: entityId,
    configurator_data: [],
    ...entityData,
  };
  state.stepMapEntities[entityId] = entity;
  state.stepMaps[mapId].entity_nodes.push(entityId);
}

// UPDATES

function updateStoryline(state, action) {
  const { currentStoryline, data, appliesToEndRun, appliedRunsString } =
    action.payload;
  return {
    ...state,
    currentStoryline,
    ...data,
    appliesToEndRun,
    appliedRunsString,
  };
}

function updateWithEmptyStoryline() {
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
    appliesToEndRun: false,
  };
}

function updateStorylineName(state, action) {
  const { storylineId, name } = action.payload;
  state.storylines[storylineId].name = name;
}

function updateStorylineStepName(state, action) {
  const { stepId, newName } = action.payload;
  state.storylineSteps[stepId].name = newName;
}

function updateMapEntityName(state, action) {
  const { entityId, newName } = action.payload;
  state.stepMapEntities[entityId].name = newName;
}

function updateOrAddMapEntityParam(state, action) {
  const { entityId, name, value } = action.payload;
  state.stepMapEntities[entityId].parameters[name] = value;
}

function updateMapEntity(state, action) {
  const { entityId, newName, params } = action.payload;

  state.stepMapEntities[entityId].name = newName;
  state.stepMapEntities[entityId].parameters = params;
}

function updateCondition(state, action) {
  const { conditionId, name, parameters } = action.payload;
  state.completeConditions[conditionId].unique_name = name;
  state.completeConditions[conditionId].parameters = parameters;
}

function updateBundle(state, action) {
  const { bundleId, data } = action.payload;
  state.completionBundles[bundleId] = {
    ...state.completionBundles[bundleId],
    ...data,
  };
}

function updateInteraction(state, action) {
  const { entityId, parameters } = action.payload;
  state.entityConfigurators[entityId].parameters = parameters;
}

// DELETES

function deleteStorylineStep(state, action) {
  const { stepId } = action.payload;
  delete state.storylineSteps[stepId];
  deleteReference(state.storylines, 'steps', stepId);
}

function deleteMapEntity(state, action) {
  const { entityId } = action.payload;

  delete state.stepMapEntities[entityId];
  deleteReference(state.stepMaps, 'entity_nodes', entityId);

  // If a map has no entities, delete it.
  Object.keys(state.stepMaps).forEach((mapId) => {
    var entityAmount = state.stepMaps[mapId].entity_nodes.length;
    if (entityAmount <= 0) {
      delete state.stepMaps[mapId];
      deleteReference(state.storylineSteps, 'configuration', mapId);
    }
  });
}

function deleteMapEntityParam(state, action) {
  const { entityId, name } = action.payload;
  delete state.stepMapEntities[entityId].parameters[name];
}

function deleteNPCInteraction(state, action) {
  const { interactionId } = action.payload;
  delete state.entityConfigurators[interactionId];
  deleteReference(state.stepMapEntities, 'configurator_data', interactionId);
}

function deleteCondition(state, action) {
  const { conditionId } = action.payload;
  delete state.completeConditions[conditionId];
  deleteReference(state.completionBundles, 'conditions', conditionId);
}

function deleteBundle(state, action) {
  const { bundleId } = action.payload;
  delete state.completionBundles[bundleId];
  deleteReference(state.storylineSteps, 'completion', bundleId);
}

function clearStoryline() {
  return initialState;
}

function duplicateConfigurations(state, action) {
  const { sourceStepId, targetStepId } = action.payload;

  state.storylineSteps[sourceStepId].configuration.forEach((curMapId) => {
    const curMap = state.stepMaps[curMapId];

    let targetStepMap;
    let foundDuplicateMap = false;

    // Check if a map with that name already exist
    for (
      let i = 0;
      i < state.storylineSteps[targetStepId].configuration.length;
      i++
    ) {
      const foundMap =
        state.stepMaps[state.storylineSteps[targetStepId].configuration[i]];
      if (foundMap.map_name === curMap.map_name) {
        targetStepMap = JSON.parse(JSON.stringify(foundMap));
        foundDuplicateMap = true;
        break;
      }
    }

    if (!targetStepMap) {
      targetStepMap = JSON.parse(JSON.stringify(curMap));
      targetStepMap.id = uuidv4();
      targetStepMap.entity_nodes = [];
    }

    // Only create a new map entry if it was not already present in that step.
    if (!foundDuplicateMap) {
      state.storylineSteps[targetStepId].configuration.push(targetStepMap.id);
    }
    state.stepMaps[targetStepMap.id] = targetStepMap;

    curMap.entity_nodes.forEach((curEntityNodeId) => {
      const curEntityNode = state.stepMapEntities[curEntityNodeId];
      const duplicateEntity = JSON.parse(JSON.stringify(curEntityNode));
      duplicateEntity.id = uuidv4();
      duplicateEntity.configurator_data = [];

      curEntityNode.configurator_data.forEach((curConfId) => {
        const curConf = state.entityConfigurators[curConfId];
        const duplicateConf = JSON.parse(JSON.stringify(curConf));
        duplicateConf.id = uuidv4();

        duplicateEntity.configurator_data.push(duplicateConf.id);
        state.entityConfigurators[duplicateConf.id] = duplicateConf;
      });

      targetStepMap.entity_nodes.push(duplicateEntity.id);
      state.stepMapEntities[duplicateEntity.id] = duplicateEntity;
    });
  });
}

export default storylineReducer;
