import React from 'react';
import { connect } from 'react-redux';

import StepMapEntity from '../pages/storylines/StepMapEntity';

import {
  deleteMapEntity,
  updateOrAddMapEntityParam,
  deleteMapEntityParam,
  addNPCInteraction,
  updateMapEntity,
} from '../../actions/storylineActions';

const StepMapEntityContainer = ({
  currentMapEntityId,
  updateOrAddMapEntityParam,
  deleteMapEntityParam,
  addNPCInteraction,
  updateMapEntity,
  deleteMapEntity,
  stepMapEntities,
  curMapName,
}) => {
  return (
    <StepMapEntity
      stepMapEntity={stepMapEntities[currentMapEntityId]}
      curMapName={curMapName}
      handleAddParameter={(paramName, paramValue) => {
        updateOrAddMapEntityParam(currentMapEntityId, paramName, paramValue);
      }}
      handleEditParameter={(paramName, paramValue) => {
        updateOrAddMapEntityParam(currentMapEntityId, paramName, paramValue);
      }}
      handleDeleteParameter={(paramName) =>
        deleteMapEntityParam(currentMapEntityId, paramName)
      }
      handleAddInteraction={(type, parameters) => {
        addNPCInteraction(currentMapEntityId, type, parameters);
      }}
      handleUpdateEntity={(newName, params) => {
        updateMapEntity(currentMapEntityId, newName, params);
      }}
      handleDeleteEntity={() => deleteMapEntity(currentMapEntityId)}
    />
  );
};

const mapStateToProps = (state) => ({
  stepMapEntities: state.storyline.stepMapEntities,
});

export default connect(mapStateToProps, {
  updateOrAddMapEntityParam,
  deleteMapEntity,
  deleteMapEntityParam,
  addNPCInteraction,
  updateMapEntity,
})(StepMapEntityContainer);
