const itemSemaphoreAdditionalText =
  'At least one required or excluding item must be defined. Note that excluding and missing items do THE SAME THING, they are defined as separate fields due to a misunderstanding, but they ultimately do the same thing.';

const interactionInputSchema = {
  cutscene_interaction: {
    name: 'Cutscene Interaction',
    icon: 'subscriptions',
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      cutscene_file: {
        label: 'Cutscene File',
        type: 'dialogueFile',
        required: true,
        placeholder: 'json file, starting from the cutscenes resource folder',
      },
      required_memory: {
        label: 'Required Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must have already been unlocked',
      },
      excluded_memory: {
        label: 'Excluded Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must not have been unlocked yet',
      },
    },
  },

  dialogue_interaction: {
    name: 'Dialogue Interaction',
    icon: 'question_answer',
    additionalText:
      'Note: not defining a custom name causes offsets to be shared between steps',
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      dialogue_file: {
        label: 'Dialogue File',
        type: 'text',
        required: true,
        placeholder: 'json file, starting from the dialogues resource folder',
        skipRender: true,
      },
      dialogues: {
        label: 'Dialogues',
        type: 'array',
        required: true,
        placeholder: 'Separate each one with a comma',
        skipRender: true,
      },
      dialogueDataBundle: {
        type: 'dialogueJson',
        fileValueKey: 'dialogue_file',
        conversationNameKey: 'dialogues',
        multiple: true,
        inputs: {
          dialogue_file: {
            label: 'Dialogue File',
            type: 'text',
            required: true,
            placeholder:
              'json file, starting from the dialogues resource folder',
          },
          dialogues: {
            label: 'Dialogues',
            type: 'array',
            required: true,
            tooltip: 'separate each one with a comma',
            placecholder: 'foo, foo2',
          },
        },
      },
      required_memory: {
        label: 'Required Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must have already been unlocked',
      },
      excluded_memory: {
        label: 'Excluded Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must not have been unlocked yet',
      },
    },
  },

  give_item_interaction: {
    name: 'Give Item Interaction',
    icon: 'add_shopping_cart',
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      offset: {
        label: 'Offset',
        type: 'number',
        required: true,
        placeholder:
          "Conversation offset that will show the 'got item' message",
      },
      trigger_conversation: {
        label: 'Trigger Conversation',
        type: 'text',
        required: true,
        placeholder: 'Conversation that will give the item to the player',
      },
      item_id: {
        label: 'Item ID',
        type: 'text',
        required: true,
        placeholder: 'Which item will the player be given',
      },
      flavor_text: {
        label: 'Flavor Text',
        type: 'text',
        placeholder: 'Additional text to display after obtaining the item',
      },
      amount: {
        label: 'Amount',
        type: 'number',
        default: 1,
        tooltip: 'How many items to give',
      },
      dialogue_interaction_ref: {
        label: 'Dialogue Interaction Reference',
        type: 'text',
        required: true,
        placeholder:
          'Relative nodepath to the trigger dialogue interaction node',
      },
    },
  },

  item_cutscene_interaction: {
    name: 'Item Cutscene Interaction',
    icon: 'shopping_basket',
    additionalText: itemSemaphoreAdditionalText,
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      cutscene_file: {
        label: 'Cutscene File',
        type: 'dialogueFile',
        required: true,
        placeholder: 'json file, starting from the cutscenes resource folder',
      },
      required_items: {
        label: 'Required Items',
        type: 'array',
        placeholder: 'Items needed to trigger, separate each one with a comma',
        weight: 9,
      },
      loose_required_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, required items are treated as an OR comparison (by default, all must be present)',
        weight: 3,
      },
      excluding_items: {
        label: 'Excluding Items (SAME AS MISSING)',
        type: 'array',
        placeholder:
          'Items that will prevent trigger, separate each one with a comma',
        weight: 9,
      },
      loose_excluding_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, excluding items are treated as an OR comparison (by default, all must be absent)',
        weight: 3,
      },
      missing_items: {
        label: 'Missing Items (SAME AS EXCLUDING)',
        type: 'array',
        placeholder: 'Will only trigger if these items are missing',
        weight: 9,
      },
      loose_missing_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, missing items are treated as an OR comparison (by default, all must be absent)',
        weight: 3,
      },
      required_memory: {
        label: 'Required Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must have already been unlocked',
      },
      excluded_memory: {
        label: 'Excluded Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must not have been unlocked yet',
      },
    },
  },

  item_dialogue_interaction: {
    name: 'Item Dialogue Interaction',
    icon: 'add_comment',
    additionalText: itemSemaphoreAdditionalText,
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      dialogue_file: {
        label: 'Dialogue File',
        type: 'text',
        required: true,
        placeholder: 'json file, starting from the dialogues resource folder',
        skipRender: true,
      },
      dialogues: {
        label: 'Dialogues',
        type: 'array',
        required: true,
        placeholder: 'separate each one with a comma',
        skipRender: true,
      },
      dialogueDataBundle: {
        type: 'dialogueJson',
        fileValueKey: 'dialogue_file',
        conversationNameKey: 'dialogues',
        multiple: true,
        inputs: {
          dialogue_file: {
            label: 'Dialogue File',
            type: 'text',
            required: true,
            placeholder:
              'json file, starting from the dialogues resource folder',
          },
          dialogues: {
            label: 'Dialogues',
            type: 'array',
            required: true,
            tooltip: 'separate each one with a comma',
            placecholder: 'foo, foo2',
          },
        },
      },
      required_items: {
        label: 'Required Items',
        type: 'array',
        placeholder:
          'Items required to trigger, separate each one with a comma',
        weight: 9,
      },
      loose_required_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, required items are treated as an OR comparison (by default, all must be present)',
        weight: 3,
      },
      excluding_items: {
        label: 'Excluding Items (SAME AS MISSING)',
        type: 'array',
        placeholder:
          'Items that will prevent trigger, separate each one with a comma',
        weight: 9,
      },
      loose_excluding_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, excluding items are treated as an OR comparison (by default, all must be absent)',
        weight: 3,
      },
      missing_items: {
        label: 'Missing Items (SAME AS EXCLUDING)',
        type: 'array',
        placeholder: 'Will only trigger if these items are missing',
        weight: 9,
      },
      loose_missing_items: {
        label: 'Use OR',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, missing items are treated as an OR comparison (by default, all must be absent)',
        weight: 3,
      },
      required_memory: {
        label: 'Required Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must have already been unlocked yet',
      },
      excluded_memory: {
        label: 'Excluded Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must not have been unlocked yet',
      },
    },
  },

  remove_item_interaction: {
    name: 'Remove Item Interaction',
    icon: 'remove_shopping_cart',
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      offset: {
        label: 'Offset',
        type: 'number',
        required: true,
        placeholder:
          'Conversatio offset that will remove the item from the inventory',
      },
      trigger_conversation: {
        label: 'Trigger Conversation',
        type: 'text',
        required: true,
        placeholder: 'Which conversation will trigger the remove logic',
      },
      item_id: {
        label: 'Item ID',
        type: 'text',
        required: true,
        placeholder: 'Which item should be removed',
      },
      dialogue_interaction_ref: {
        label: 'Dialogue Interaction Ref',
        type: 'text',
        placeholder:
          'Relative nodepath to the trigger dialogue interaction node',
      },
      only_deliver: {
        label: 'Only deliver',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the item will only be marked as delivered',
      },
    },
  },

  select_item_interaction: {
    name: 'Select Item Interaction',
    icon: 'shopping_basket',
    additionalText:
      'Note: Trigger Interaction overwrites both trigger conversation and dialogue file',
    parameters: {
      custom_name: {
        label: 'Custom Name',
        type: 'text',
        placeholder:
          'Used to identify if this interaction was triggered in a condition',
      },
      triggers_without_items: {
        label: 'Triggers without having required items',
        type: 'boolean',
        default: true,
        tooltip:
          "If false, will not be triggered when the player doesn't have any of the required items",
      },
      dialogue_file: {
        label: 'Dialogue File',
        type: 'text',
        placeholder: 'JSON file, starting from the dialogues resource folder',
      },
      trigger_conversation: {
        label: 'Trigger Conversation',
        type: 'text',
        placeholder: 'Conversation that will trigger the item picker',
      },
      trigger_interaction: {
        label: 'Trigger Interaction',
        type: 'text',
        placeholder:
          'Interaction that will trigger before showing the select item UI',
      },
      fallback_interaction: {
        label: 'Fallback Interaction',
        type: 'text',
        placeholder: 'Interaction to trigger when an invalid item is selected',
      },
      cancel_interaction: {
        label: 'Cancel Interaction',
        type: 'text',
        placeholder: 'Interaction to trigger when the user presses cancel',
      },
      item_bundles: {
        label: 'Item Bundles',
        type: 'array',
        placeholder:
          'Format: item_id:interaction:consumes:amount (separated by comma)',
        helperText:
          'The "consumes" property is either the string "true" or "false", amount should be a number.',
      },
      only_deliver: {
        label: 'Only deliver',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the item will only be marked as delivered',
      },
      required_memory: {
        label: 'Required Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must have already been unlocked',
      },
      excluded_memory: {
        label: 'Excluded Memory',
        type: 'text',
        default: '',
        tooltip: 'If defined, this memory must not have been unlocked',
      },
    },
  },

  save_bed_interaction: {
    name: 'Save Bed Interaction',
    icon: 'bed',
    parameters: {
      offer_flashback_revisit: {
        label: 'Offer flashback revisit',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the flashback selection screen will be shown',
      },
      want_to_sleep_dialogue_file: {
        label: 'Want to sleep dialogue file',
        type: 'text',
        default: 'res://Resources/Data/Cutscenes/Overworld/Misc/sleeping_partial_out.json',
        tooltip: 'The dialogue file that contains the sleep trigger conversation'
      },
      want_to_sleep_conversation: {
        label: 'Want to sleep conversation',
        type: 'text',
        placeholder: 'The conversation that will be triggered when speaking with the bed',
        default: 'b3_infirmary_bed'
      },
      partial_save_cutscene: {
        label: 'Partial save cutscene',
        type: 'text',
        tooltip: 'The cutscene that will be triggered if you CAN revisit a flashback',
        default: 'res://Resources/Data/Cutscenes/Overworld/Misc/sleeping_partial.json',
        helperText: 'The cutscene that will be triggered if you CAN revisit a flashback',
      },
      full_save_cutscene: {
        label: 'Partial save cutscene',
        type: 'text',
        tooltip: 'The cutscene that will be triggered if you CANNOT revisit a flashback (both if it is blocked or if there are none available)',
        default: 'res://Resources/Data/Cutscenes/Overworld/Misc/sleeping.json',
        helperText: 'The cutscene that will be triggered if you CANNOT revisit a flashback (both if it is blocked or if there are none available)',
      }
    },
  },
};

export default interactionInputSchema;
