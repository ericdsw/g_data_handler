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
  Tooltip,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import AddNewMultiInputRow from '../components/elements/AddNewMultiInputRow';

const nodeTargetDescription = (
  <ul>
    <li>
      <code>StateName:NodeName</code>&nbsp; Will search for a node named
      NodeName inside the state statename
    </li>
    <li>
      <code>CAMERA:NodeName</code>&nbsp; Will search for a node named NodeName
      inside the viewport
    </li>
    <li>
      <code>PERMANENT:NodeName</code>&nbsp; Will search for a node named
      NodeName inside permanentobjects
    </li>
    <li>
      <code>MAP_OBJECTS:NodeName</code>&nbsp; Will search for a node named
      NodeName inside the current active mapobject instance
    </li>
    <li>
      <code>:NodeName</code>&nbsp; Will search for a node named NodeName
      directly present as a child of the current map
    </li>
  </ul>
);

/**
 * Creates an input element instance using the provided attributes.
 *
 * Possible input types:
 * - boolean
 * - number
 * - json
 * - dropdown
 * - positionArray
 * - position
 * - text
 * - note_target
 *
 * These last types are used to create compound inputs:
 * - multi_input_object
 */
export default function createInput(
  paramName,
  inputData,
  value,
  handleChange,
  disabled = false,
  extraParams = {}
) {
  let label = inputData.label;
  if (inputData.required) {
    label += '*';
  }

  if (value === null || typeof value === 'undefined') {
    switch (inputData.type) {
      case 'boolean':
        value = inputData.default;
        break;
      case 'number':
        const numberVal = parseFloat(inputData.default);
        if (Number.isNaN(numberVal)) {
          value = '';
        } else {
          value = numberVal;
        }
        break;
      default:
        if (!inputData.default) {
          value = '';
        } else {
          value = inputData.default;
        }
        break;
    }
  }

  let contentValue;
  let adornment = <React.Fragment />;

  switch (inputData.type) {
    
    case 'multi_input_object':
      const keyField = inputData.key_field;

      /** Render one input row for each value */
      const renderedInputs = Object.keys(value).map((valueKey, index) => {
        return (
          <div
            key={`${index}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {Object.keys(inputData.inputs).map((inputIdentifier) => {
              const isKey = inputIdentifier === keyField;
              return (
                <div
                  key={inputIdentifier}
                  style={{
                    flex:
                      inputData.inputs[inputIdentifier].type === 'boolean'
                        ? undefined
                        : 1,
                    marginRight: 16,
                  }}
                >
                  {createInput(
                    inputIdentifier,
                    inputData.inputs[inputIdentifier],
                    isKey ? valueKey : value[valueKey][inputIdentifier],
                    () => (event) => {
                      handleChange(paramName)({
                        target: {
                          value: {
                            ...value,
                            [valueKey]: {
                              ...value[valueKey],
                              [inputIdentifier]:
                                inputData.inputs[inputIdentifier].type ===
                                'boolean'
                                  ? event.target.checked
                                  : event.target.value,
                            },
                          },
                        },
                      });
                    },
                    isKey ? true : disabled,
                    extraParams
                  )}
                </div>
              );
            })}
            <IconButton
              aria-label="Delete"
              onClick={() => {
                const cleanedValues = { ...value };
                delete cleanedValues[valueKey];
                handleChange(paramName)({
                  target: {
                    value: cleanedValues,
                  },
                });
              }}
              style={{ width: 48, height: 48 }}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      });

      contentValue = (
        <div
          style={{
            paddingBottom: 24,
            marginBottom: 16,
            fontSize: 16,
            borderBottom: '1px dashed #888',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{inputData.title}</span>
          {renderedInputs}
          <AddNewMultiInputRow
            keyLabel={inputData.inputs[keyField].label}
            onNewRowDefined={(newRowValue) => {
              const emptyRowData = {};
              Object.keys(inputData.inputs)
                .filter((inputIdentifier) => inputIdentifier !== keyField)
                .forEach((inputIdentifier) => {
                  emptyRowData[inputIdentifier] =
                    inputData.inputs[inputIdentifier].default;
                });

              handleChange(paramName)({
                target: {
                  value: {
                    ...value,
                    [newRowValue]: emptyRowData,
                  },
                },
              });
            }}
          />
        </div>
      );
      break;

    case 'boolean':
      contentValue = (
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
      contentValue = (
        <TextField
          id={paramName}
          label={label}
          placeholder={inputData.placeholder}
          multiline
          fullWidth
          rows={5}
          onChange={handleChange(paramName)}
          value={value}
          variant="outlined"
          margin="normal"
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
            <Typography variant="body1">{inputData.elements[key]}</Typography>
          </MenuItem>
        );
      }
      options.unshift(
        <MenuItem key="_EMPTY_VAL_" value="">
          <Typography variant="body1">
            <i>---</i>
          </Typography>
        </MenuItem>
      );
      contentValue = (
        <TextField
          label={label}
          id={paramName}
          select
          fullWidth
          value={value}
          onChange={handleChange(paramName)}
          disabled={disabled}
          variant="outlined"
          margin="normal"
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
        // inputColor = green[600];
        adornment = (
          <Tooltip enterDelay={300} title={nodeTargetDescription}>
            <InputAdornment position="end">
              <Icon>person_pin</Icon>
            </InputAdornment>
          </Tooltip>
        );
      } else if (inputData.type === 'position') {
        // inputColor = amber[600];
        adornment = (
          <Tooltip enterDelay={300} title="Position2D node name or JSON">
            <InputAdornment position="end">
              <Icon>my_location</Icon>
            </InputAdornment>
          </Tooltip>
        );
      } else if (inputData.type === 'positionArray') {
        // inputColor = yellow[600];
        adornment = (
          <Tooltip enterDelay={300} title="NodeNames, separated by comma">
            <InputAdornment position="end">
              <Icon>view_week</Icon>
            </InputAdornment>
          </Tooltip>
        );
      }

      contentValue = (
        <TextField
          id={paramName}
          label={label}
          placeholder={inputData.placeholder}
          onChange={handleChange(paramName)}
          value={value}
          type={inputData.type === 'number' ? 'number' : 'text'}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={disabled}
          InputProps={{
            endAdornment: adornment,
          }}
          inputProps={{
            step: 'any',
          }}
          {...extraParams}
        />
      );
  }

  let returnValue;

  if (inputData.afterSeparator) {
    returnValue = (
      <React.Fragment>
        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 6,
            marginRight: 6,
          }}
        >
          <Typography gutterBottom variant="subtitle1">
            {inputData.afterSeparator}
          </Typography>
          <Divider />
        </div>
        {contentValue}
      </React.Fragment>
    );
  } else {
    returnValue = contentValue;
  }

  if (inputData.tooltip) {
    return (
      <Tooltip title={inputData.tooltip} arrow>
        {returnValue}
      </Tooltip>
    );
  } else {
    return returnValue;
  }
}
