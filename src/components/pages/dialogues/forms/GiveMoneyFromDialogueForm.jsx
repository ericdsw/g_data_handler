import React, { useCallback } from 'react';
import { GenericForm } from '../../../elements';

const schema = {
  additionalText: 'Will give the provided amount of money to the player',
  parameters: {
    amount: {
      label: 'Amount Given',
      type: 'number',
      required: true,
      tooltip: 'How much money to give',
    },
    custom_message: {
      label: 'Custom Message',
      type: 'text',
      required: false,
      placeholder: 'Got X Amount',
      tooltip:
        'If defined, this message will be used instead of the default one',
    },
  },
};

const GiveMoneyFromDialogueForm = ({
  data = {},
  buttonText = 'Create',
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (data) => {
      const returnData = {
        ...data,
        type: 'give_money',
      };
      onSubmit(returnData);
    },
    [onSubmit]
  );

  return (
    <GenericForm
      initialDataSet={data}
      schema={schema}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
    />
  );
};

export default GiveMoneyFromDialogueForm;
