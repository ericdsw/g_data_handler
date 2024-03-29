import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import StorylineStep from './StorylineStep';

import {
  updateStepName,
  addEntityToNewMap,
  addStepCompletionBundle,
  deleteStep,
  duplicateConfigurations,
} from '../../../actions/storylineActions';

class StorylineStepContainer extends React.Component {
  addEntityWithMap = (mapName, entityData) => {
    const { addEntityToNewMap, currentStepId } = this.props;
    addEntityToNewMap(currentStepId, mapName, entityData);
  };

  addStepCompletionBundle = (data) => {
    const { currentStepId, addStepCompletionBundle } = this.props;
    addStepCompletionBundle(currentStepId, data);
  };

  updateStepName = (newName) => {
    const { currentStepId, updateStepName } = this.props;
    updateStepName(currentStepId, newName);
  };

  deleteStep = () => {
    const { currentStepId, deleteStep } = this.props;
    deleteStep(currentStepId);
  };

  duplicateConfigurations = (targetStepId) => {
    const { currentStepId, duplicateConfigurations } = this.props;
    duplicateConfigurations(currentStepId, targetStepId);
  };

  render() {
    const {
      currentStepId,
      steps,
      stepOffset,
      stepMaps,
      stepMapEntities,
      completionBundles,
      completeConditions,
    } = this.props;

    const currentStep = steps[currentStepId];

    // Configurator Description
    const confDescription = currentStep.configuration.map((mapId, index) => {
      const curMap = stepMaps[mapId];
      return {
        map: curMap,
        entities: curMap.entity_nodes.map(
          (entityId, index) => stepMapEntities[entityId]
        ),
      };
    });

    // Completion Description
    const completionDesc = currentStep.completion.map((bundleId, index) => {
      const curBundle = completionBundles[bundleId];
      return {
        bundle: curBundle,
        conditions: curBundle.conditions.map(
          (condId) => completeConditions[condId]
        ),
      };
    });

    return (
      <Draggable draggableId={currentStepId} index={stepOffset}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <StorylineStep
              storylineStep={currentStep}
              stepOffset={stepOffset}
              allSteps={steps}
              configDescription={confDescription}
              completionDescription={completionDesc}
              handleAddMapConfiguration={this.addEntityWithMap}
              handleAddCompletionBundle={this.addStepCompletionBundle}
              handleUpdateStepName={this.updateStepName}
              handleDeleteStep={this.deleteStep}
              handleDuplicateConfigs={this.duplicateConfigurations}
              draggableProps={provided.dragHandleProps}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state) => ({
  steps: state.storyline.storylineSteps,
  stepMaps: state.storyline.stepMaps,
  stepMapEntities: state.storyline.stepMapEntities,
  completionBundles: state.storyline.completionBundles,
  completeConditions: state.storyline.completeConditions,
});

export default connect(mapStateToProps, {
  updateStepName,
  addEntityToNewMap,
  addStepCompletionBundle,
  deleteStep,
  duplicateConfigurations,
})(StorylineStepContainer);
