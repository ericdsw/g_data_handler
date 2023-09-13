import React, { useCallback } from 'react';

import { GenericForm } from '../../../elements';

const schema = {
  additionalText:
    'Will open the pick item prompt, and the player must choose an item that matches any of the conditions defined here',
  parameters: {
    item_conditions: {
      type: 'multi_input_object',
      key_field: 'item_id',
      title: 'Item Conditions',
      inputs: {
        item_id: {
          label: 'Item Id',
          type: 'string',
          required: true,
          tooltip: 'Which item will trigger this action',
          auxStyle: { maxWidth: 120 },
        },
        amount: {
          label: 'Amount',
          type: 'number',
          default: 1,
          tooltip: 'How many of this item do you need',
          auxStyle: { maxWidth: 70 },
        },
        next_action: {
          label: 'Next Action',
          type: 'string',
          required: true,
          tooltip: 'The next interaction',
          placeholder: 'dialogue:dialogue_name OR cutscene:cutscene_file',
          auxStyle: { minWidth: 300 },
        },
        not_enough_action: {
          label: 'Not enough fallback',
          type: 'string',
          default: '',
          tooltip: "What happens if you don't have enough of the item",
          placeholder: 'dialogue:dialogue_name OR cutscene:cutscene_file',
        },
        action: {
          label: 'What to do',
          type: 'dropdown',
          elements: {
            nothing: 'Do Nothing',
            mark_delivered: 'Mark as Delivered',
            delete: 'Substract from Inventory',
          },
          required: true,
          default: 'mark_delivered',
          auxStyle: { maxWidth: 200 },
        },
      },
    },
    cancel_condition: {
      label: 'Cancel Condition',
      type: 'string',
      required: false,
      tooltip:
        'Condition that will be triggered when the user cancels the picker',
      placeholder: 'dialogue:dialogue_name OR cutscene:cutscene_file',
    },
    incorrect_condition: {
      label: 'Incorrect condition',
      type: 'string',
      required: false,
      tooltip:
        'Condition that will be triggered when the user picks an item not present in the list',
      placeholder: 'dialogue:dialogue_name OR cutscene:cutscene_file',
    },
  },
};

const PickItemFromDialogueForm = ({
  data = {},
  buttonText = 'Create',
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (data) => {
      const returnData = {
        ...data,
        type: 'pick_item',
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

export default PickItemFromDialogueForm;
