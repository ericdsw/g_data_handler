import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Divider, Paper, Grid, Typography } from '@mui/material';
import { DragAndDrop } from '../../elements';

import styles from './styles/NoCutsceneStyle';

const useStyles = makeStyles(styles);

const NoCutscene = ({ handleEmptyCutscene, handleUpdateFromFile }) => {
  const classes = useStyles();

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
            justifyContent="center"
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
