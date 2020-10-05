import React from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import CompletionBundle from "../pages/storylines/CompletionBundle";

import {
  addStepCompleteCondition,
  updateBundle,
  deleteBundle,
} from "../../actions/storylineActions";

/**
 * Container that manages redux communication for the CompletionBundle
 * component
 */
class CompletionBundleContainer extends React.Component {
  createCondition = (type, name, data) => {
    const { currentCompletionBundleId, addStepCompleteCondition } = this.props;

    addStepCompleteCondition(currentCompletionBundleId, type, name, data);
  };

  editBundle = (data) => {
    const { currentCompletionBundleId, updateBundle } = this.props;
    updateBundle(currentCompletionBundleId, data);
  };

  deleteBundle = () => {
    const { currentCompletionBundleId, deleteBundle } = this.props;
    deleteBundle(currentCompletionBundleId);
  };

  render() {
    const { currentCompletionBundleId, completionBundles } = this.props;
    const currentBundle = completionBundles[currentCompletionBundleId];

    return (
      <CompletionBundle
        completionBundle={currentBundle}
        handleCreateCondition={this.createCondition}
        handleEditBundle={this.editBundle}
        handleDeleteBundle={this.deleteBundle}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  completionBundles: state.storyline.completionBundles,
});

export default connect(mapStateToProps, {
  addStepCompleteCondition,
  updateBundle,
  deleteBundle,
})(withSnackbar(CompletionBundleContainer));
