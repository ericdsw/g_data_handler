import React from 'react';
import { Autocomplete, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { PersonPin } from '@mui/icons-material';

const nodeTargetDescription = (
  <ul>
    <li>
      <code>CAMERA_VIEWPORT</code>&nbsp; Returns the camera node directly,
      useful if you want to add something directly to the camera.
    </li>
    <li>
      <code>StateName:NodeName</code>&nbsp; Will search for a node named
      NodeName inside the state statename
    </li>
    <li>
      <code>CAMERA:NodeName</code>&nbsp; Will search for a node named NodeName
      inside the viewport. Useful when you want to modify or delete something
      that is already inside the camera.
    </li>
    <li>
      <code>PERMANENT:NodeName</code>&nbsp; Will search for a node named
      NodeName inside permanentobjects
    </li>
    <li>
      <code>MAP_OBJECTS:NodeName</code>&nbsp; Will search for a node named
      NodeName inside the current active mapobject instance
    </li>
    <li>
      <code>:NodeName</code>&nbsp; Will search for a node named NodeName
      directly present as a child of the current map
    </li>
  </ul>
);

const savedNodeTargets = state => state.cutscene.savedNodeTargets;
const memoizedSelector = createSelector(
  [savedNodeTargets],
  savedNodeTargets => ({ savedNodeTargets })
);

const NodeTargetField = ({
  label,
  value,
  onChange
}) => {
  const { savedNodeTargets } = useSelector(state => memoizedSelector(state));

  return (
    <Autocomplete
      freeSolo
      fullWidth
      value={value || null}
      onChange={(_, val) => {
        onChange({ target: { value: val }});
      }}
      onInputChange={(_, val) => {
        onChange({ target: { value: val }});
      }}
      options={savedNodeTargets}
      disableClearable
      getOptionLabel={option => option}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <Tooltip enterDelay={300} title={nodeTargetDescription}>
                  <InputAdornment position="end">
                    <PersonPin />
                  </InputAdornment>
                </Tooltip>
              </>
            )
          }}
        />
      )}
    />
  );
}

export default NodeTargetField;