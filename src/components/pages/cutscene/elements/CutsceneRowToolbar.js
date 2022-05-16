import React from "react";
import { Typography, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";

const CutsceneRowToolbar = ({
  addAboveClick,
  addBelowClick,
  addEventClick,
  deleteRowClick,
}) => {
  return (
    <Typography variant="h6" gutterBottom align="right">
      <Tooltip title="Add row above" enterDelay={200}>
        <IconButton onClick={() => addAboveClick()} aria-label="add-row-above">
          <VerticalAlignTopIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add row below" enterDelay={200}>
        <IconButton onClick={() => addBelowClick()} aria-label="add-row-below">
          <VerticalAlignBottomIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Cutscene Event" enterDelay={200}>
        <IconButton onClick={() => addEventClick()} aria-label="add">
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Row" enterDelay={200}>
        <IconButton onClick={() => deleteRowClick()} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

export default CutsceneRowToolbar;
