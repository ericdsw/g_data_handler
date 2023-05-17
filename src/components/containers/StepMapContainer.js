import React from 'react';
import { connect } from 'react-redux';

import StepMap from '../pages/storylines/StepMap';

import { addEntityToExistingMap } from '../../actions/storylineActions';


const StepMapContainer = ({
  currentMapId,
  maps,
  addEntityToExistingMap,
}) => {
  return (
    <StepMap
      stepMap={maps[currentMapId]}
      handleAddEntity={data => addEntityToExistingMap(currentMapId, data)}
    />
  )
}

const mapStateToProps = (state) => ({
  maps: state.storyline.stepMaps,
});

export default connect(mapStateToProps, {
  addEntityToExistingMap,
})(StepMapContainer);
