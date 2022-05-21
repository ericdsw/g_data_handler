import React, { useState, useCallback } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Button, Divider, Paper, Grid, Typography } from "@mui/material";
import DragAndDrop from "./DragAndDrop";

const useStyles = makeStyles((theme) => ({
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
}));

const NoDialogue = ({
  buttonString,
  dragString,
  handleEmpty,
  handleUpdateFromFile,
}) => {
  const classes = useStyles();

  const [loading, toggleLoading] = useState(false);

  const handleDrop = useCallback(
    (files) => {
      toggleLoading(true);
      handleUpdateFromFile(files[0]);
    },
    [toggleLoading, handleUpdateFromFile]
  );

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

export default NoDialogue;
