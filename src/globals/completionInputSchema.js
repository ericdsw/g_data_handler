const completionInputSchema = {
  npc_interaction: {
    name: 'NPC Interaction',
    additionalText: 'Can listen to either an NPC instance, or a GroupInteractionHandler',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step'
      },
      target_npc: {
        label: 'Target NPC',
        type: 'text',
        required: true,
        tooltip: 'Can point to a NPC or a GroupInteractionHandler (by name)'
      },
      target_interaction: {
        label: 'Target Interaction',
        type: 'text',
        tooltip: 'The name of the interaction node that this condition will listen to'
      },
      in_map: {
        label: 'In Map',
        type: 'text',
        tooltip: 'The map where this condition can be triggered'
      },
    },
  },

  npc_finished_dialogues: {
    name: 'Finish NPC Dialogues',
    additionalText: 'Can listen to either an NPC instance, or a GroupInteractionHandler',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      target_npc: {
        label: 'Target NPC',
        type: 'text',
        required: true,
        tooltip: 'Can point to a NPC or a GroupInteractionHandler (by name)'
      },
      in_map: {
        label: 'In Map',
        type: 'text',
        tooltip: 'The map where this condition can be triggered'
      },
    },
  },

  enter_trigger_area: {
    name: 'Enter Trigger Area',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      target_area_name: {
        label: 'Target Area Name',
        type: 'text',
        tooltip: 'The name of the trigger area this condition will listen to'
      },
    },
  },

  got_item: {
    name: 'Get Item',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      required_item_id: {
        label: 'Required item ID',
        type: 'text',
        tooltip: 'The item id that will trigger this condition when received (which is the key in the key_items.json file)'
      },
    },
  },

  item_used: {
    name: 'Use Item',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      used_item_id: {
        label: 'Used item ID',
        type: 'text',
        tooltip: 'The item id that will trigger this condition when used (which is the key in the key_items.json file)'
      },
    },
  },

  choice_selected: {
    name: 'Select Dialogue Choice',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      choice: {
        label: 'Choice',
        type: 'text',
        tooltip: 'The choice key that will trigger this condition'
      },
      conversation: {
        label: 'Conversation',
        type: 'text',
        tooltip: 'The conversation name inside the json file where the choice is located'
      },
    },
  },

  advance_storyline: {
    name: 'Advance Storyline',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      storyline: {
        label: 'Storyline',
        type: 'text',
      },
      target_step: {
        label: 'Target Step',
        type: 'text',
      },
    },
  },

  storyline_message: {
    name: 'Storyline Message',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        helperText: 'Must be unique inside the step',
      },
      message: {
        label: 'Message',
        type: 'text',
        tooltip: 'The storyline message that will be listened. They are normally emited by cutscenes'
      },
    },
  },
};

export default completionInputSchema;
