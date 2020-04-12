import React from "react";
import { GenericForm } from "../../../elements";

const schema = {
  parameters: {
    name: {
      label: "Step Name",
      type: "text",
      required: true,
    },
  },
};

const StorylineStepForm = (props) => {
  const { stepName = "", buttonText = "Create" } = props;
  const { handleSubmit } = props;

  const data = { name: stepName };

  return (
    <GenericForm
      initialDataSet={data}
      schema={schema}
      buttonText={buttonText}
      handleSubmit={(data) => handleSubmit(data.name)}
    />
  );
};

export default StorylineStepForm;
