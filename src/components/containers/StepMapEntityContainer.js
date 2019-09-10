import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import StepMapEntity from '../pages/storylines/StepMapEntity';

import {
    updateMapEntityName,
    deleteMapEntity,
    updateOrAddMapEntityParam,
    deleteMapEntityParam
} from '../../actions/storylineActions';

class StepMapEntityContainer extends React.Component {

    editOrAddParameter = (paramName, paramValue) => {
        const { updateOrAddMapEntityParam, currentMapEntityId } = this.props;
        updateOrAddMapEntityParam(currentMapEntityId, paramName, paramValue);
    }

    deleteParameter = paramName => {
        const { deleteMapEntityParam, currentMapEntityId } = this.props;
        deleteMapEntityParam(currentMapEntityId, paramName);
    }

    addInteraction = (interactionId, type, parameters) => {

    }

    editInteraction = (interactionId, parameters) => {

    }

    deleteInteraction = interactionId => {

    }

    updateEntityName = newName => {
        const { updateMapEntityName, currentMapEntityId } = this.props;
        updateMapEntityName(currentMapEntityId, newName);
    }

    deleteEntity = () => {
        const { deleteMapEntity, currentMapEntityId } = this.props;
        deleteMapEntity(currentMapEntityId);
    }

    render() {
        const { currentMapEntityId, stepMapEntities } = this.props;
        const currentMapEntity = stepMapEntities[currentMapEntityId];
        return (
            <StepMapEntity
                stepMapEntity={currentMapEntity}
                handleAddParameter={this.editOrAddParameter}
                handleEditParameter={this.editOrAddParameter}
                handleDeleteParameter={this.deleteParameter}
                handleAddInteraction={this.addInteraction}
                handleEditInteraction={this.editInteraction}
                handleDeleteInteraction={this.deleteInteraction}
                handleUpdateName={this.updateEntityName}
                handleDeleteEntity={this.deleteEntity}
            />
        );
    }
}

const mapStateToProps = state => ({
    stepMapEntities: state.storyline.stepMapEntities
});

export default connect(mapStateToProps, {
    updateMapEntityName,
    updateOrAddMapEntityParam,
    deleteMapEntity,
    deleteMapEntityParam
})(withSnackbar(StepMapEntityContainer));
