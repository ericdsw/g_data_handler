
const completionInputSchema = {

    'npc_interaction': {
        name: 'NPC Interaction',
        parameters: {
            target_npc: {
                label: 'Target NPC',
                type: 'text',
                required: true
            },
            target_interaction: {
                label: 'Target Interaction',
                type: 'text',
            },
            in_map: {
                label: 'In Map',
                type: 'text'
            }
        }
    },

    'npc_finished_dialogues': {
        name: 'Finish NPC Dialogues',
        parameters: {
            target_npc: {
                label: 'Target NPC',
                type: 'text',
                required: true
            },
            in_map: {
                label: 'In Map',
                type: 'text'
            }
        }
    },

    'enter_trigger_area': {
        name: 'Enter Trigger Area',
        parameters: {
            target_area_name: {
                label: 'Target Area Name',
                type: 'text'
            }
        }
    },

    'got_item': {
        name: 'Get Item',
        parameters: {
            required_item_id: {
                label: 'Required item ID',
                type: 'text'
            }
        }
    },

    'item_used': {
        name: 'Use Item',
        parameters: {
            used_item_id: {
                label: 'Used item ID',
                type: 'text'
            }
        }
    },

    'choice_selected': {
        name: 'Select Dialogue Choice',
        parameters: {
            choice: {
                label: 'Choice',
                type: 'text'
            },
            conversation: {
                label: 'Conversation',
                type: 'text'
            }
        }
    },

    'advance_storyline': {
        name: 'Advance Storyline',
        parameters: {
            storyline: {
                label: 'Storyline',
                type: 'text'
            },
            target_step: {
                label: 'Target Step',
                type: 'text'
            }
        }
    },

    'storyline_message': {
        name: 'Storyline Message',
        parameters: {
            message: {
                label: 'Message',
                type: 'text'
            }
        }
    }
}

export default completionInputSchema;
