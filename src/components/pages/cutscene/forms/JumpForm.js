import React from 'react';
import { GenericForm } from "../../../elements";

const schema = {
  parameters: {
    jump_name: {
      label: "Jump Name",
      type: "string",
      required: true,
      tooltip: "The jump's unique identifier (in this file)"
    },
    jump_file: {
      label: "Target Cutscene File",
      type: "string",
      required: true,
      tooltip: "The cutscene that will be fired with this jump"
    }
  }
}

const defaultData = {
  jump_name: "",
  jump_file: "",
}

const JumpForm = ({
  data = defaultData,
  buttonText = "Add Jump",
  isEdit = false,
  handleSubmit,
}) => {

  return (
    <GenericForm
      initialDataSet={data}
      schema={schema}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      disabledInputs={isEdit ? ["jump_name"] : []}
    />
  );
}

export default JumpForm;