import React from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    MenuItem,
    Typography,
    Divider,
    InputAdornment,
    Icon,
} from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, green, yellow, amber } from '@material-ui/core/colors';

export default function createInput(
    paramName, inputData, value, handleChange, disabled = false,
    extraParams = {}
) {

    let inputColor = blue[600];

    let label = inputData.label;
    if (inputData.required) {
        label += '*';
    }

    if (value === null || typeof(value) === 'undefined') {
        value = '';
    }

    let returnValue;
    let adornment = <React.Fragment/>;

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
        case 'node_target':
        default:

            if (inputData.type === 'node_target') {
                inputColor = green[600];
                adornment = (
                    <InputAdornment position='end'>
                        <Icon>person_pin</Icon>
                    </InputAdornment>
                )
            } else if (inputData.type === 'position') {
                inputColor = amber[600];
                adornment = (
                    <InputAdornment position='end'>
                        <Icon>my_location</Icon>
                    </InputAdornment>
                );
            } else if (inputData.type === 'positionArray') {
                inputColor = yellow[600];
                adornment = (
                    <InputAdornment position='end'>
                        <Icon>view_week</Icon>
                    </InputAdornment>
                )
            }

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
                    InputProps={{
                        endAdornment: adornment,
                    }}
                    {...extraParams}
                />
            );
            
    }

    const inputTheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: inputColor
            }
        }
    });

    if (inputData.afterSeparator) {
        return (
            <ThemeProvider theme={inputTheme}>
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
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={inputTheme}>
                {returnValue}
            </ThemeProvider>
        );
    }
}
