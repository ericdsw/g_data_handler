import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { Grid, Button, Typography } from "@material-ui/core";
import {
  createInput,
  parseIn,
  parseOut,
  getMissingRequired,
} from "../../functions";

const style = () => ({
  additionalText: {
    color: "grey",
  },
});

const GenericForm = (props) => {
  // Parameters
  const {
    initialDataSet = {},
    schema = {},
    classes,
    buttonText = "Create",
    disabledInputs = [],
    buttonColor = "primary",
  } = props;

  // Methods
  const { handleSubmit, enqueueSnackbar } = props;

  const { parameters, additionalText } = schema;

  const [formData, updateFormData] = useState(
    parseIn({ ...initialDataSet }, parameters)
  );

  const handleInputChange = (inputName) => (event) => {
    const newData = { ...formData };
    newData[inputName] = event.target.value;
    if (parameters[inputName].type === "boolean") {
      newData[inputName] = event.target.checked;
    } else {
      newData[inputName] = event.target.value;
    }

    updateFormData(newData);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const resultData = parseOut(formData, parameters);
    const missingRequired = getMissingRequired(resultData, parameters);

    if (missingRequired.length <= 0) {
      handleSubmit(resultData);
    } else {
      const reqString = missingRequired
        .map((key) => {
          return parameters[key].label;
        })
        .join(", ");
      const eMessage = `The following fields are required: ${reqString}`;
      enqueueSnackbar(eMessage, { variant: "error" });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      {Object.keys(parameters).map((inputName, index) => (
        <React.Fragment key={inputName}>
          {createInput(
            inputName,
            parameters[inputName],
            formData[inputName],
            handleInputChange,
            disabledInputs.includes(inputName),
            index === 0 ? { autoFocus: true } : {}
          )}
        </React.Fragment>
      ))}
      <br />
      <br />
      {additionalText && (
        <Typography variant="body2" className={classes.additionalText}>
          <i>{additionalText}</i>
        </Typography>
      )}
      <Grid container justify="flex-end">
        <Button variant="contained" color={buttonColor} type="submit">
          {buttonText}
        </Button>
      </Grid>
    </form>
  );
};

export default withStyles(style)(withSnackbar(GenericForm));
