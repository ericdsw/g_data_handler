import React from 'react';
import {
  TextField,
  MenuItem
} from '@mui/material'

import { speakerSchema } from '../../../../globals';


const parsedSpeakers = Object.keys(speakerSchema).map((speakerKey) => (
  <MenuItem key={speakerKey} value={speakerKey}>
    {speakerKey} ({speakerSchema[speakerKey].name || <em>No Name</em>})
  </MenuItem>
));

const elements = [
  <MenuItem key="---" value="">
    {' '}
    ---{' '}
  </MenuItem>,
  ...parsedSpeakers,
];

const SpeakerDropdown = ({ value, onChange }) => (
  <TextField
    select
    fullWidth
    label="Speaker"
    value={value} 
    onChange={onChange}
    variant='outlined'
    margin='normal'
  >
    {elements}
  </TextField>
);

export default SpeakerDropdown;