import { useMemo, useCallback } from 'react';
import { completionInputSchema } from '@/globals';
import { GenericForm } from '@/components/elements';

type CompleteConditionFormProps = {
  completionType?: string,
  conditionParams?: { [key: string]: any },
  name?: string,
  buttonText?: string,
  handleSubmit: (uniqueName: string, newData: { [key: string]: any }) => void,
}

const CompleteConditionForm = ({
  completionType = '',
  conditionParams = {},
  name = '',
  buttonText = 'Create',
  handleSubmit,
}: CompleteConditionFormProps) => {
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
    return <></>;
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
