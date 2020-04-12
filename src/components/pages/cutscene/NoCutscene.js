import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Paper, Grid, Typography } from "@material-ui/core";
import { DragAndDrop } from "../../elements";

import styles from "./styles/NoCutsceneStyle";

const NoCutscene = (props) => {
  const classes = makeStyles(styles)();

  const { handleEmptyCutscene, handleUpdateFromFile } = props;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEmptyCutscene()}
        className={classes.button}
      >
        New Cutscene
      </Button>
      <Divider />
      <DragAndDrop handleDrop={(files) => handleUpdateFromFile(files[0])}>
        <Paper elevation={1} className={classes.dragCapturer}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid item xs>
              <Typography color="textSecondary" align="center" variant="h4">
                Drag a <code>.json</code> here to edit an existing cutscene
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DragAndDrop>
    </div>
  );
};

export default NoCutscene;
