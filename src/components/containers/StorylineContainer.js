import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Typography, Icon } from '@mui/material';
import { normalize, denormalize } from 'normalizr';

import Storyline from '../pages/storylines/Storyline';
import { DragJsonFileManager } from '../elements';
import { downloadJSON, parseFile } from '../../functions';
import StorylineSchema from '../../models/schemas/StorylineSchema';
import {
  updateStoryline,
  updateWithEmptyStoryline,
  updateStorylineName,
  addStorylineStep,
  clearStoryline,
  updateAppliesToEndRun,
} from '../../actions/storylineActions';

class StorylineContainer extends React.Component {
  clearStoryline = () => {
    this.props.clearStoryline();
  };

  updateWithEmptyStoryline = () => {
    this.props.updateWithEmptyStoryline();
  };

  export = () => {
    const { currentStoryline, storylines, completeState, appliesToEndRun } =
      this.props;

    const output = denormalize(
      currentStoryline,
      StorylineSchema,
      completeState
    );

    console.log(this.props);

    downloadJSON(storylines[currentStoryline].name, {
      ...output,
      applies_in_end_run: appliesToEndRun,
    });
  };

  toggleAppliesToEndrun = (newValue) => {
    const { updateAppliesToEndRun } = this.props;
    updateAppliesToEndRun(newValue);
  };

  updateStorylineFromFile = (targetFile) => {
    const { updateStoryline } = this.props;

    parseFile(targetFile, 'application/json')
      .then((json) => {
        const normalizedData = normalize(json, StorylineSchema);
        let appliesToEndRun = false;
        if ('applies_in_end_run' in json) {
          appliesToEndRun = json.applies_in_end_run;
        }
        updateStoryline(
          normalizedData.result,
          normalizedData.entities,
          appliesToEndRun
        );
      })
      .catch((error) => this.showError(error.message));
  };

  updateName = (newName) => {
    const { currentStoryline, updateStorylineName } = this.props;
    updateStorylineName(currentStoryline, newName);
  };

  addStep = (stepName) => {
    const { currentStoryline, addStorylineStep } = this.props;
    addStorylineStep(currentStoryline, stepName);
  };

  // Extra
  showError = (errorMessage) => {
    this.props.enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  // Render Logic
  render() {
    const { currentStoryline, storylines, appliesToEndRun } = this.props;

    let content;
    if (currentStoryline !== '') {
      content = (
        <Storyline
          storyline={storylines[currentStoryline]}
          handleNameChange={this.updateName}
          handleAddStep={this.addStep}
          handleClear={this.clearStoryline}
          handleExport={this.export}
          updateAppliesToEndRun={this.toggleAppliesToEndrun}
          appliesToEndRun={appliesToEndRun}
        />
      );
    } else {
      content = (
        <DragJsonFileManager
          buttonString="New Storyline"
          dragString={
            <React.Fragment>
              <Typography gutterBottom>
                <Icon fontSize="large">bubble_chart</Icon>
              </Typography>
              Drag a <code>.json</code> here to edit an existing storyline
            </React.Fragment>
          }
          handleEmpty={this.updateWithEmptyStoryline}
          handleUpdateFromFile={this.updateStorylineFromFile}
        />
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => ({
  currentStoryline: state.storyline.currentStoryline,
  storylines: state.storyline.storylines,
  appliesToEndRun: state.storyline.appliesToEndRun,

  /**
   * We need access to the complete state inside the storyline reducer, which is what
   * normalizr expects.
   */
  completeState: state.storyline,
});

export default connect(mapStateToProps, {
  updateStoryline,
  updateWithEmptyStoryline,
  updateStorylineName,
  addStorylineStep,
  clearStoryline,
  updateAppliesToEndRun,
})(withSnackbar(StorylineContainer));
