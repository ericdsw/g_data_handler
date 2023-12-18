import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectTargetObjects = state => state.dialogue.savedTargetObjects;
const memoizedSelector = createSelector(
  [selectTargetObjects],
  (savedTargetObjects) => ( { savedTargetObjects })
);

const TargetObjectField = ({
  value,
  label,
  onChange
}) => {

  const { savedTargetObjects } = useSelector(state => memoizedSelector(state));

  return (
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
      options={savedTargetObjects}
      disableClearable
      getOptionLabel={option => option}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          margin="normal"
        />
      )}
    />
  );
}

export default TargetObjectField;
