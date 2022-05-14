import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Divider, Paper, Grid, Typography } from "@material-ui/core";
import DragAndDrop from "./DragAndDrop";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: 24,
  },
  dragCapturer: {
    padding: 16,
    marginTop: 24,
  },
  gridContainer: {
    minHeight: 300,
  },
});

const NoDialogue = (props) => {
  const { classes, buttonString, dragString } = props;
  const { handleEmpty, handleUpdateFromFile } = props;

  const [loading, toggleLoading] = useState(false);

  function handleDrop(files) {
    toggleLoading(true);
    handleUpdateFromFile(files[0]);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEmpty()}
        className={classes.button}
      >
        {buttonString}
      </Button>
      <Divider />
      <DragAndDrop handleDrop={(files) => handleDrop(files)}>
        <Paper elevation={1} className={classes.dragCapturer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid item xs>
              <Typography color="textSecondary" align="center" variant="h4">
                {loading && <React.Fragment>Loading...</React.Fragment>}
                {!loading && dragString}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DragAndDrop>
    </div>
  );
};

export default withStyles(styles)(NoDialogue);
