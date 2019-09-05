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
        case UPDATE_STORYLINE:
            return updateStoryline(state, action);
        case UPDATE_WITH_EMPTY_STORYLINE:
            return updateWithEmptyStoryline(state, action);
        case UPDATE_STORYLINE_NAME:
            return updateStorylineName(state, action);

        case ADD_STORYLINE_STEP:
            return
        case ADD_STEP_MAP_ELEMENT_CONFIG:
            return
        case ADD_STEP_COMPLETION_BUNDLE:
            return
        case ADD_COMPLETION_BUNDLE_CONDITION:
            return
        default:
            return state;
    }
}

function updateStoryline(state, action) {
    const { currentStoryline, data } = action.payload;
    return Object.assign({}, {currentStoryline}, data);
}

function updateWithEmptyStoryline(state, action) {

    const defaultData = {
        'DefaultStoryline': {
            id: 'DefaultStoryline',
            name: 'DefaultStoryline'
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

function addStorylineStep(state, action) {
    const { stepName } = action.payload;
    return Object.assign({}, state, { 
        storylineData: {
            [stepName] : {
                configuration: {},
                completion: []
            }
        }
    });
}

function addStepMapElementConfig(state, action) {
    const { stepName, mapName, elementName, data } = action.payload;
    let currentStep = state.storylineData[stepName];
    if (!(mapName in currentStep.configuration)) {
        currentStep.configuration[mapName] = {};
    }
    currentStep.configuration[mapName][elementName] = data;
    return Object.assign({}, state, {
        storylineData: {
            [stepName] : currentStep
        }
    });
}

function addStepCompletionBundle(state, action) {
    const { stepName, data } = action.payload;
    let currentStep = state.storylineData[stepName];
    currentStep.completion.push(data);
    return Object.assign({}, state, {
        storylineData: {
            [stepName]: currentStep
        }
    });
}
