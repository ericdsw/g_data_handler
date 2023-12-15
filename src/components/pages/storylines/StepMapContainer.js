import React from 'react';
import { connect } from 'react-redux';

import StepMap from './StepMap';

import {
  addEntityToExistingMap,
  updateMapName,
} from '../../../actions/storylineActions';

const StepMapContainer = ({
  currentMapId,
  maps,
  addEntityToExistingMap,
  updateMapName,
}) => {
  return (
    <StepMap
      stepMap={maps[currentMapId]}
      handleAddEntity={(data) => addEntityToExistingMap(currentMapId, data)}
      handleUpdateName={(newName) => updateMapName(currentMapId, newName)}
    />
  );
};

const mapStateToProps = (state) => ({
  maps: state.storyline.stepMaps,
});

export default connect(mapStateToProps, {
  addEntityToExistingMap,
  updateMapName,
})(StepMapContainer);
