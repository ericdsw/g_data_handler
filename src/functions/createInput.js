import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    MenuItem,
    Typography
} from '@material-ui/core';

export default function createInput(paramName, inputData, value, handleChange) {

    let label = inputData.label;
    if (inputData.required) {
        label += '*';
    }

    if (value === null) {
        value = '';
    }

    switch (inputData.type) {

        case 'boolean':
            return (
                <FormControlLabel
                    label={label}
                    control={
                        <Switch
                            onChange={handleChange(paramName)}
                            checked={value} 
                            value={value} 
                        />
                    } 
                />
            );

        case 'json':
            return (
                <TextField
                    id={paramName}
                    label={label}
                    placeholder={inputData.placeholder}
                    multiline fullWidth rows={5}
                    onChange={handleChange(paramName)}
                    value={value}
                    variant='outlined' margin='normal' 
                />
            );
        case 'dropdown':
            let options = [];
            for (const key in inputData.elements) {
                options.push(
                    <MenuItem key={key} value={key}>
                        <Typography variant='body1'>
                            {inputData.elements[key]}
                        </Typography>
                    </MenuItem>
                );
            }
            return (
                <TextField
                    label={label}
                    id={paramName}
                    select
                    fullWidth
                    value={value}
                    onChange={handleChange(paramName)}
                    variant='outlined' margin='normal'
                >
                    {options}
                </TextField>
            );

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
