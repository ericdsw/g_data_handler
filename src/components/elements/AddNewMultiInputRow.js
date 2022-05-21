import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const AddNewMultiInputRow = ({ keyLabel, onNewRowDefined }) => {
  const [newRowValue, updateNewRowValue] = useState("");

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
      }}
    >
      <span style={{ marginRight: 16 }}>Add new row:</span>
      <TextField
        label={keyLabel}
        value={newRowValue}
        onChange={(e) => updateNewRowValue(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button
        onClick={() => {
          if (newRowValue) {
            onNewRowDefined(newRowValue);
            updateNewRowValue("");
          }
        }}
        variant="contained"
        color="secondary"
        type="button"
        style={{ marginLeft: 16 }}
      >
        Add
      </Button>
    </div>
  );
};

export default AddNewMultiInputRow;
