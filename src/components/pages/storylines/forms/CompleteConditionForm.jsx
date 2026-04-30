import React, { useMemo, useCallback } from 'react';
import { completionInputSchema } from '../../../../globals';
import { GenericForm } from '../../../elements';

const CompleteConditionForm = ({
  completionType = '',
  conditionParams = {},
  name = '',
  buttonText = 'Create',
  handleSubmit,
}) => {
  const currentSchema = useMemo(
    () => (completionType !== '' ? completionInputSchema[completionType] : {}),
    [completionType]
  );

  const initialDataSet = useMemo(
    () => ({
      ...conditionParams,
      unique_name: name,
    }),
    [conditionParams, name]
  );

  const onSubmit = useCallback(
    (data) => {
      const newData = { ...data };
      delete newData.unique_name;
      handleSubmit(data.unique_name, newData);
    },
    [handleSubmit]
  );

  if (completionType === '') {
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
