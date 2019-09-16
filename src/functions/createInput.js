import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    MenuItem,
    Typography
} from '@material-ui/core';

export default function createInput(
    paramName, inputData, value, handleChange, disabled = false,
    extraParams = {}
) {

    let label = inputData.label;
    if (inputData.required) {
        label += '*';
    }

    if (value === null || typeof(value) === 'undefined') {
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
                            disabled={disabled}
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
                    variant='outlined' 
                    margin='normal'
                    disabled={disabled}
                    {...extraParams}
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
            if (value === '') {
                options.unshift(
                    <MenuItem key='_EMPTY_VAL_' value=''>
                        <Typography variant='body1'>
                            <i>---</i>
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
                    disabled={disabled}
                    variant='outlined' 
                    margin='normal'
                    {...extraParams}
                >
                    {options}
                </TextField>
            );

        case 'positionArray':
        case 'position':
        case 'number':
        case 'text':
        default:
            return (
                <TextField 
                    id={paramName}
                    label={label}
                    placeholder={inputData.placeholder}
                    onChange={handleChange(paramName)}
                    value={value}
                    type={inputData.type === 'number' ? 'number' : 'text'}
                    fullWidth 
                    variant='outlined' 
                    margin='normal'
                    disabled={disabled}
                    {...extraParams}
                />
            );
            
    }
}
