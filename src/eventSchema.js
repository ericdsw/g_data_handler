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
                type: 'text', 
                required: true,
                tooltip: 'The Object that will be animated. Must have an AnimationPlayer'
            },
            animation: {
                type: 'text', 
                default: 'idle',
                tooltip: 'The animation that will play'
            },
            loop: {
                type: 'boolean', 
                default: false,
                tooltip: 'If true, the animation will loop instead of stopping in the last frame'
            },
            finish_animation: {
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
                type: 'text',
                required: true,
                tooltip: 'The map scene in which the battle will take place (full path)'
            },
            enemy_scene: {
                type: 'text', 
                required: true,
                tooltip: 'The enemy'
            },
            max_hp: {
                type: 'number', 
                required: true,
                tooltip: 'How much health the enemy will have'
            },
            cutscene_file: {
                type: 'text', 
                default: '',
                tooltip: 'If specified, will play this cutscene when the battle finishes'
            },
            // PENDING: win_state_changes
        }
    },
    "change_bgm": {
        name: "Change BGM",
        icon: 'music_note',
        defaultImportant: true,
        parameters: {
            BGM: {
                type: 'text', 
                default: '',
                tooltip: 'The BGM to play (format: name.ogg). If left blank, the current bgm will stop playing'
            },
            offset: {
                type: 'number', 
                default: 0,
                tooltip: 'At which offset the bgm will start'
            },
            cross_transition: {
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
                type: 'text', 
                required: true,
                tooltip: 'The new enemy scene (format: Enemy.tscn)'
            },
            new_enemy_animation: {
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
                type: 'text', 
                required: true,
                tooltip: 'The full path to the map scene'
            },
            position: {
                type: 'position', 
                required: true,
                tooltip: 'The where the player will appear in the new map. Can be a vector or a nodename'
            },
            peeks: {
                type: 'boolean', 
                default: false,
                tooltip: 'If true, the player will not appear in the new map'
            },
            finish_early: {
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
                type: 'text',
                required: true,
                tooltip: 'The map alias (found in MapNameResolver)'
            },
            state: {
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
                type: 'text',
                default: '#ffffff',
                tooltip: 'The color that will flash (in hex)'
            },
            in_duration: {
                type: 'number',
                default: 0.05,
                tooltip: 'The fade-in duration'
            },
            stay_duration: {
                type: 'number',
                default: 0,
                tooltip: 'How long the color will stay before fading out'
            },
            out_duration: {
                type: 'number',
                default: 0.05,
                tooltip: 'The fade-out duration'
            },
            covers_ui: {
                type: 'boolean',
                default: false,
                tooltip: 'If true, the flash will cover UI elements (ex: the health bar)'
            }
        }
    },
    "conditional_state_change": {
        name: 'Conditional State Change',
        icon: 'developer_board'
        //TODO: finish
    },
    "jump": {
        name: 'Cutscene Jump',
        icon: 'flight_takeoff',
        defaultImportant: true,
        parameters: {
            jump_name: {
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
                type: 'text',
                required: true,
                tooltip: 'The file that contains the target conversation',
            },
            name: {
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
                type: 'boolean',
                default: false,
                tooltip: 'If true, the event will finish when the screen is still black'
            },
            custom_return_map: {
                type: 'text',
                default: null,
                tooltip: 'If defined, the player will return to this map instead of his previous map'
            },
            custom_return_position: {
                type: 'position',
                default: null,
                tooltip: 'If defined, the custom position that the player will return to'
            }
        }
    },
    "game_over": {
        name: 'Game Over',
        icon: 'indeterminate_check_box'
        //TODO: unused
    },
    "give_item": {
        name: 'Give Item',
        icon: 'add_shopping_cart',
        defaultImportant: true,
        parameters: {
            item_type: {
                type: 'text',
                default: 'key_item',
                tooltip: 'The type of item'
            },
            item_id: {
                type: 'text',
                required: true,
                tooltip: 'The required item id'
            }
        }
    },
    "next_run": {
        name: 'Go to Next Run',
        icon: 'fast_forward',
        defaultImportant: true,
        parameters: {
            next_run_name: {
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
                type: 'text',
                required: true,
                tooltip: 'The new camera target, is a NODE_TARGET'
            },
            transition_duration: {
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
            //TODO: finish
        }
    },
    "remove_item": {
        name: 'Remove Item',
        icon: 'remove_shopping_cart',
        defaultImportant: true,
        parameters: {
            item_type: {
                type: 'text',
                default: 'key_item',
                tooltip: 'The type of item'
            },
            item_id: {
                type: 'text',
                required: true,
                tooltip: 'The item id to remove'
            }
        }
    },
    "save": {
        name: 'Save',
        icon: 'save',
        //TODO: finish
    },
    "shake": {
        name: 'Shake',
        icon: 'leak_add',
        defaultImportant: true,
        parameters: {
            duration: {
                type: 'number',
                required: true,
                tooltip: 'How long the shake will last',
            },
            shake_amount: {
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
                type: 'text',
                required: true,
                tooltip: 'The scene to spawn'
            },
            position: {
                type: 'position',
                required: true,
                tooltip: 'Where the object will spawn'
            },
            parent: {
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
            type: 'boolean',
            default: false,
            tooltip: 'Whether the hud will show or hide'
        }
    },
    "visible": {
        name: 'Visible',
        icon: 'flip',
        defaultImportant: true,
        parameters: {
            object: {
                type: 'text',
                required: true,
                tooltip: 'The object to show or hide',
            },
            visible: {
                type: 'boolean',
                required: true,
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
                type: 'number',
                required: true,
                tooltip: 'The final zoom the camera will use',
            },
            zoom_duration: {
                type: 'number',
                required: true,
                tooltip: 'How much time will it take to zoom to the target'
            }
        }
    }
}

export default eventSchema
