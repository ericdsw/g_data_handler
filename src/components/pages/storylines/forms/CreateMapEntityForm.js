import React, { useCallback, useMemo } from 'react';
import { storylineEntityInputSchema } from '../../../../globals';
import { GenericForm } from '../../../elements';

const CreateMapEntityForm = ({
  data = {},
  curType = '',
  disabledInputs = [],
  buttonText = 'Create',
  handleSubmit,
}) => {
  const usedSchema = useMemo(
    () => (curType !== '' ? storylineEntityInputSchema[curType] : {}),
    [curType]
  );

  const onSubmit = useCallback(
    (data) => {
      const newData = { ...data };
      delete newData.name;
      delete newData.map_name;

      for (const key in newData) {
        const curType = usedSchema.parameters[key].type;
        if (curType !== 'boolean' && !newData[key]) {
          delete newData[key];
        }
      }

      handleSubmit(data.name, data.map_name, newData);
    },
    [handleSubmit, usedSchema]
  );

  if (curType !== '') {
    return (
      <GenericForm
        initialDataSet={data}
        schema={usedSchema}
        buttonText={buttonText}
        handleSubmit={(data) => onSubmit(data)}
        disabledInputs={disabledInputs}
      />
    );
  }
  return <React.Fragment />;
};

export default CreateMapEntityForm;
