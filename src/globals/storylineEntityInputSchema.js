const storylineEntityInputSchema = {

    'create_npc': {
        name: 'Create NPC',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'In Map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial position',
                type: 'text',
                required: true
            },
            resource_path: {
                label: 'Resource Path',
                type: 'text',
                required: true
            },
            animation: {
                label: 'Animation',
                type: 'text'
            },
            faces_player: {
                label: 'Faces Player',
                type: 'boolean'
            },
            facing_direction: {
                label: 'Facing Direction',
                type: 'dropdown',
                elements: {
                    up: 'Up',
                    down: 'Down',
                    left: 'Left',
                    right: 'Right'
                }
            }
        }
    },

    'configure_npc': {
        name: 'Configure NPC',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'Will appear in map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial position',
                type: 'text',
            },
            animation: {
                label: 'Animation',
                type: 'text'
            },
            faces_player: {
                label: 'Faces Player',
                type: 'boolean'
            },
            facing_direction: {
                label: 'Facing Direction',
                type: 'dropdown',
                elements: {
                    up: 'Up',
                    down: 'Down',
                    left: 'Left',
                    right: 'Right'
                }
            }
        }
    },

    'create_door': {
        name: 'Create Door',
        additionalText: 'If target_map is defined, target_position is required (and vice-versa)',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'In Map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial position',
                type: 'text',
                required: true
            },
            resource_path: {
                label: 'Resource Path',
                type: 'text',
                required: true
            },
            animation: {
                label: 'Animation',
                type: 'text'
            },
            faces_player: {
                label: 'Faces Player',
                type: 'boolean'
            },
            facing_direction: {
                label: 'Facing Direction',
                type: 'dropdown',
                elements: {
                    up: 'Up',
                    down: 'Down',
                    left: 'Left',
                    right: 'Right'
                }
            },
            target_map: {
                label: 'Target Map',
                type: 'text',
            },
            target_position: {
                label: 'Target Position',
                type: 'text',
            },
            is_locked: {
                label: 'Is Locked',
                type: 'boolean',
                default: false
            }
        }
    },

    'configure_door': {
        name: 'Configure Door',
        additionalText: 'If target_map is defined, target_position is required (and vice-versa)',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'Will appear in map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial position',
                type: 'text',
            },
            animation: {
                label: 'Animation',
                type: 'text'
            },
            faces_player: {
                label: 'Faces Player',
                type: 'boolean'
            },
            facing_direction: {
                label: 'Facing Direction',
                type: 'dropdown',
                elements: {
                    up: 'Up',
                    down: 'Down',
                    left: 'Left',
                    right: 'Right'
                }
            },
            target_map: {
                label: 'Target Map',
                type: 'text',
            },
            target_position: {
                label: 'Target Position',
                type: 'text',
            },
            is_locked: {
                label: 'Is Locked',
                type: 'boolean',
                default: false
            }
        }
    },

    'create_area': {
        name: 'Create Notification Area',
        additional_text: 'Will only notify when the player enters, nothing more',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'Will appear in map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial Position',
                type: 'text',
                required: true
            }
        }
    },

    'create_dialogue_area': {
        name: 'Create Dialogue Area',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'Will appear in map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial Position',
                type: 'text',
                required: true
            },
            dialogue_file: {
                label: 'Dialogue file',
                type: 'text',
                required: true,
                placeholder: 'json file, starting from the dialogues resource folder'
            },
            message: {
                label: 'Message',
                type: 'text',
                required: true
            }
        }
    },

    'create_cutscene_area': {
        name: 'Create Cutscene Area',
        parameters: {
            name: {
                label: 'NPC Name',
                type: 'text',
                required: true
            },
            map_name: {
                label: 'Will appear in map',
                type: 'text',
                required: true
            },
            initial_position: {
                label: 'Initial Position',
                type: 'text',
                required: true
            },
            cutscene_file: {
                label: 'Cutscene File',
                type: 'text',
                require: true,
                placeholder: 'json file, starting from the cutscenes resource folder'
            }
        }
    }

}
export default storylineEntityInputSchema;
