import React from 'react';
import { connect } from 'react-redux';

import {
  updateCondition,
  deleteCondition,
} from '../../../actions/storylineActions';
import CompleteCondition from './CompleteCondition';

/**
 * Container that handles redux communication for the CompleteCondition
 * component
 */
const CompleteConditionContainer = ({
  conditionId,
  deleteCondition,
  updateCondition,
  completeConditions,
}) => {
  return (
    <CompleteCondition
      completeCondition={completeConditions[conditionId]}
      handleEditCondition={(name, data) =>
        updateCondition(conditionId, name, data)
      }
      handleDeleteCondition={() => deleteCondition(conditionId)}
    />
  );
};

const mapStateToProps = (state) => ({
  completeConditions: state.storyline.completeConditions,
});

export default connect(mapStateToProps, {
  updateCondition,
  deleteCondition,
})(CompleteConditionContainer);
