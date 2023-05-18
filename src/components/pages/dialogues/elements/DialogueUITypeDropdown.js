import React from 'react';

import {
  MenuItem,
  Typography,
  TextField
} from '@mui/material';

const OPTIONS = {
  default: "Default",
  battle: "Transparent",
};

const DialogueUITypeDropDown = ({ value, onChange }) => (
  <TextField
    label="Dialogue UI Type"
    select
    fullWidth
    value={value}
    onChange={onChange}
    variant='outlined'
    margin='normal'
  >
    {Object.keys(OPTIONS).map(optionKey => (
      <MenuItem key={optionKey} value={optionKey}>
        <Typography variant="body1">{OPTIONS[optionKey]}</Typography>
      </MenuItem>
    ))}
  </TextField>
);

export default DialogueUITypeDropDown