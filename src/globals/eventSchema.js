const eventSchema = {

    "gain_abilities": {
        name: "Gain Abilities",
        icon: 'offline_bolt',
        defaultImportant: true,
        parameters: {}
    },

    "animation": {
        name: "Animation",
        icon: 'camera_roll',
        defaultImportant: true,
        parameters: {
            object: {
                label: 'Object',
                type: 'text', 
                required: true,
                tooltip: 'The Object that will be animated. Must have an AnimationPlayer'
            },
            animation: {
                label: 'Animation',
                type: 'text', 
                default: 'idle',
                tooltip: 'The animation that will play'
            },
            loop: {
                label: 'Animation Must Loop',
                type: 'boolean', 
                default: false,
                tooltip: 'If true, the animation will loop instead of stopping in the last frame'
            },
            finish_animation: {
                label: 'Finish Animation Name',
                type: 'text', 
                default: '',
                tooltip: 'Will play when the specified animation ends (only if loops is set to false)'
            }
        }
    },

    "battle": {
        name: "Battle",
        icon: 'whatshot',
        defaultImportant: true,
        parameters: {
            map_scene: {
                label: 'Map Scene',
                type: 'text',
                required: true,
                tooltip: 'The map scene in which the battle will take place (full path)'
            },
            enemy_scene: {
                label: 'Enemy Scene',
                type: 'text', 
                required: true,
                tooltip: 'The enemy'
            },
            max_hp: {
                label: 'Enemy Max HP',
                type: 'number', 
                required: true,
                tooltip: 'How much health the enemy will have'
            },
            cutscene_file: {
                label: 'End Cutscene File',
                type: 'text', 
                default: '',
                tooltip: 'If specified, will play this cutscene when the battle finishes'
            },
            win_state_changes: {
                label: 'Win State Changes',
                type: 'json',
                default: '',
                tooltip: 'If specified, a dictionary that maps map aliases with their new state'
            }
        }
    },

    "change_bgm": {
        name: "Change BGM",
        icon: 'music_note',
        defaultImportant: true,
        parameters: {
            BGM: {
                label: 'BGM file name',
                type: 'text', 
                default: '',
                placeholder: 'Leave blank to mute the current BGM',
                tooltip: 'The BGM to play (format: name.ogg). If left blank, the current bgm will stop playing'
            },
            offset: {
                label: 'Start Offset',
                type: 'number', 
                default: 0,
                tooltip: 'At which offset the bgm will start'
            },
            cross_transition: {
                label: 'Should Cross Transition',
                type: 'boolean', 
                default: true,
                tooltip: 'If true, the current BGM will fade into the new bgm'
            }
        }
    },
    "change_enemy": {
        name: 'Change Enemy',
        icon: 'swap_horizontal',
        defaultImportant: true,
        parameters: {
            new_enemy: {
                label: 'New Enemy Scene Name',
                type: 'text', 
                required: true,
                tooltip: 'The new enemy scene (format: Enemy.tscn)'
            },
            new_enemy_animation: {
                label: 'Starting Animation',
                type: 'text', 
                default: 'idle',
                tooltip: 'The animation that the new enemy will use upon entering the battle (will loop)'
            }
        }
    },

    "change_map": {
        name: 'Change Map',
        icon: 'collections',
        defaultImportant: true,
        parameters: {
            map: {
                label: 'Map Scene Path',
                type: 'text', 
                required: true,
                tooltip: 'The full path to the map scene'
            },
            position: {
                label: 'Position In Map',
                type: 'position', 
                required: true,
                tooltip: 'The where the player will appear in the new map. Can be a vector or a nodename'
            },
            peeks: {
                label: 'Peeks',
                type: 'boolean', 
                default: false,
                tooltip: 'If true, the player will not appear in the new map'
            },
            finish_early: {
                label: 'Should Finish Early',
                type: 'boolean', 
                default: false,
                tooltip: 'If true, the event will finish when the screen is still black'
            }
        }
    },

    "change_map_state": {
        name: 'Change Map State',
        icon: 'layers',
        defaultImportant: true,
        parameters: {
            map: {
                label: 'Map Alias',
                type: 'text',
                required: true,
                tooltip: 'The map alias (found in MapNameResolver)'
            },
            state: {
                label: 'New State',
                type: 'text',
                required: true,
                tooltip: 'The new state'
            }
        }
    },

    "overworld_player_state": {
        name: 'Change PlayerOverworld State',
        icon: 'face',
        defaultImportant: true,
        parameters: {
            new_state: {
                label: 'New State',
                type: 'text',
                required: true,
                tooltip: 'The state the player will be at the end of the cutscene'
            }
        }
    },

    "color_flash": {
        name: 'Color Flash',
        icon: 'wb_sunny',
        defaultImportant: true,
        parameters: {
            color_hex: {
                label: 'Color (Hex Value)',
                type: 'text',
                default: '#ffffff',
                tooltip: 'The color that will flash (in hex)'
            },
            in_duration: {
                label: 'In Duration',
                type: 'number',
                default: 0.05,
                tooltip: 'The fade-in duration'
            },
            stay_duration: {
                label: 'Stay Duration',
                type: 'number',
                default: 0,
                tooltip: 'How long the color will stay before fading out'
            },
            out_duration: {
                label: 'Out Duration',
                type: 'number',
                default: 0.05,
                tooltip: 'The fade-out duration'
            },
            covers_ui: {
                label: 'Should Cover UI',
                type: 'boolean',
                default: false,
                tooltip: 'If true, the flash will cover UI elements (ex: the health bar)'
            }
        }
    },

    "conditional_state_change": {
        name: 'Conditional State Change',
        icon: 'developer_board',
        defaultImportant: true,
        parameters: {
            checked_maps: {
                label: 'Maps To Check',
                type: 'json',
                required: true,
                tooltip: 'All of these maps must have the specified states to trigger the change',
                placeholder: '{ UF/r01: "some_state", UF/r02: "some_other_state" }'
            },
            target_maps: {
                label: 'Maps To Change',
                type: 'json',
                required: true,
                tooltip: 'All of the maps that will change states, with their new state',
                placeholder: '{ UF/r05: "new_state", UF/r06: "other_new_state" }'
            },
            is_force_write: {
                label: 'Is Force-Write',
                type: 'boolean',
                default: false,
                tooltip: 'If the change is force-write',
            }
        }
    },

    "jump": {
        name: 'Cutscene Jump',
        icon: 'flight_takeoff',
        defaultImportant: true,
        parameters: {
            jump_name: {
                label: 'Jump Name',
                type: 'text',
                required: true,
                tooltip: 'The jump name (note: must exist in the cutscene_jumps ref, will terminate the current cutscene event)'
            }
        }
    },

    "damage_enemy": {
        name: 'Damage Enemy',
        icon: 'mood_bad',
        defaultImportant: true,
        parameters: {
            amount: {
                label: 'Damage Amount',
                type: 'number',
                default: 1,
                tooltip: 'How much damage the enemy will receive'
            }
        }
    },

    "damage_player": {
        name: 'Damage Player',
        icon: 'mood_bad',
        defaultImportant: true,
        parameters: {
            amount: {
                label: 'Damage Amount',
                type: 'number',
                default: 1,
                tooltip: 'How much damage the player will receive'
            }
        }
    },

    "destroy_object": {
        name: 'Destroy Object',
        icon: 'cancel',
        defaultImportant: true,
        parameters: {
            object: {
                label: 'Object to Destroy',
                type: 'text',
                required: true,
                tooltip: 'The object to be destroyed. is a NODE_TARGET'
            }
        }
    },

    "dialogue": {
        name: 'Dialogue',
        icon: 'chat_bubble',
        defaultImportant: true,
        parameters: {
            file: {
                label: 'JSON file',
                type: 'text',
                required: true,
                tooltip: 'The file that contains the target conversation',
            },
            name: {
                label: 'Conversation Name',
                type: 'text',
                required: true,
                tooltip: 'The conversation name inside the file'
            },
        }
    },

    "exit_battle": {
        name: 'Exit Battle',
        icon: 'exit_to_app',
        defaultImportant: true,
        parameters: {
            finish_early: {
                label: 'Should Finish Early',
                type: 'boolean',
                default: false,
                tooltip: 'If true, the event will finish when the screen is still black'
            },
            custom_return_map: {
                label: 'Custom Return Map Alias',
                type: 'text',
                default: null,
                tooltip: 'If defined, the player will return to this map instead of his previous map'
            },
            custom_return_position: {
                label: 'Custom Return Position',
                type: 'position',
                default: null,
                tooltip: 'If defined, the custom position that the player will return to'
            }
        }
    },

    "give_item": {
        name: 'Give Item',
        icon: 'add_shopping_cart',
        defaultImportant: true,
        parameters: {
            item_type: {
                label: 'Item Type',
                type: 'text',
                default: 'key_item',
                tooltip: 'The type of item'
            },
            item_id: {
                label: 'Item ID',
                type: 'text',
                required: true,
                tooltip: 'The required item id'
            },
            aux_message: {
                label: 'Optional Message',
                type: 'text',
                default: null,
                tooltip: 'Will be displayed after the item is given'
            }
        }
    },

    "next_run": {
        name: 'Go to Next Run',
        icon: 'fast_forward',
        defaultImportant: true,
        parameters: {
            next_run_name: {
                label: 'Next Run',
                type: 'text',
                required: true,
                tooltip: 'The text that identifies the next run'
            }
        }
    },

    "level_up": {
        name: 'Level Up',
        icon: 'star',
        defaultImportant: true,
        parameters: {
            target_level: {
                label: 'Target Level',
                type: 'number',
                default: 1,
                tooltip: 'The target level that will be applied to the player'
            }
        }
    },

    "minigame": {
        name: 'Minigame',
        icon: 'games',
        defaultImportant: true,
        parameters: {
            game: {
                label: 'Minigame Identifier',
                type: 'text',
                required: true,
                tooltip: 'The target game identifier'
            }
        }
    },

    "move_camera": {
        name: 'Move Camera',
        icon: 'switch_camera',
        defaultImportant: true,
        parameters: {
            target: {
                label: 'New Camera Target',
                type: 'text',
                required: true,
                tooltip: 'The new camera target, is a NODE_TARGET'
            },
            transition_duration: {
                label: 'Transition Duration',
                type: 'number',
                default: 1,
                tooltip: 'How long the camera will take to focus on the new target'
            }
        }
    },

    "move": {
        name: 'Move',
        icon: 'directions_walk',
        defaultImportant: true,
        parameters: {
            at_speed: {
                label: 'Movement Speed',
                type: 'number',
                default: 90,
                tooltip: 'How fast the target will move'
            },
            use_time_instead: {
                label: 'Overwrite speed with time',
                type: 'boolean',
                default: false,
                tooltip: 'If true, the speed value will be used as a duration instead'
            },
            control: {
                label: 'Controlled Node',
                type: 'text',
                required: true,
                tooltip: 'The node to move'
            },
            destination: {
                label: 'Destinations',
                type: 'positionArray',
                required: true,
                placeholder:'An array of positions',
                tooltip: 'Where the target will land'
            },
            animates: {
                label: 'Should Animate',
                type: 'boolean',
                default: true,
                tooltip: 'If true, the node will animate when moved'
            },
            dest_elevation: {
                label: 'Final Elevation',
                type: 'number',
                default: '',
                tooltip: 'The final elevation',
            },
            instant_move: {
                label: 'Is Instant Move',
                type: 'boolean',
                default: false,
                tooltip: 'If true, the move will be instantaneous'
            }
        }
    },

    "remove_item": {
        name: 'Remove Item',
        icon: 'remove_shopping_cart',
        defaultImportant: true,
        parameters: {
            item_type: {
                label: 'Item Type',
                type: 'text',
                default: 'key_item',
                tooltip: 'The type of item'
            },
            item_id: {
                label: 'Item ID',
                type: 'text',
                required: true,
                tooltip: 'The item id to remove'
            }
        }
    },

    "save": {
        name: 'Save',
        icon: 'save',
        defaultImportant: true,
        parameters: {
            map_data: {
                label: 'Map Data',
                type: 'json',
                default: null,
                tooltip: 'The map data to save',
                placeholder: '{ "map_name": {"key":"value"} }'
            },
            npc_data: {
                label: 'NPC Data',
                type: 'json',
                default: null,
                tooltip: 'The NPC data to save',
                placeholder: '{ "npc_name": {"map_name": "data"} }'
            },
            player_data: {
                label: 'Player Data',
                type: 'json',
                default: null,
                tooltip: 'The Player data to save',
                placeholder: '{ "key": "value" }'
            }
        }
    },

    "shake": {
        name: 'Shake',
        icon: 'leak_add',
        defaultImportant: true,
        parameters: {
            duration: {
                label: 'Shake Duration',
                type: 'number',
                required: true,
                tooltip: 'How long the shake will last',
            },
            shake_amount: {
                label: 'Shake Strength',
                type: 'number',
                default: 1.0,
                tooltip: 'How strong will the shake be'
            }
        }
    },

    "sound": {
        name: 'Sound',
        icon: 'mic',
        defaultImportant: false,
        parameters: {
            sound: {
                label: 'Sound File Name',
                type: 'text',
                required: true,
                tooltip: 'The file to be played (filename.wav)'
            }
        }
    },

    "spawn_object": {
        name: 'Spawn Object',
        icon: 'library_add',
        defaultImportant: true,
        parameters: {
            object: {
                label: 'Object Scene Full Path',
                type: 'text',
                required: true,
                tooltip: 'The scene to spawn'
            },
            position: {
                label: 'Object Position',
                type: 'position',
                required: true,
                tooltip: 'Where the object will spawn'
            },
            parent: {
                label: 'Parent Object',
                type: 'text',
                default: null,
                tooltip: 'If defined, the object will spawn as a child of this object'
            }
        }
    },

    "toggle_hud": {
        name: 'Toggle HUD',
        icon: 'subtitles',
        defaultImportant: true,
        parameters: {
            should_show: {
                label: 'Should Show',
                type: 'boolean',
                default: false,
                tooltip: 'Whether the hud will show or hide'
            }
        }
    },

    "visible": {
        name: 'Visible',
        icon: 'flip',
        defaultImportant: true,
        parameters: {
            object: {
                label: 'Target Object',
                type: 'text',
                required: true,
                tooltip: 'The object to show or hide',
            },
            visible: {
                label: 'Should Be Visible',
                type: 'boolean',
                default: false,
                tooltip: 'Whether to show or hide the object'
            }
        }
    },

    "wait": {
        name: 'Wait',
        icon: 'timer',
        defaultImportant: true,
        parameters: {
            duration: {
                label: 'Duration',
                type: 'number',
                required: true,
                tooltip: 'How long the wait will be'
            }
        }
    },

    "zoom": {
        name: 'Zoom Camera',
        icon: 'zoom_out_map',
        defaultImportant: true,
        parameters: {
            target_zoom: {
                label: 'Target Zoom',
                type: 'number',
                required: true,
                tooltip: 'The final zoom the camera will use',
            },
            zoom_duration: {
                label: 'Zoom Transition Duration',
                type: 'number',
                required: true,
                tooltip: 'How much time will it take to zoom to the target'
            }
        }
    },

    "ability_toggle": {
        name: 'Ability Toggle',
        icon: 'toggle_on',
        defaultImportant: false,
        parameters: {
            ability_name: {
                label: 'Ability Name',
                type: 'text',
                required: true,
                tooltip: 'The node name of the ability to enable/disable (on either PlayerOverworld or PlayerBattle'
            },
            enabled: {
                label: 'Enabled',
                type: 'boolean',
                default: false,
                tooltip: 'Whether the ability will be enabled or disabled'
            }
        }
    }

}

export default eventSchema;
