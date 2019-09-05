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

    }

    render() {

        const { currentStepId, steps, stepOffset } = this.props;

        const currentStep = steps[currentStepId];

        return (
            <StorylineStep
                storylineStep={currentStep}
                stepOffset={stepOffset}
                handleAppMapConfiguration={this.addMapConfiguration}
                handleAddCompletionBundle={this.addCompletionBundle}
                handleUpdateStepName={this.updateStepName}
            />
        );
    }

}

const mapStateToProps = state => ({
    steps: state.storyline.storylineSteps
});

export default connect(mapStateToProps, {

})(withSnackbar(StorylineStepContainer));
