import React, { useCallback } from 'react';

import { GenericForm } from '../../../elements';

const schema = {
  additionalText:
    'Will give the item to the player, with the prompt and all that jazz',
  parameters: {
    item_id: {
      label: 'Item Id',
      type: 'string',
      required: true,
      tooltip: 'Which item will be given (only key items)',
    },
    custom_message: {
      label: 'Custom Message',
      type: 'text',
      required: false,
      placeholder: 'Got X Amount',
      tooltip:
        'If defined, this message will be used instead of the default one',
    },
    flavor_message: {
      label: 'Flavor Message',
      type: 'text',
      required: false,
      placeholder: 'This is the inner monologue',
      tooltip:
        'If defined, will be shown after either the default or the custom message',
    },
    amount: {
      label: 'Amount',
      type: 'number',
      default: 1,
      tooltip: 'How many will be given',
    },
    show_fanfare: {
      label: 'Show Fanfare',
      type: 'boolean',
      default: true,
      tooltip: 'Whether the fanfare will be shown',
    },
  },
};

const GiveItemFromDialogueForm = ({
  data = {},
  buttonText = 'Create',
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (data) => {
      const returnData = {
        ...data,
        amount: data.amount || 1,
        type: 'give_item',
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

export default GiveItemFromDialogueForm;
