import React from 'react';
import { GenericForm } from '../../../elements';
import { bundleEntityInputSchema } from '../../../../globals';

const CompletionBundleForm = ({
  buttonText = 'Create',
  data = {},
  handleSubmit,
}) => {
  return (
    <GenericForm
      initialDataSet={data}
      schema={bundleEntityInputSchema}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
    />
  );
};

export default CompletionBundleForm;
