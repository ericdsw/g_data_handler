import React from 'react';
import { connect } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { normalize, denormalize } from 'normalizr';

import Storyline from './Storyline';
import { DragJsonFileManager } from '../../elements';
import { downloadJSON, parseFile } from '../../../functions';
import StorylineSchema from '../../../models/schemas/StorylineSchema';
import {
  updateStoryline,
  updateWithEmptyStoryline,
  updateStorylineName,
  addStorylineStep,
  clearStoryline,
  updateAppliesToEndRun,
  updateAppliedRunsString,
  reorderStep,
} from '../../../actions/storylineActions';
import BubbleChart from '@mui/icons-material/BubbleChart';

class StorylineContainer extends React.Component {
  constructor() {
    super();
    window.exportStoryline = this.export;
    window.printStoryline = () => {
      const {
        currentStoryline,
        completeState,
        appliesToEndRun,
        appliedRunsString,
      } = this.props;

      const output = denormalize(
        currentStoryline,
        StorylineSchema,
        completeState
      );

      console.log(
        JSON.stringify({
          ...output,
          applies_in_end_run: appliesToEndRun,
          applied_runs: appliedRunsString,
        })
      );
    };
  }

  clearStoryline = () => {
    this.props.clearStoryline();
  };

  updateWithEmptyStoryline = () => {
    this.props.updateWithEmptyStoryline();
  };

  export = () => {
    const {
      currentStoryline,
      storylines,
      completeState,
      appliesToEndRun,
      appliedRunsString,
    } = this.props;

    const output = denormalize(
      currentStoryline,
      StorylineSchema,
      completeState
    );

    downloadJSON(storylines[currentStoryline].name, {
      ...output,
      applies_in_end_run: appliesToEndRun,
      applied_runs: appliedRunsString,
    });
  };

  toggleAppliesToEndrun = (newValue) => {
    this.props.updateAppliesToEndRun(newValue);
  };

  updateAppliedRuns = (newValue) => {
    this.props.updateAppliedRunsString(newValue);
  };

  updateStorylineFromFile = (targetFile) => {
    parseFile(targetFile, 'application/json')
      .then((json) => {
        if (
          !Object.keys(json).includes('id') ||
          !Object.keys(json).includes('name')
        ) {
          this.showError('Invalid storyline file provided');
          return;
        }

        const normalizedData = normalize(json, StorylineSchema);
        let appliesToEndRun = false;
        if ('applies_in_end_run' in json) {
          appliesToEndRun = json.applies_in_end_run;
        }
        let appliedRunsString = '';
        if ('applied_runs' in json) {
          appliedRunsString = json.applied_runs;
        }
        this.props.updateStoryline(
          normalizedData.result,
          normalizedData.entities,
          appliesToEndRun,
          appliedRunsString
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
    enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === 'storylineStep') {
      this.props.reorderStep(source.index, destination.index, draggableId);
    }
  };

  // Render Logic
  render() {
    const { currentStoryline, storylines, appliedRunsString } = this.props;

    let content;
    if (currentStoryline !== '') {
      content = (
        <Storyline
          storyline={storylines[currentStoryline]}
          handleNameChange={this.updateName}
          handleAddStep={this.addStep}
          handleClear={this.clearStoryline}
          handleExport={this.export}
          appliedRunsString={appliedRunsString}
          updateAppliedRunsString={this.updateAppliedRuns}
          handleDragEnd={this.onDragEnd}
        />
      );
    } else {
      content = (
        <DragJsonFileManager
          buttonString="New Storyline"
          dragString={
            <React.Fragment>
              <Typography gutterBottom>
                <BubbleChart fontSize="large" />
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
  appliedRunsString: state.storyline.appliedRunsString,

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
  updateAppliedRunsString,
  reorderStep,
})(StorylineContainer);
