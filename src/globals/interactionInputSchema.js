
const interactionInputSchema = {

    'cutscene_interaction': {

        name: 'Cutscene Interaction',
        icon: 'subscriptions',
        parameters: {
            custom_name: { 
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            cutscene_file: { 
                label: 'Cutscene File',
                type: 'text',
                required: true,
                placeholder: 'json file, starting from the cutscenes resource folder'
            }
        }
    },

    'dialogue_interaction': {

        name: 'Dialogue Interaction',
        icon: 'question_answer',
        parameters: {
            custom_name: { 
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            dialogue_file: { 
                label: 'Dialogue File',
                type: 'text',
                required: true,
                placeholder: 'json file, starting from the dialogues resource folder'
            },
            dialogues: { 
                label: 'Dialogues',
                type: 'array',
                required: true,
                placeholder: 'Separate each one with a comma'
            }
        }
    },

    'give_item_interaction': {

        name: 'Give Item Interaction',
        icon: 'add_shopping_cart',
        parameters: {
            custom_name: { 
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            offset: { 
                label: 'Offset',
                type: 'number',
                required: true,
                placeholder: 'Conversation offset that will show the \'got item\' message'
            },
            trigger_conversation: { 
                label: 'Trigger Conversation',
                type: 'text',
                required: true,
                placeholder: 'Conversation that will give the item to the player'
            },
            item_id: { 
                label: 'Item ID',
                type: 'text',
                required: true,
                placeholder: 'Which item will the player be given'
            },
            flavor_text: { 
                label: 'Flavor Text',
                type: 'text',
                placeholder: 'Additional text to display after obtaining the item'
            },
            dialogue_interaction_ref: { 
                label: 'Dialogue Interaction Reference',
                type: 'text',
                required: true,
                placeholder: 'Relative nodepath to the trigger dialogue interaction node'
            }
        }
    },

    'item_cutscene_interaction': {

        name: 'Item Cutscene Interaction',
        icon: 'shopping_basket',
        additionalText: 'At least one required or excluding item must be defined',
        parameters: {
            custom_name: {
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            cutscene_file: { 
                label: 'Cutscene File',
                type: 'text',
                required: true,
                placeholder: 'json file, starting from the cutscenes resource folder'
            },
            required_items: {
                label: 'Required Items',
                type: 'array',
                placeholder: 'Items needed to trigger, separate each one with a comma'
            },
            excluding_items: { 
                label: 'Excluding Items',
                type: 'array',
                placeholder: 'Items that will prevent trigger, separate each one with a comma'
            }
        }
    },

    'item_dialogue_interaction': {

        name: 'Item Dialogue Interaction',
        icon: 'add_comment',
        additionalText: 'At least one required or excluding item must be defined',
        parameters: {
            custom_name: { 
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            dialogue_file: { 
                label: 'Dialogue File',
                type: 'text',
                required: true,
                placeholder: 'json file, starting from the dialogues resource folder'
            },
            dialogues: { 
                label: 'Dialogues',
                type: 'array',
                required: true,
                placeholder: 'separate each one with a comma'
            },
            required_items: { 
                label: 'Required Items',
                type: 'array',
                placeholder: 'Items required to trigger, separate each one with a comma'
            },
            excluding_items: {
                label: 'Excluding Items',
                type: 'array',
                placeholder: 'Items that will prevent trigger, separate each one with a comma'
            }
        }
    },

    'remove_item_interaction': {

        name: 'Remove Item Interaction',
        icon: 'remove_shopping_cart',
        parameters: {
            custom_name: {
                label: 'Custom Name',
                type: 'text',
                placeholder: 'Used to identify if this interaction was triggered in a condition'
            },
            offset: {
                label: 'Offset',
                type: 'number',
                required: true,
                placeholder: 'Conversatio offset that will remove the item from the inventory'
            },
            trigger_conversation: {
                label: 'Trigger Conversation',
                type: 'text',
                required: true,
                placeholder: 'Which conversation will trigger the remove logic'
            },
            item_id: {
                label: 'Item ID',
                type: 'text',
                required: true,
                placeholder: 'Which item should be removed'
            },
            dialogue_interaction_ref: {
                label: 'Dialogue Interaction Ref',
                type: 'text',
                placeholder: 'Relative nodepath to the trigger dialogue interaction node'
            }
        }
    }

};

export default interactionInputSchema;
