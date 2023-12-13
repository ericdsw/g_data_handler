import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Tooltip,
  Paper,
} from '@mui/material';

import CutsceneRowContainer from './CutsceneRowContainer';

import { styles } from './styles/CutsceneStyle';

const useStyles = makeStyles(styles);

const Cutscene = ({
  cutscene,
  fileName,
  hideBars,
  handleFileNameChange,
  handleAddRow,
  handleShouldHideBars,
}) => {
  const classes = useStyles();

  const cutsceneRows = useMemo(() => cutscene.cutsceneRows, [cutscene])

  return (
    <Grid className={classes.root} container spacing={2} alignItems="center">

      <Grid item xs={12} md={10}>
        <TextField
          id="file_name"
          label="File Name"
          fullWidth
          value={fileName}
          variant="outlined"
          margin="normal"
          onChange={(e) => handleFileNameChange(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Tooltip title="If true, top and bottom black bars will not show">
          <FormControlLabel
            label="Hide black bars"
            control={
              <Switch
                onChange={(e) => {
                  handleShouldHideBars(e.target.checked);
                }}
                checked={hideBars}
                value={hideBars}
              />
            }
          />
        </Tooltip>
      </Grid>

      <Grid item xs={12} container spacing={2}>

        {/* Event List */}
        <Grid item xs={12}>
          {cutsceneRows.length === 0 && (
            <Paper>
              <Typography
                variant="h5"
                color="textSecondary"
                align="center"
                className={classes.emptyText}
              >
                The cutscene is empty
              </Typography>
            </Paper>
          )}
          {cutsceneRows.map((cutsceneRowId, index) => (
            <CutsceneRowContainer
              key={cutsceneRowId}
              rowId={cutsceneRowId}
              rowNumber={index}
            />
          ))}
        </Grid>

        {/* Add new row button */}
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Button color="primary" onClick={() => handleAddRow()}>
              Add Row
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default Cutscene;
