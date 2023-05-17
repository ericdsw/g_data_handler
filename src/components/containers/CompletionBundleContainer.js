import React from 'react';
import { connect } from 'react-redux';

import CompletionBundle from '../pages/storylines/CompletionBundle';

import {
  addStepCompleteCondition,
  updateBundle,
  deleteBundle,
} from '../../actions/storylineActions';

/**
 * Container that manages redux communication for the CompletionBundle
 * component
 */
const CompletionBundleContainer = ({
  currentCompletionBundleId,
  addStepCompleteCondition,
  updateBundle,
  deleteBundle,
  completionBundles
}) => {
  return (
    <CompletionBundle
      completionBundle={completionBundles[currentCompletionBundleId]}
      handleCreateCondition={(type, name, data) => {
        addStepCompleteCondition(currentCompletionBundleId, type, name, data);
      }}
      handleEditBundle={(data) => {
        updateBundle(currentCompletionBundleId, data);
      }}
      handleDeleteBundle={() => {
        deleteBundle(currentCompletionBundleId);
      }}
    />
  )
}

const mapStateToProps = (state) => ({
  completionBundles: state.storyline.completionBundles,
});

export default connect(mapStateToProps, {
  addStepCompleteCondition,
  updateBundle,
  deleteBundle,
})(CompletionBundleContainer);
