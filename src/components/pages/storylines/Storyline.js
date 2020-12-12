import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

import StorylineStepContainer from "../../containers/StorylineStepContainer";
import { GenericDialogue, ConfirmationDialogue } from "../../elements";
import { useDialogueManager } from "../../../hooks";
import StorylineStepForm from "./forms/StorylineStepForm";

import { styles } from "./styles/StorylineStyle";

const Storyline = (props) => {

  const { classes, storyline } = props;

  const { handleNameChange, handleAddStep, handleClear, handleExport } = props;

  const [dialogues, toggleDialogue] = useDialogueManager(
    "createStepDialogue",
    "confirmDelete"
  );

  const fileName = `${storyline.name}.json`;

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
            onClick={() => toggleDialogue("createStepDialogue", "show")}
          >
            Add Step
          </Button>
          <Button color="secondary" onClick={() => handleExport()}>
            Export
          </Button>
          <Button
            className={classes.deleteButton}
            onClick={() => toggleDialogue("confirmDelete", "show")}
          >
            Clear Storyline
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
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
      <Grid item xs={12} lg={6}>
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

      {storyline.steps &&
        storyline.steps.map((stepId, index) => {
          return (
            <Grid item xs={12} key={stepId}>
              <StorylineStepContainer
                currentStepId={stepId}
                stepOffset={index}
              />
            </Grid>
          );
        })}

      <Grid item xs={12}>
        <Typography align="center">
          <Button
            className={classes.defaultButton}
            onClick={() => toggleDialogue("createStepDialogue", "show")}
          >
            Add Step
          </Button>
        </Typography>
      </Grid>

      <GenericDialogue
        title="Add Step"
        maxWidth="sm"
        open={dialogues["createStepDialogue"]}
        onClose={() => toggleDialogue("createStepDialogue", "hide")}
      >
        <StorylineStepForm
          handleSubmit={(stepName) => {
            toggleDialogue("createStepDialogue", "hide");
            handleAddStep(stepName);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Clear the current storyline?"
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          toggleDialogue("confirmDelete", "hide");
          handleClear();
        }}
      />
    </Grid>
  );
};

export default withStyles(styles)(Storyline);
