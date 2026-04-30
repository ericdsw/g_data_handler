import React, { useState, useCallback } from 'react';
import { Button, TextField } from '@mui/material';

const AddNewMultiInputRow = ({ keyLabel, onNewRowDefined }) => {
  const [newRowValue, updateNewRowValue] = useState('');

  const onButtonPressed = useCallback(() => {
    if (newRowValue) {
      onNewRowDefined(newRowValue);
      updateNewRowValue('');
    }
  }, [onNewRowDefined, newRowValue]);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <span style={{ marginRight: 16 }}>Add new row:</span>
      <TextField
        label={keyLabel}
        value={newRowValue}
        onChange={(e) => updateNewRowValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            onButtonPressed();
          }
        }}
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        type="button"
        style={{ marginLeft: 16 }}
        onClick={onButtonPressed}
      >
        Add
      </Button>
    </div>
  );
};

export default AddNewMultiInputRow;
