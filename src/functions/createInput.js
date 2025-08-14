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
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RestartAlt } from '@mui/icons-material';

import AddNewMultiInputRow from '../components/elements/AddNewMultiInputRow';
import CompositeDialogueFileInput from '../components/elements/CompositeDialogueFileInput';
import CutsceneFileSearcher from '../components/elements/CutsceneFileSearcher';
import NodeTargetField from '../components/elements/NodeTargetField';

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
  extraParams = {},
  completeFormValues = {}
) {
  let label = inputData.label;
  if (inputData.required) {
    label += '*';
  }

  let booleanFieldIsDirty = true;

  if (value === null || typeof value === 'undefined') {
    switch (inputData.type) {
      case 'boolean':
        booleanFieldIsDirty = false;
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

  // If defined, will be displayed under the text as an additional "helper" tip.
  const helperText = inputData.helperText || '';

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
                    ...(inputData.inputs[inputIdentifier].auxStyle || {}),
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
        <Grid container alignItems="center">
          <Grid item xs>
            <FormControlLabel
              label={label}
              style={{
                opacity: booleanFieldIsDirty || inputData.required ? 1.0 : 0.5,
              }}
              control={
                <Switch
                  onChange={handleChange(paramName)}
                  checked={value}
                  value={value}
                  disabled={disabled}
                />
              }
            />
          </Grid>
          {booleanFieldIsDirty && (
            <IconButton
              onClick={() => {
                // Look away God
                handleChange(paramName)({ target: { checked: undefined } });
              }}
              size="large"
            >
              <RestartAlt />
            </IconButton>
          )}
        </Grid>
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
          helperText={helperText}
          {...extraParams}
        />
      );
      break;

    case 'dialogueJson':
      const fileInputData = inputData.inputs[inputData.fileValueKey];
      const conversationInputData =
        inputData.inputs[inputData.conversationNameKey];

      const fileInputValue = completeFormValues[inputData.fileValueKey];
      const conversationInputValue =
        completeFormValues[inputData.conversationNameKey];

      contentValue = (
        <CompositeDialogueFileInput
          fileLabel={fileInputData.label}
          conversationNameLabel={conversationInputData.label}
          fileValue={fileInputValue}
          conversationNameValue={conversationInputValue}
          fileOnChange={handleChange(inputData.fileValueKey)}
          conversationNameOnChange={handleChange(inputData.conversationNameKey)}
          multiple={inputData.multiple}
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

    case 'dialogueFile':
      contentValue = (
        <CutsceneFileSearcher
          label={label}
          onChange={handleChange(paramName)}
          value={value}
        />
      );
      break;

    case 'node_target':
      contentValue = (
        <NodeTargetField
          label={label}
          value={value}
          onChange={handleChange(paramName)}
        />
      );
      break;

    case 'positionArray':
    case 'position':
    case 'number':
    case 'text':
    default:
      if (inputData.type === 'position') {
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
          helperText={helperText}
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
          <Typography gutterBottom variant="h6">
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
