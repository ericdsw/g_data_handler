import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import makeStyles from '@mui/styles/makeStyles';
import {
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';

import { eventSchema } from '../../../../globals';
import {
  createInput,
  checkForRequired,
  parseIn,
  parseOut,
} from '../../../../functions';
import EventTypeDropDown from '../elements/EventTypeDropDown';

import { addSavedNodeTarget } from '../../../../actions/cutsceneActions';

const useStyles = makeStyles((theme) => ({
  additionalText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: 'gray',
  },
}));

const FALLBACK_EVENT_TYPE = 'ability_toggle';

function initialParseFormFields(existingData) {
  if (existingData) {
    return eventSchema[existingData.type].parameters;
  }
  return eventSchema[FALLBACK_EVENT_TYPE].parameters;
}

function initialParseAdditionalText(existingData) {
  if (existingData) {
    return eventSchema[existingData.type].additionalText;
  }
  return eventSchema[FALLBACK_EVENT_TYPE].additionalText;
}

function initialParseResultData(existingData) {
  if (existingData) {
    let usedParameters = {};
    for (const paramName in existingData.parameters) {
      const data = existingData.parameters[paramName];
      if (typeof data === 'object' && data !== null) {
        usedParameters[paramName] = JSON.stringify(data);
      } else {
        usedParameters[paramName] = data;
      }
    }
    return parseIn(usedParameters, eventSchema[existingData.type].parameters);
  }
  return {
    is_important: false,
    ability_name: '',
    enabled: false,
  };
}

const Form = ({
  existingData = null,
  skipRequiredCheck = false,
  creationHandler,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [formFields, updateFormFields] = useState(
    initialParseFormFields(existingData)
  );
  const [additionalText, updateAdditionalText] = useState(
    initialParseAdditionalText(existingData)
  );

  const lockType = useMemo(() => !!existingData, [existingData]);
  const [currentEventType, updateCurrentEventType] = useState(
    existingData ? existingData.type : FALLBACK_EVENT_TYPE
  );
  const [resultData, updateResultData] = useState(
    initialParseResultData(existingData)
  );

  /**
   * Called for each inptu that changes value
   */
  const handleInputChange = useCallback(
    (inputIdentifier) => (event) => {
      let newResultData = { ...resultData };
      if (
        inputIdentifier === 'is_important' ||
        formFields[inputIdentifier].type === 'boolean'
      ) {
        newResultData[inputIdentifier] = event.target.checked;
      } else {
        newResultData[inputIdentifier] = event.target.value;
      }
      updateResultData(newResultData);
    },
    [formFields, resultData]
  );

  /**
   * Memoized rendered fields
   */
  const fields = useMemo(() => {
    let allFields = Object.keys(formFields)
      .filter((paramName) => !formFields[paramName].skipRender)
      .map((paramName) => (
        <React.Fragment key={paramName}>
          {createInput(
            paramName,
            formFields[paramName],
            resultData[paramName],
            handleInputChange,
            false,
            {},
            resultData
          )}
        </React.Fragment>
      ));

    allFields.unshift(
      <FormControlLabel
        key="is_important"
        label="Is Important"
        control={
          <Switch
            checked={resultData['is_important']}
            onChange={handleInputChange('is_important')}
            value={resultData['is_important']}
          />
        }
      />
    );
    return allFields;
  }, [formFields, resultData, handleInputChange]);

  /**
   * Called when the form type changes, will update the rest of the form and the current data.
   *
   * @param {string} newType - The new event type that the form will render
   */
  const handleTypeChange = (newType) => {
    if (!Object.keys(eventSchema).includes(newType)) {
      return;
    }

    const newFormFields = eventSchema[newType].parameters;

    updateFormFields(newFormFields);
    updateAdditionalText(eventSchema[newType].additionalText);
    updateCurrentEventType(newType);

    let resultData = {
      is_important: eventSchema[newType].defaultImportant,
    };
    for (const paramName in newFormFields) {
      if (newFormFields[paramName].required) {
        resultData[paramName] = '';
      } else {
        resultData[paramName] = newFormFields[paramName].default;
      }
    }

    updateResultData(resultData);
  };

  /**
   * Handles the form submit process.
   */
  const submitData = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const eventData = parseOut(resultData, formFields);

    let errorInputs = [];

    for (let paramName in eventData) {
      if (paramName === 'is_important') {
        continue;
      }
      const paramValue = eventData[paramName];
      if (
        !checkForRequired(currentEventType, paramName, paramValue) &&
        !skipRequiredCheck
      ) {
        errorInputs.push(formFields[paramName].label);
      }
    }

    if (errorInputs.length > 0) {
      const errors = errorInputs.join(', ');
      enqueueSnackbar(`The following fields are required: ${errors}`, {
        variant: 'error',
      });
      return;
    }

    /** Save any node target registered on the form */
    Object.keys(eventData).forEach((paramName) => {
      const paramValue = eventData[paramName];
      const inputData = eventSchema[currentEventType]['parameters'][paramName];
      if (inputData && inputData.type === 'node_target') {
        console.log('finna dispatch');
        dispatch(addSavedNodeTarget(paramValue));
      }
    });

    creationHandler({
      type: currentEventType,
      parameters: eventData,
    });
  };

  return (
    <form onSubmit={submitData}>
      {/* Event Type */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EventTypeDropDown
            value={currentEventType}
            onChange={handleTypeChange}
            disabled={lockType}
          />
          <br />
          <Divider />
          <br />
        </Grid>
      </Grid>

      {/* Fields */}
      <Grid container>{fields}</Grid>

      {/** Additional Text */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.additionalText}>
            <i>{additionalText}</i>
          </Typography>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Grid justifyContent="flex-end" container>
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: 8 }}
          color="primary"
        >
          {lockType ? 'Edit Cutscene Event' : 'Add Cutscene Event'}
        </Button>
      </Grid>
    </form>
  );
};

export default Form;
