import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    MenuItem,
    Typography,
    Divider
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

    var returnValue;

    switch (inputData.type) {

        case 'boolean':
            returnValue = (
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
            break;

        case 'json':
            returnValue = (
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
            break;

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
            returnValue = (
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
            break;

        case 'positionArray':
        case 'position':
        case 'number':
        case 'text':
        default:
            returnValue = (
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

    if (inputData.afterSeparator) {
        return (
            <React.Fragment>
                <div 
                    style={{ 
                        marginTop: 20, 
                        marginBottom: 10,
                        marginLeft: 6, 
                        marginRight: 6 
                    }} 
                >
                    <Typography 
                        gutterBottom 
                        variant='subtitle1'
                    >
                        {inputData.afterSeparator}
                    </Typography>
                    <Divider />
                </div>
                {returnValue}
            </React.Fragment>
        );
    } else {
        return returnValue;
    }
}
