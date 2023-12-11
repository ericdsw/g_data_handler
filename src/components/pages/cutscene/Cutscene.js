import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Tooltip,
} from '@mui/material';

import CutsceneRowContainer from './CutsceneRowContainer';

import { styles } from './styles/CutsceneStyle';

const useStyles = makeStyles(styles);

const Cutscene = ({
  cutsceneRows,
  fileName,
  hideBars,
  handleFileNameChange,
  handleAddRow,
  handleShouldHideBars,
}) => {
  const classes = useStyles();

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
      {cutsceneRows.length === 0 && (
        <Typography
          variant="h5"
          color="textSecondary"
          align="center"
          className={classes.emptyText}
        >
          The cutscene is empty
        </Typography>
      )}
      {cutsceneRows.map((cutsceneRow, index) => (
        <CutsceneRowContainer
          key={index}
          rowNumber={index}
          rowData={cutsceneRow}
        />
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Button color="primary" onClick={() => handleAddRow()}>
            Add Row
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cutscene;
