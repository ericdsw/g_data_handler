import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import StepMapEntity from '../pages/storylines/StepMapEntity';

import {
    deleteMapEntity,
    updateOrAddMapEntityParam,
    deleteMapEntityParam,
    addNPCInteraction,
    updateMapEntity
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

    addInteraction = (type, parameters) => {
        const { addNPCInteraction, currentMapEntityId } = this.props;
        addNPCInteraction(currentMapEntityId, type, parameters);
    }

    updateEntity = (newName, params) => {
        const { updateMapEntity, currentMapEntityId } = this.props;
        updateMapEntity(currentMapEntityId, newName, params);
    }

    deleteEntity = () => {
        const { deleteMapEntity, currentMapEntityId } = this.props;
        deleteMapEntity(currentMapEntityId);
    }

    render() {
        const { currentMapEntityId, stepMapEntities, curMapName } = this.props;
        const currentMapEntity = stepMapEntities[currentMapEntityId];
        return (
            <StepMapEntity
                stepMapEntity={currentMapEntity}
                curMapName={curMapName}
                handleAddParameter={this.editOrAddParameter}
                handleEditParameter={this.editOrAddParameter}
                handleDeleteParameter={this.deleteParameter}
                handleAddInteraction={this.addInteraction}
                handleEditInteraction={this.editInteraction}
                handleDeleteInteraction={this.deleteInteraction}
                handleDeleteEntity={this.deleteEntity}
                handleUpdateEntity={this.updateEntity}
            />
        );
    }
}

const mapStateToProps = state => ({
    stepMapEntities: state.storyline.stepMapEntities
});

export default connect(mapStateToProps, {
    updateOrAddMapEntityParam,
    deleteMapEntity,
    deleteMapEntityParam,
    addNPCInteraction,
    updateMapEntity
})(withSnackbar(StepMapEntityContainer));
