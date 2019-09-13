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

    'create_area': {
        name: 'Create Area',
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
    }
}
export default storylineEntityInputSchema;
