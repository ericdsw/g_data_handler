import React, { useCallback } from "react";

import { GenericForm } from "../../../elements";

const schema = {
  additionalText:
    "Will open the pick item prompt, and the player must choose an item that matches any of the conditions defined here",
  parameters: {
    item_conditions: {
      type: "multi_input_object",
      key_field: "item_id",
      title: "Item Conditions",
      inputs: {
        item_id: {
          label: "Item Id",
          type: "string",
          required: true,
          tooltip: "Which item will trigger this action",
        },
        next_action: {
          label: "Next Action",
          type: "string",
          required: true,
          tooltip: "The next interaction",
          placeholder: "dialogue:dialogue_name OR cutscene:cutscene_file",
        },
        action: {
          label: "What to do",
          type: "dropdown",
          elements: {
            nothing: "Do Nothing",
            mark_delivered: "Mark as Delivered",
            delete: "Destroy",
          },
          required: true,
          default: "mark_delivered",
        },
      },
    },
    cancel_condition: {
      label: "Cancel Condition",
      type: "string",
      required: false,
      tooltip:
        "Condition that will be triggered when the user cancels the picker",
      placeholder: "dialogue:dialogue_name OR cutscene:cutscene_file",
    },
    incorrect_condition: {
      label: "Incorrect condition",
      type: "string",
      required: false,
      tooltip:
        "Condition that will be triggered when the user picks an item not present in the list",
      placeholder: "dialogue:dialogue_name OR cutscene:cutscene_file",
    },
  },
};

const PickItemFromDialogueForm = ({
  data = {},
  buttonText = "Create",
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (data) => {
      const returnData = {
        ...data,
        type: "pick_item",
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
