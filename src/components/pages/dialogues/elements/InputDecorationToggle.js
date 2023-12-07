import React from 'react';
import { IconButton } from '@mui/material';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const InputDecorationToggle = ({ checked, onClick }) => (
  <IconButton onClick={onClick} size="large">
    {checked ? <ToggleOffOutlinedIcon /> : <ToggleOnIcon />}
  </IconButton>
);

export default InputDecorationToggle;
