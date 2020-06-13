import React from "react";
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
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, green, yellow, amber } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";

function makeCustomTheme(color) {
  const customTheme = (parentTheme) =>
    createMuiTheme({
      ...parentTheme,
      overrides: {
        ...parentTheme.overrides,
        MuiOutlinedInput: {
          ...parentTheme.overrides.MuiOutlinedInput,
          root: {
            ...parentTheme.overrides.MuiOutlinedInput.root,
            "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
              borderColor: color,
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                borderColor: fade(color, 0.5),
              },
            },
            "&$focused $notchedOutline": {
              borderColor: color,
              borderWidth: 1,
            },
          },
        },
        MuiFormLabel: {
          ...parentTheme.overrides.MuiFormLabel,
          root: {
            ...parentTheme.overrides.MuiFormLabel.root,
            "&$focused": {
              color: color,
            },
          },
        },
        MuiInputAdornment: {
          ...parentTheme.overrides.MuiInputAdornment,
          root: {
            color: color,
          },
        },
      },
    });
  return customTheme;
}

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

export default function createInput(
  paramName,
  inputData,
  value,
  handleChange,
  disabled = false,
  extraParams = {}
) {
  let inputColor = blue[600];

  let label = inputData.label;
  if (inputData.required) {
    label += "*";
  }

  if (value === null || typeof value === "undefined") {
    switch (inputData.type) {
      case "boolean":
        value = inputData.default;
        break;
      case "number":
        const numberVal = parseFloat(inputData.default);
        if (Number.isNaN(numberVal)) {
          value = "";
        } else {
          value = numberVal;
        }
        break;
      default:
        if (!inputData.default) {
          value = "";
        } else {
          value = inputData.default;
        }
        break;
    }
  }

  let contentValue;
  let adornment = <React.Fragment />;

  switch (inputData.type) {
    case "boolean":
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

    case "json":
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

    case "dropdown":
      let options = [];
      for (const key in inputData.elements) {
        options.push(
          <MenuItem key={key} value={key}>
            <Typography variant="body1">{inputData.elements[key]}</Typography>
          </MenuItem>
        );
      }
      if (value === "") {
        options.unshift(
          <MenuItem key="_EMPTY_VAL_" value="">
            <Typography variant="body1">
              <i>---</i>
            </Typography>
          </MenuItem>
        );
      }
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

    case "positionArray":
    case "position":
    case "number":
    case "text":
    case "node_target":
    default:
      if (inputData.type === "node_target") {
        inputColor = green[600];
        adornment = (
          <Tooltip enterDelay={300} title={nodeTargetDescription}>
            <InputAdornment position="end">
              <Icon>person_pin</Icon>
            </InputAdornment>
          </Tooltip>
        );
      } else if (inputData.type === "position") {
        inputColor = amber[600];
        adornment = (
          <Tooltip enterDelay={300} title="Position2D node name or JSON">
            <InputAdornment position="end">
              <Icon>my_location</Icon>
            </InputAdornment>
          </Tooltip>
        );
      } else if (inputData.type === "positionArray") {
        inputColor = yellow[600];
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
          type={inputData.type === "number" ? "number" : "text"}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={disabled}
          InputProps={{
            endAdornment: adornment,
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
