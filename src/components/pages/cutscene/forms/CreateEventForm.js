import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { withSnackbar } from 'notistack';
import {
  TextField,
  Icon,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Autocomplete,
  Box
} from '@mui/material';

import { eventSchema } from '../../../../globals';
import {
  createInput,
  checkForRequired,
  parseIn,
  parseOut,
} from '../../../../functions';

const styles = (theme) => ({
  errorMessage: {
    backgroundColor: theme.palette.error.dark,
  },
  close: {
    padding: theme.spacing(0.5),
  },
  additionalText: {
    color: 'grey',
    marginTop: 12,
    marginBottom: 12,
  },
});

class CreateEventForm extends React.Component {
  formFields = eventSchema['ability_toggle'].parameters;
  additionalText = eventSchema['ability_toggle'].additionalText;

  constructor(props) {
    super(props);
    if (props.existingData) {
      let usedParameters = {};
      for (const paramName in props.existingData.parameters) {
        const data = props.existingData.parameters[paramName];
        if (typeof data === 'object' && data !== null) {
          usedParameters[paramName] = JSON.stringify(data);
        } else {
          usedParameters[paramName] = data;
        }
      }
      this.formFields = eventSchema[props.existingData.type].parameters;
      this.state = {
        lockType: true,
        currentEventType: props.existingData.type,
        resultData: parseIn(usedParameters, this.formFields),
      };
      this.additionalText = eventSchema[props.existingData.type].additionalText;
    } else {
      this.state = {
        lockType: false,
        currentEventType: 'ability_toggle',
        resultData: {
          is_important: false,
          ability_name: '',
          enabled: false,
        },
      };
    }
  }

  handleTypeChange = (newType) => {
    this.formFields = eventSchema[newType].parameters;
    this.additionalText = eventSchema[newType].additionalText;

    let resultData = {
      is_important: eventSchema[newType].defaultImportant,
    };

    for (const paramName in this.formFields) {
      if (this.formFields[paramName].required) {
        resultData[paramName] = '';
      } else {
        resultData[paramName] = this.formFields[paramName].default;
      }
    }

    this.setState({
      currentEventType: newType,
      resultData: resultData,
    });
  };

  handleInputChange = (inputIdentifier) => (event) => {
    let newResultData = { ...this.state.resultData };
    if (
      inputIdentifier === 'is_important' ||
      this.formFields[inputIdentifier].type === 'boolean'
    ) {
      newResultData[inputIdentifier] = event.target.checked;
    } else {
      newResultData[inputIdentifier] = event.target.value;
    }
    this.setState({
      currentEventType: this.state.currentEventType,
      resultData: newResultData,
    });
  };

  submitData = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const eventData = parseOut({ ...this.state.resultData }, this.formFields);

    let errorInputs = [];
    const eventType = this.state.currentEventType;
    for (let paramName in eventData) {
      if (paramName === 'is_important') {
        continue;
      }
      const paramValue = eventData[paramName];
      if (!checkForRequired(eventType, paramName, paramValue)) {
        errorInputs.push(this.formFields[paramName].label);
      }
    }

    if (errorInputs.length > 0) {
      const errors = errorInputs.join(', ');
      this.props.enqueueSnackbar(
        `The following fields are required: ${errors}`,
        { variant: 'error' }
      );
    } else {
      let cutsceneData = {
        type: this.state.currentEventType,
        parameters: eventData,
      };
      this.props.creationHandler(cutsceneData);
    }
  };

  render() {
    let fields = [];

    /**
     * Use a separate reference, as sort does not return the sorted output as
     * a "chainable" method.
     */
    const sortedKeys = Object.keys(eventSchema).sort();

    fields.push(
      <FormControlLabel
        key="is_important"
        label="Is Important"
        control={
          <Switch
            checked={this.state.resultData['is_important']}
            onChange={this.handleInputChange('is_important')}
            value={this.state.resultData['is_important']}
          />
        }
      />
    );

    for (const paramName in this.formFields) {
      const currentParamData = this.formFields[paramName];

      const constructedFormField = createInput(
        paramName,
        currentParamData,
        this.state.resultData[paramName],
        this.handleInputChange
      );

      fields.push(
        <React.Fragment key={paramName}>{constructedFormField}</React.Fragment>
      );
    }

    return (
      <form onSubmit={this.submitData}>
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              id="event_type_select"
              options={sortedKeys}
              autoHighlight
              getOptionLabel={option => eventSchema[option].name}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Icon sx={{ marginRight: 2 }}>{eventSchema[option].icon}</Icon>
                  <Typography>{eventSchema[option].name}</Typography>
                </Box>
              )}
              value={this.state.currentEventType}
              onChange={(_, val) => this.handleTypeChange(val)}
              clearOnBlur
              clearOnEscape
              disableClearable
              renderInput={params => (
                <TextField
                  {...params}
                  label="Event Type"
                  fullWidth
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autocomplete: 'new-password'
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        
        <Grid container>{fields}</Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              className={this.props.classes.additionalText}
            >
              <i>{this.additionalText}</i>
            </Typography>
          </Grid>
        </Grid>
        <Grid justifyContent="flex-end" container>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: 8 }}
            color="primary"
            onClick={this.showData}
          >
            {this.state.lockType ? 'Edit Cutscene Event' : 'Add Cutscene Event'}
          </Button>
        </Grid>
      </form>
    );
  }
}

export default withSnackbar(withStyles(styles)(CreateEventForm));
