import React from 'react';
import { GenericForm } from '../../../elements';

const schema = {
  parameters: {
    template_name: {
      label: 'New Template Name',
      type: 'string',
      required: true,
    },
  },
};

const defaultData = {
  template_name: '',
};

const UpdateTemplateNameForm = ({ data = defaultData, handleSubmit }) => (
  <GenericForm
    initialDataSet={data}
    schema={schema}
    handleSubmit={handleSubmit}
    buttonText="Edit Template Name"
  />
);

export default UpdateTemplateNameForm;
