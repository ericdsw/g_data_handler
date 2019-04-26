import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
} from '@material-ui/core';

export default function createInput(paramName, inputData, value, handleChange) {

    let label = inputData.label;
    if (inputData.required) {
        label += '*';
    }

    switch (inputData.type) {

        case 'boolean':
            return <FormControlLabel
                label={label}
                control={
                    <Switch
                        onChange={handleChange(paramName)}
                        checked={value} value={value} />
                } />;

        case 'json':
            return <TextField
                id={paramName}
                label={label}
                placeholder={inputData.placeholder}
                multiline fullWidth rows={5}
                onChange={handleChange(paramName)}
                value={value}
                variant='outlined' margin='normal' />;

        case 'positionArray':
        case 'position':
        case 'number':
        case 'text':
        default:
            return <TextField 
                id={paramName}
                label={label}
                placeholder={inputData.placeholder}
                onChange={handleChange(paramName)}
                value={value}
                type={inputData.type === 'number' ? 'number' : 'text'}
                fullWidth variant='outlined' margin='normal' />;
            
    }
}
