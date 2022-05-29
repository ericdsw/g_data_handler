import React from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

const CutsceneRowToolbar = ({
  addAboveClick,
  addBelowClick,
  addEventClick,
  deleteRowClick,
}) => {
  return (
    <Typography variant="h6" gutterBottom align="right">
      <Tooltip title="Add row above" enterDelay={200}>
        <IconButton
          onClick={() => addAboveClick()}
          aria-label="add-row-above"
          size="large"
        >
          <VerticalAlignTopIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add row below" enterDelay={200}>
        <IconButton
          onClick={() => addBelowClick()}
          aria-label="add-row-below"
          size="large"
        >
          <VerticalAlignBottomIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Cutscene Event" enterDelay={200}>
        <IconButton
          onClick={() => addEventClick()}
          aria-label="add"
          size="large"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Row" enterDelay={200}>
        <IconButton
          onClick={() => deleteRowClick()}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

export default CutsceneRowToolbar;
