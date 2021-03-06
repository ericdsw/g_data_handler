import React from "react";
import { completionInputSchema } from "../../../../globals";
import { GenericForm } from "../../../elements";

const CompleteConditionForm = (props) => {
  // Parameters
  const {
    completionType = "",
    conditionParams = {},
    name = "",
    buttonText = "Create",
  } = props;

  // Methods
  const { handleSubmit } = props;

  let currentSchema = {};
  if (completionType !== "") {
    currentSchema = completionInputSchema[completionType];
  }

  const initialDataSet = Object.assign(conditionParams, { unique_name: name });

  const onSubmit = (data) => {
    const newData = { ...data };
    delete newData.unique_name;
    handleSubmit(data.unique_name, newData);
  };

  if (completionType === "") {
    return <React.Fragment />;
  }

  return (
    <GenericForm
      initialDataSet={initialDataSet}
      schema={currentSchema}
      buttonText={buttonText}
      handleSubmit={(data) => onSubmit(data)}
    />
  );
};

export default CompleteConditionForm;
