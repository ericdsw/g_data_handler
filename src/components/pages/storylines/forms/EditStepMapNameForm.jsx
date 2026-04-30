import React from 'react';
import { GenericForm } from '../../../elements';

const schema = {
  parameters: {
    map_name: {
      label: 'Map Name',
      type: 'string',
      required: true,
      tooltip: 'The map name',
    },
  },
};

const defaultData = {
  map_name: '',
};

const EditStepMapNameForm = ({ data = defaultData, handleSubmit }) => (
  <GenericForm
    initialDataSet={data}
    schema={schema}
    handleSubmit={handleSubmit}
    buttonText="Edit Map Name"
  />
);

export default EditStepMapNameForm;
