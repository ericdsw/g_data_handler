const completionInputSchema = {
  npc_interaction: {
    name: 'NPC Interaction',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        placeholder: 'Must be unique inside the step',
      },
      target_npc: {
        label: 'Target NPC',
        type: 'text',
        required: true,
      },
      target_interaction: {
        label: 'Target Interaction',
        type: 'text',
      },
      in_map: {
        label: 'In Map',
        type: 'text',
      },
    },
  },

  npc_finished_dialogues: {
    name: 'Finish NPC Dialogues',
    parameters: {
      unique_name: {
        label: 'Unique Name',
        type: 'text',
        required: true,
        placeholder: 'Must be unique inside the step',
      },
      target_npc: {
        label: 'Target NPC',
        type: 'text',
        required: true,
      },
      in_map: {
        label: 'In Map',
        type: 'text',
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
        placeholder: 'Must be unique inside the step',
      },
      target_area_name: {
        label: 'Target Area Name',
        type: 'text',
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
        placeholder: 'Must be unique inside the step',
      },
      required_item_id: {
        label: 'Required item ID',
        type: 'text',
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
        placeholder: 'Must be unique inside the step',
      },
      used_item_id: {
        label: 'Used item ID',
        type: 'text',
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
        placeholder: 'Must be unique inside the step',
      },
      choice: {
        label: 'Choice',
        type: 'text',
      },
      conversation: {
        label: 'Conversation',
        type: 'text',
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
        placeholder: 'Must be unique inside the step',
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
        placeholder: 'Must be unique inside the step',
      },
      message: {
        label: 'Message',
        type: 'text',
      },
    },
  },
};

export default completionInputSchema;
