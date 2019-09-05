import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import StepMapEntity from '../pages/storylines/StepMapEntity';

class StepMapEntityContainer extends React.Component {

    addParameter = (paramName, paramValue) => {

    }

    editParameter = (paramName, paramValue) => {
        console.log(paramName, paramValue);
    }

    deleteParameter = paramName => {
        console.log(paramName);
    }

    addInteraction = (interactionId, type, parameters) => {

    }

    editInteraction = (interactionId, parameters) => {

    }

    deleteInteraction = interactionId => {

    }

    render() {
        const { currentMapEntityId, stepMapEntities } = this.props;
        const currentMapEntity = stepMapEntities[currentMapEntityId];
        return (
            <StepMapEntity
                stepMapEntity={currentMapEntity}
                handleAddParameter={this.addParameter}
                handleEditParameter={this.editParameter}
                handleDeleteParameter={this.deleteParameter}
                handleAddInteraction={this.addInteraction}
                handleEditInteraction={this.editInteraction}
                handleDeleteInteraction={this.deleteInteraction}
            />
        );
    }
}

const mapStateToProps = state => ({
    stepMapEntities: state.storyline.stepMapEntities
});

export default connect(mapStateToProps, {

})(withSnackbar(StepMapEntityContainer));
