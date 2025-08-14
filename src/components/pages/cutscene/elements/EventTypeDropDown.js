import React from 'react';
import { Autocomplete, Box, Icon, Typography, TextField } from '@mui/material';

import { eventSchema } from '../../../../globals';

const SORTED_KEYS = Object.keys(eventSchema).sort();

const EventTypeDropDown = ({ value, onChange, disabled = false }) => (
  <Autocomplete
    id="event_type_select"
    options={SORTED_KEYS}
    autoHighlight
    getOptionLabel={(option) => eventSchema[option].name}
    renderOption={(props, option) => (
      <Box component="li" {...props}>
        <Icon sx={{ marginRight: 2 }}>{eventSchema[option].icon}</Icon>
        <Typography>{eventSchema[option].name}</Typography>
      </Box>
    )}
    value={value}
    onChange={(_, val) => onChange(val)}
    clearOnBlur
    clearOnEscape
    disableClearable
    disabled={disabled}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Event Type"
        fullWidth
        margin="normal"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
      />
    )}
  />
);

export default EventTypeDropDown;
