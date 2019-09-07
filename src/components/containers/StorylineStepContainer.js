import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import StorylineStep from '../pages/storylines/StorylineStep';

class StorylineStepContainer extends React.Component {

    addMapConfiguration = (mapId, data) => {

    }

    addCompletionBundle = (completionBundleId, data) => {

    }

    updateStepName = newName => {
        console.log(newName);
    }

    render() {

        const { 
            currentStepId, steps, stepOffset,
            stepMaps, stepMapEntities,
            completionBundles, completeConditions
        } = this.props;

        const currentStep = steps[currentStepId];

        // Configurator Description
        const confDescription = currentStep.configuration.map((mapId, index) => {
            const curMap = stepMaps[mapId];
            return {
                map: curMap,
                entities: curMap.entity_nodes.map((entityId, index) => (
                    stepMapEntities[entityId]
                ))
            }
        });

        // Completion Description
        const completionDesc = currentStep.completion.map((bundleId, index) => {
            const curBundle = completionBundles[bundleId];
            return {
                bundle: curBundle,
                conditions: curBundle.conditions.map((condId, index) => (
                    completeConditions[condId]
                ))
            }
        });

        return (
            <StorylineStep
                storylineStep={currentStep}
                stepOffset={stepOffset}
                configDescription={confDescription}
                completionDescription={completionDesc}
                handleAppMapConfiguration={this.addMapConfiguration}
                handleAddCompletionBundle={this.addCompletionBundle}
                handleUpdateStepName={this.updateStepName}
            />
        );
    }

}

const mapStateToProps = state => ({
    steps: state.storyline.storylineSteps,
    stepMaps: state.storyline.stepMaps,
    stepMapEntities: state.storyline.stepMapEntities,
    completionBundles: state.storyline.completionBundles,
    completeConditions: state.storyline.completeConditions
});

export default connect(mapStateToProps, {

})(withSnackbar(StorylineStepContainer));
