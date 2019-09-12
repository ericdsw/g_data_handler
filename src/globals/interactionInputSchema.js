
const interactionInputSchema = {

    'cutscene_interaction': {

        name: 'Cutscene Interaction',
        icon: 'subscriptions',
        parameters: {
            unique_name: { 
                label: 'Unique Name',
                type: 'text',
            },
            cutscene_file: { 
                label: 'Cutscene File',
                type: 'text',
                required: true
            }
        }
    },

    'dialogue_interaction': {

        name: 'Dialogue Interaction',
        icon: 'question_answer',
        parameters: {
            unique_name: { 
                label: 'Unique Name',
                type: 'text',
            },
            dialogue_file: { 
                label: 'Dialogue File',
                type: 'text',
                required: true,
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
            unique_name: { 
                label: 'Unique Name',
                type: 'text'
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
            unique_name: {
                label: 'Unique Name',
                type: 'text'
            },
            cutscene_file: { 
                label: 'Cutscene File',
                type: 'text',
                required: true
            },
            required_items: {
                label: 'Required Items',
                type: 'array',
                placeholder: 'Separate each one with a comma'
            },
            excluding_items: { 
                label: 'Excluding Items',
                type: 'array',
                placeholder: 'Separate each one with a comma'
            }
        }
    },

    'item_dialogue_interaction': {

        name: 'Item Dialogue Interaction',
        icon: 'add_comment',
        additionalText: 'At least one required or excluding item must be defined',
        parameters: {
            unique_name: { 
                label: 'Unique Name',
                type: 'text'
            },
            dialogue_file: { 
                label: 'Dialogue File',
                type: 'text',
                required: true
            },
            dialogues: { 
                label: 'Dialogues',
                type: 'text',
                required: true
            },
            required_items: { 
                label: 'Required Items',
                type: 'array',
                placeholder: 'Separate each one with a comma'
            },
            excluding_items: {
                label: 'Excluding Items',
                type: 'array',
                placeholder: 'Separate each one with a comma'
            }
        }
    },

    'remove_item_interaction': {

        name: 'Remove Item Interaction',
        icon: 'remove_shopping_cart',
        parameters: {
            unique_name: {
                label: 'Unique Name',
                type: 'text'
            },
            offset: {
                label: 'Offset',
                type: 'number',
                required: true,
            },
            trigger_conversation: {
                label: 'Trigger Conversation',
                type: 'text',
                required: true
            },
            item_id: {
                label: 'Item ID',
                type: 'text',
                required: true
            },
            dialogue_interaction_ref: {
                label: 'Dialogue Interaction Ref',
                type: 'text'
            }
        }
    }

};

export default interactionInputSchema;
