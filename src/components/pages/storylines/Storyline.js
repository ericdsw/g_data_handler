import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, TextField, Button, Tooltip } from '@mui/material';

import StorylineStepContainer from './StorylineStepContainer';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import StorylineStepForm from './forms/StorylineStepForm';

import { styles } from './styles/StorylineStyle';

const useStyles = makeStyles(styles);

const Storyline = ({
  storyline,
  handleNameChange,
  handleAddStep,
  handleClear,
  handleExport,
  appliedRunsString,
  updateAppliedRunsString,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'createStepDialogue',
    'confirmDelete'
  );

  const fileName = useMemo(() => `${storyline.name}.json`, [storyline.name]);

  /**
   * This useMemo hook is not detecting when the storyline's steps are deleted since
   * it seems that it is only checking the references to the values passed, and since
   * what changes is the length of an existing array, I'm adding it as a dependency even
   * though it should not be required.
   *
   * Note that this is most likely an issue with how redux is configured for this project
   * (more specifically, how the reducer is not actually creating new instances, but instead
   * reusing old references).
   */
  const stepEntries = useMemo(
    () =>
      storyline.steps.map((stepId, index) => {
        return (
          <Grid item xs={12} key={stepId}>
            <StorylineStepContainer currentStepId={stepId} stepOffset={index} />
          </Grid>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storyline, storyline.steps.length]
  );

  return (
    <Grid className={classes.root} container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom>
          Current Storyline: {storyline.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="right">
          <Button
            className={classes.defaultButton}
            onClick={() => toggleDialogue('createStepDialogue', 'show')}
          >
            Add Step
          </Button>
          <Button color="secondary" onClick={() => handleExport()}>
            Export
          </Button>
          <Button
            className={classes.deleteButton}
            onClick={() => toggleDialogue('confirmDelete', 'show')}
          >
            Clear Storyline
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2} alignItems="flex-start">
        <Grid item xs={12} lg={4}>
          <TextField
            id="storyline_name"
            label="Storyline Name"
            fullWidth
            value={storyline.name}
            variant="outlined"
            margin="normal"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            id="file_name"
            label="File Name"
            fullWidth
            value={fileName}
            variant="outlined"
            margin="normal"
            disabled
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Tooltip
            enterDelay={300}
            title="Which runs the storyline will be limited to (separated by comma)"
          >
            <TextField
              id="applied_runs"
              label="Applied Runs"
              fullWidth
              value={appliedRunsString}
              onChange={(e) => updateAppliedRunsString(e.target.value)}
              variant="outlined"
              margin="normal"
              placeholder="Empty value means all runs"
              helperText="Separate entries by comma (possible values: Default, Violent, End)"
            />
          </Tooltip>
        </Grid>
      </Grid>
      {stepEntries}

      <Grid item xs={12}>
        <Typography align="center">
          <Button
            className={classes.defaultButton}
            onClick={() => toggleDialogue('createStepDialogue', 'show')}
          >
            Add Step
          </Button>
        </Typography>
      </Grid>

      <GenericDialogue
        title="Add Step"
        maxWidth="sm"
        open={dialogues['createStepDialogue']}
        onClose={() => toggleDialogue('createStepDialogue', 'hide')}
      >
        <StorylineStepForm
          handleSubmit={(stepName) => {
            toggleDialogue('createStepDialogue', 'hide');
            handleAddStep(stepName);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Clear the current storyline?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogue('confirmDelete', 'hide');
          handleClear();
        }}
      />
    </Grid>
  );
};

export default Storyline;
