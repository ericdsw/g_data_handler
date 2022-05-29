import React, { useMemo } from 'react';
import { interactionInputSchema } from '../../../../globals';
import { GenericForm } from '../../../elements';

const CreateNPCInteractionForm = ({
  data = {},
  interactionType = '',
  buttonText = 'Create',
  handleSubmit,
}) => {
  const currentSchema = useMemo(
    () =>
      interactionType !== '' ? interactionInputSchema[interactionType] : {},
    [interactionType]
  );

  if (interactionType !== '') {
    return (
      <GenericForm
        initialDataSet={data}
        schema={currentSchema}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
      />
    );
  }
  return <React.Fragment />;
};

export default CreateNPCInteractionForm;
