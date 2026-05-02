import { useMemo } from 'react';
import { Grid, Typography, TextField, Button, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';

import StorylineStepContainer from './StorylineStepContainer';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import StorylineStepForm from './forms/StorylineStepForm';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Storyline = ({
  storyline,
  handleNameChange,
  handleAddStep,
  handleClear,
  handleExport,
  appliedRunsString,
  updateAppliedRunsString,
  handleDragEnd,
}) => {

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
          <Grid key={stepId} size={12}>
            <StorylineStepContainer currentStepId={stepId} stepOffset={index} />
          </Grid>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storyline, storyline.steps.length]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2} sx={theme => ({
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        alignItems: "center",
        [theme.breakpoints.down('lg')]: {
          paddingLeft: 0,
          paddingRight: 0,
        }
      })}>
        <Grid size={8}>
          <Typography variant="h4" gutterBottom>
            Current Storyline: {storyline.name}
          </Typography>
        </Grid>
        <Grid size={4}>
          <Typography align="right">
            <Button
              sx={theme => ({ color: theme.palette.primary.main })}
              onClick={() => toggleDialogue('createStepDialogue', 'show')}
            >
              Add Step
            </Button>
            <Button color="secondary" onClick={() => handleExport()}>
              Export
            </Button>
            <Button
              sx={{ color: red[400] }}
              onClick={() => toggleDialogue('confirmDelete', 'show')}
            >
              Clear Storyline
            </Button>
          </Typography>
        </Grid>
        <Grid container spacing={2} size={12} sx={{
          alignItems: "flex-start"
        }}>
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
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
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
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
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
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

        <Grid size={12}>
          <Droppable droppableId={storyline.id} type="storylineStep">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {stepEntries}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>

        <Grid size={12}>
          <Typography align="center">
            <Button
              sx={theme => ({ color: theme.palette.primary.main })}
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
    </DragDropContext>
  );
};

export default Storyline;
