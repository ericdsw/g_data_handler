import React from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectFileData = state => state.cutscene.preloadedCutsceneFileNames;
const memoizedSelector = createSelector([selectFileData], fileNames => ({
  fileNames
}));

const CutsceneFileSearcher = ({
  label,
  value,
  onChange,
}) => {

  const { fileNames } = useSelector(state => memoizedSelector(state));
  return (
    <Grid container spacing={2} sx={{ marginTop: 0 }}>
      <Grid item xs>
        <Autocomplete
          freeSolo
          fullWidth
          value={value || null}
          onChange={(_, val) => {
            onChange({ target: { value: val }})
          }}
          onInputChange={(_, val) => {
            onChange({ target: { value: val }})
          }}
          options={fileNames}
          disableClearable
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
            />
          )}
        />
      </Grid>
    </Grid>
  );

};

export default CutsceneFileSearcher;