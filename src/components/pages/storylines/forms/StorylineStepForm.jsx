import React, { useMemo } from 'react';

import { GenericForm } from '../../../elements';

const schema = {
  parameters: {
    name: {
      label: 'Step Name',
      type: 'text',
      required: true,
    },
  },
};

const StorylineStepForm = ({
  stepName = '',
  buttonText = 'Create',
  handleSubmit,
}) => {
  const data = useMemo(() => ({ name: stepName }), [stepName]);

  return (
    <GenericForm
      initialDataSet={data}
      schema={schema}
      buttonText={buttonText}
      handleSubmit={(newData) => handleSubmit(newData.name)}
    />
  );
};

export default StorylineStepForm;
