/**
 * These parameters are defined in the base CutsceneEvent file.
 */
const defaultParameters = {
  start_delay: {
    label: 'Start Delay',
    type: 'number',
    required: false,
    default: 0,
    tooltip:
      'The event will wait this amount of seconds before actually starting',
  },
};

/**
 * Parameters for each separate cutscene event
 */
const eventSchema = {
  gain_abilities: {
    name: 'Gain Abilities',
    icon: 'offline_bolt',
    defaultImportant: true,
    additionalText:
      'Will display the level up overlay, allowing the player to level up to the max allowed level defined',
    parameters: {
      ...defaultParameters,
      max_level: {
        label: 'Max allowed level',
        type: 'number',
        required: true,
        tooltip: 'Max level allowed by this overlay',
        placeholder: '0-5',
      },
    },
  },

  animation: {
    name: 'Animation',
    icon: 'camera_roll',
    defaultImportant: true,
    additionalText: 'Forces the target object to play an animation',
    parameters: {
      ...defaultParameters,
      object: {
        label: 'Object',
        type: 'node_target',
        required: true,
        tooltip:
          'The Object that will be animated. Must have an AnimationPlayer',
        placeholder: 'BASE:node_name',
      },
      animation: {
        label: 'Animation',
        type: 'text',
        default: 'idle',
        tooltip: 'The animation that will play',
        placeholder: 'animation_name',
      },
      loop: {
        label: 'Animation Must Loop',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the animation will loop instead of stopping in the last frame',
      },
      finish_animation: {
        label: 'Finish Animation Name',
        type: 'text',
        default: '',
        tooltip:
          'Will play when the specified animation ends (only if loops is set to false)',
        placeholder: 'animation_name',
      },
      animation_player_node_path: {
        label: 'Animation Player Node Path',
        type: 'text',
        default: 'AnimationPlayer',
        tooltip: 'Full path to the animation player. If not defined, will try to find a node called "AnimationPlayer"'
      }
    },
  },

  battle: {
    name: 'Battle',
    icon: 'whatshot',
    defaultImportant: true,
    additionalText: 'Starts a battle with the provided parameters',
    parameters: {
      ...defaultParameters,
      map_scene: {
        label: 'Map Scene',
        type: 'text',
        required: true,
        tooltip:
          'The map scene in which the battle will take place (full path)',
        placeholder: 'res://Path/to/battle_map.tscn',
      },
      enemy_scene: {
        label: 'Enemy Scene',
        type: 'text',
        required: true,
        tooltip: 'Path to enemy scene (from Enemies folder)',
        placeholder: 'path_to/enemy.tscn (from Enemies folder)',
      },
      max_hp: {
        label: 'Enemy Max HP',
        type: 'number',
        required: true,
        tooltip: 'How much health the enemy will have',
      },
      additional_enemy_properties: {
        label: 'Additional Enemy Properties',
        type: 'json',
        tooltip: 'Properties that will be injected to the enemy instance',
      },
      cutscene_file: {
        label: 'End Cutscene File',
        type: 'text',
        default: '',
        tooltip:
          'If specified, will play this cutscene when the battle finishes',
        placeholder: 'path_to/cutscene.json (from Cutscenes resource folder)',
      },
      win_state_changes: {
        label: 'Win State Changes',
        type: 'json',
        default: '',
        tooltip:
          'If specified, a dictionary that maps map aliases with their new state',
        placeholder: '{"v/h": "new_state"}',
      },
      keep_sprites: {
        label: 'Keep Sprites',
        type: 'text',
        placeholder:
          'node_name=next_pos,another_node=next_pos,yet_another_node',
        tooltip:
          'Which nodes will be visible between changes, must have a Sprite child',
      },
      regular_duration: {
        label: 'Regular Duration',
        type: 'number',
        default: 0,
        tooltip:
          'How long the battle will last (normal circumstances). 0 means no limit',
      },
      time_rush_duration: {
        label: 'Time Rush Duration',
        type: 'number',
        default: 0,
        tooltip:
          'How long the battle will last (time rush memory circumstances). 0 means no limit',
      },
      battle_character: {
        label: 'Used battle character',
        type: 'text',
        default: '',
        tooltip:
          'If defined, this battle character will be used instead of whatever is on the save file',
      },
      custom_win_return_map: {
        label: 'Custom Win Return Map',
        type: 'string',
        default: '',
        placeholder: 'V/fe',
        tooltip: 'Where the player will return after beating the fight (alias)',
      },
      custom_win_return_position: {
        label: 'Custom Win Return Position',
        type: 'position',
        default: '',
        tooltip: 'The position where the player will return',
      },
      win_used_character: {
        label: 'Win used character',
        type: 'text',
        default: '',
        tooltip:
          'What playable character will be controlled after the battle is won',
      },
      peeks_outside_of_battle_map: {
        label: 'Peeks outside of battle map',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the player will not be visible on the next map',
      },
      camera_focus_custom_win_return_position: {
        label: 'Camera focuses custom win return position',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the camera will focus the custom_win_return_position rather than the player\'s center'
      }
    },
  },

  change_bgm: {
    name: 'Change BGM',
    icon: 'music_note',
    defaultImportant: true,
    additionalText: 'Update the current BGM to the one provided',
    parameters: {
      ...defaultParameters,
      BGM: {
        label: 'BGM file name',
        type: 'text',
        default: '',
        placeholder: 'Leave blank to mute the current BGM',
        tooltip:
          'The BGM to play (format: name.ogg). If left blank, the current bgm will stop playing',
      },
      offset: {
        label: 'Start Offset',
        type: 'number',
        default: 0,
        tooltip: 'At which offset the bgm will start',
      },
      cross_transition: {
        label: 'Should Cross Transition',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the current BGM will fade into the new bgm',
      },
    },
  },
  change_enemy: {
    name: 'Change Enemy',
    icon: 'swap_horizontal',
    defaultImportant: true,
    additionalText:
      'Only works inside a battle, changes the current enemy to a new enemy instance',
    parameters: {
      ...defaultParameters,
      new_enemy: {
        label: 'New Enemy Scene Name',
        type: 'text',
        required: true,
        tooltip: 'The new enemy scene from the Enemies folder',
        placeholder: 'path/to/Enemy.tscn',
      },
      new_enemy_animation: {
        label: 'Starting Animation',
        type: 'text',
        default: 'idle',
        tooltip:
          'The animation that the new enemy will use upon entering the battle (will loop)',
        placeholder: 'animation_name',
      },
    },
  },

  change_map: {
    name: 'Change Map',
    icon: 'collections',
    defaultImportant: true,
    additionalText: 'Teleports to the provided map',
    parameters: {
      ...defaultParameters,
      map: {
        label: 'Map Alias',
        type: 'text',
        required: true,
        tooltip: 'the alias that identifies the map (see MapNameResolver.gd)',
        placeholder: 'v/fe',
      },
      position: {
        label: 'Position In Map',
        type: 'position',
        required: true,
        tooltip:
          'The where the player will appear in the new map. Can be a vector or a nodename',
      },
      new_target: {
        label: 'New Target',
        type: 'node_target',
        default: '',
        tooltip: 'Node that will be the new focus of the camera in the new map',
        placeholder: 'BASE:node_name',
      },
      peeks: {
        label: 'Peeks',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the player will not appear in the new map',
      },
      finish_early: {
        label: 'Should Finish Early',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the event will finish when the screen is still black',
      },
      keep_sprites: {
        label: 'Keep Sprites',
        type: 'text',
        placeholder:
          'node_name=next_pos,another_node=next_pos,yet_another_node',
        tooltip:
          'Which nodes will be visible between changes, must have a Sprite child',
      },
      fade_to_black_duration: {
        label: 'Fade to black duration',
        type: 'number',
        default: 0,
        helperText: 'Leave it at 0 to use the default value (should be 0.35)',
        tooltip: 'If it is more than 0, the fade out will last this long',
      },
      stay_black_duration: {
        label: 'Stay black duration',
        type: 'number',
        default: 0,
        helperText:
          'Leave it at 0 to use the default value (which should be 0)',
        tooltip:
          'If it is more than 0, the screen will stay black for this long',
      },
      fade_to_transparent_duration: {
        label: 'Fade to transparent duration',
        type: 'number',
        default: 0,
        helperText: 'Leave it at 0 to use the default value',
        tooltip:
          'If it is more than 0, the fade in will last this long (should be 0.35)',
      },
      follower_target_positions: {
        label: 'Follower Target Positions',
        type: 'positionArray',
        placeholder: 'pos_follower_1, pos_follower_2',
        tooltip:
          'Where the followers should spawn, separated by comma (one for each follower)',
        default: '',
      },
      new_controllable_player_id: {
        label: 'New Controllable player id',
        type: 'string',
        default: '',
        tooltip:
          'If defined, this will be the new player on the new map (see CharacterProvider for possible values)',
      },
      custom_transition_color: {
        label: 'Custom Transition Color',
        type: 'string',
        placeholder: '#ccff0d',
        tooltip:
          'If defined, the overlay will use this color instead of using black',
      },
      fast_change: {
        label: 'Fast Map Change',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the brief delay between map changes will be skipped',
      },
    },
  },

  change_map_state: {
    name: 'Change Map State',
    icon: 'layers',
    defaultImportant: true,
    additionalText:
      'Updates the target map to the new provided state (if present)',
    parameters: {
      ...defaultParameters,
      map: {
        label: 'Map Alias',
        type: 'text',
        required: true,
        tooltip: 'The map alias (found in MapNameResolver)',
        placeholder: 'M/al',
      },
      state: {
        label: 'New State',
        type: 'text',
        required: true,
        tooltip: 'The new state',
        placeholder: 'new_state_name',
      },
    },
  },

  overworld_player_state: {
    name: 'Change PlayerOverworld State',
    icon: 'face',
    defaultImportant: true,
    additionalText:
      'Updates what state will be forced to the player overworld once the cutscene finishes',
    parameters: {
      ...defaultParameters,
      new_state: {
        label: 'New State',
        type: 'text',
        required: true,
        tooltip: 'The state the player will be at the end of the cutscene',
        placeholder: 'OverworldStateName',
      },
    },
  },

  color_flash: {
    name: 'Color Flash',
    icon: 'wb_sunny',
    defaultImportant: true,
    additionalText: 'Flash a color overlay that covers the entire screen',
    parameters: {
      ...defaultParameters,
      color_hex: {
        label: 'Color (Hex Value)',
        type: 'text',
        default: '#ffffff',
        tooltip: 'The color that will flash (in hex)',
      },
      in_duration: {
        label: 'In Duration',
        type: 'number',
        default: 0.05,
        tooltip: 'The fade-in duration',
      },
      stay_duration: {
        label: 'Stay Duration',
        type: 'number',
        default: 0,
        tooltip: 'How long the color will stay before fading out',
      },
      out_duration: {
        label: 'Out Duration',
        type: 'number',
        default: 0.05,
        tooltip: 'The fade-out duration',
      },
      covers_ui: {
        label: 'Should Cover UI',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the flash will cover UI elements (ex: the health bar)',
      },
      ignore_in: {
        label: 'Ignore In',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the event will ignore the in duration, and will start as if the color is already there.',
      },
      ignore_out: {
        label: 'Ignore Out',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the out duration will be ignored, and the event will finish after the stay duration with the screen covered.',
      },
    },
  },

  conditional_state_change: {
    name: 'Conditional State Change',
    icon: 'developer_board',
    defaultImportant: true,
    additionalText:
      'Updates one or more map states depending on the states present on other maps',
    parameters: {
      ...defaultParameters,
      checked_maps: {
        label: 'Maps To Check',
        type: 'json',
        required: true,
        tooltip:
          'All of these maps must have the specified states to trigger the change',
        placeholder: '{ UF/r01: "some_state", UF/r02: "some_other_state" }',
      },
      target_maps: {
        label: 'Maps To Change',
        type: 'json',
        required: true,
        tooltip:
          'All of the maps that will change states, with their new state',
        placeholder: '{ UF/r05: "new_state", UF/r06: "other_new_state" }',
      },
      is_force_write: {
        label: 'Is Force-Write',
        type: 'boolean',
        default: false,
        tooltip: 'If the change is force-write',
      },
    },
  },

  jump: {
    name: 'Cutscene Jump',
    icon: 'flight_takeoff',
    defaultImportant: true,
    additionalText:
      'Halts the execution of the current cutscene and fires a new cutscene defined in the cutscene_jumps reference',
    parameters: {
      ...defaultParameters,
      jump_name: {
        label: 'Jump Name',
        type: 'text',
        required: true,
        tooltip:
          'The jump name (note: must exist in the cutscene_jumps ref, will terminate the current cutscene event)',
        placeholder: 'jump_name',
      },
    },
  },

  damage_enemy: {
    name: 'Damage Enemy',
    icon: 'mood_bad',
    defaultImportant: true,
    additionalText:
      'Applies the provided amount of damage to the enemy (will always leave at least 1 hp)',
    parameters: {
      ...defaultParameters,
      amount: {
        label: 'Damage Amount',
        type: 'number',
        default: 1,
        tooltip: 'How much damage the enemy will receive',
      },
    },
  },

  damage_player: {
    name: 'Damage Player',
    icon: 'mood_bad',
    defaultImportant: true,
    additionalText:
      'Applies the provided amount of damage to the player (will always leave at least 1 hp)',
    parameters: {
      ...defaultParameters,
      amount: {
        label: 'Damage Amount',
        type: 'number',
        default: 1,
        tooltip: 'How much damage the player will receive',
      },
    },
  },

  destroy_object: {
    name: 'Destroy Object',
    icon: 'cancel',
    defaultImportant: true,
    additionalText: 'Frees the provided instance',
    parameters: {
      ...defaultParameters,
      object: {
        label: 'Object to Destroy',
        type: 'node_target',
        required: true,
        tooltip: 'The object to be destroyed. is a NODE_TARGET',
        placeholder: 'BASE:node_name',
      },
    },
  },

  dialogue: {
    name: 'Dialogue',
    icon: 'chat_bubble',
    defaultImportant: true,
    additionalText: 'Starts a dialogue with the provided parameters',
    parameters: {
      ...defaultParameters,
      file: {
        label: 'JSON file',
        type: 'text',
        required: true,
        tooltip:
          'The file that contains the target conversation (from the Dialogues resource folder)',
        placeholder: 'path/to/dialogue.json',
        skipRender: true,
      },
      name: {
        label: 'Conversation Name',
        type: 'text',
        required: true,
        tooltip: 'The conversation name inside the file',
        placecholder: 'conversation_name',
        skipRender: true,
      },
      dialogueDataBundle: {
        type: 'dialogueJson',
        fileValueKey: 'file',
        conversationNameKey: 'name',
        multiple: false,
        inputs: {
          file: {
            label: 'JSON file',
            type: 'text',
            required: true,
            tooltip:
              'The file that contains the target conversation (from the Dialogues resource folder)',
            placeholder: 'path/to/dialogue.json',
          },
          name: {
            label: 'Conversation Name',
            type: 'text',
            required: true,
            tooltip: 'The conversation name inside the file',
            placecholder: 'conversation_name',
          },
        },
      },
    },
  },

  exit_battle: {
    name: 'Exit Battle',
    icon: 'exit_to_app',
    defaultImportant: true,
    additionalText:
      'Forces a battle to finish early and returns to the overworld',
    parameters: {
      ...defaultParameters,
      finish_early: {
        label: 'Should Finish Early',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the event will finish when the screen is still black',
      },
      custom_return_map: {
        label: 'Custom Return Map Alias',
        type: 'text',
        default: null,
        tooltip:
          'If defined, the player will return to this map instead of his previous map',
        placeholder: 'res://path/to/map_scene.tscn',
      },
      custom_return_position: {
        label: 'Custom Return Position',
        type: 'position',
        default: null,
        tooltip:
          'If defined, the custom position that the player will return to',
      },
      new_target: {
        label: 'New Target',
        type: 'node_target',
        default: '',
        tooltip: 'Node that will be the new focus of the camera in the new map',
        placeholder: 'BASE:node_name',
      },
      keep_sprites: {
        label: 'Keep Sprites',
        type: 'text',
        placeholder:
          'node_name=next_pos,another_node=next_pos,yet_another_node',
        tooltip:
          'Which nodes will be visible between changes, must have a Sprite child',
      }, 
      follower_target_positions: {
        label: 'Follower Target Positions',
        type: 'positionArray',
        placeholder: 'pos_follower_1, pos_follower_2',
        tooltip:
          'Where the followers should spawn, separated by comma (one for each follower)',
        default: '',
      },
      overworld_animation: {
        label: 'Overworld Animation',
        type: 'text',
        tooltip:
          'If defined, this animation will be forced on the player overworld',
      },
      follower_animations: {
        label: 'Follower Animations',
        type: 'text',
        tooltip: 'Animations that the followers will play, separated by comma',
        default: ''
      }
    },
  },

  give_item: {
    name: 'Give Item',
    icon: 'add_shopping_cart',
    defaultImportant: true,
    additionalText: "Adds the item to the player's inventory",
    parameters: {
      ...defaultParameters,
      item_type: {
        label: 'Item Type',
        type: 'text',
        default: 'key_item',
        tooltip: 'The type of item',
      },
      item_id: {
        label: 'Item ID',
        type: 'text',
        required: true,
        tooltip: 'The required item id',
      },
      aux_message: {
        label: 'Optional Message',
        type: 'text',
        default: null,
        tooltip: 'Will be displayed after the item is given',
      },
      show_fanfare: {
        label: 'Show Fanfare',
        type: 'boolean',
        default: true,
        tooltip: 'Whether the got item fanfare will be displayed',
      },
      amount: {
        label: 'Amount',
        type: 'number',
        default: '1',
        tooltip: 'How many instances of this item will be given to the player',
      },
    },
  },

  next_run: {
    name: 'Go to Next Run',
    icon: 'fast_forward',
    defaultImportant: true,
    additionalText:
      'Updates the current active game run and returns to the title screen',
    parameters: {
      ...defaultParameters,
      next_run_name: {
        label: 'Next Run',
        type: 'text',
        required: true,
        tooltip: 'The text that identifies the next run',
      },
    },
  },

  level_up: {
    name: 'Level Up',
    icon: 'star',
    defaultImportant: true,
    additionalText:
      'Forces the provided level to the player, without any UI or interaction required',
    parameters: {
      ...defaultParameters,
      target_level: {
        label: 'Target Level',
        type: 'number',
        default: 1,
        tooltip: 'The target level that will be applied to the player',
      },
    },
  },

  minigame: {
    name: 'Minigame',
    icon: 'games',
    defaultImportant: true,
    hidden: true,
    additionalText:
      'Starts a minigame, which will display a custom UI and prevent the player from moving or interacting',
    parameters: {
      ...defaultParameters,
      game: {
        label: 'Minigame Identifier',
        type: 'text',
        required: true,
        tooltip: 'The target game identifier',
      },
    },
  },

  move_camera: {
    name: 'Move Camera',
    icon: 'switch_camera',
    defaultImportant: true,
    additionalText: 'Moves the camera to the new target',
    parameters: {
      ...defaultParameters,
      target: {
        label: 'New Camera Target',
        type: 'node_target',
        required: true,
        tooltip: 'The new camera target, is a NODE_TARGET',
        placeholder: 'BASE:node_name',
      },
      transition_duration: {
        label: 'Transition Duration',
        type: 'number',
        default: 1,
        tooltip: 'How long the camera will take to focus on the new target',
      },
      focus_floor: {
        label: 'Focus Floor',
        type: 'boolean',
        default: false,
        tooltip:
          "If true, the camera will focus the node's base position rather than the center. Note that this property will be reset after the cutscene finished back to focusing the node's center",
      },
      prevent_focusing_outside_camera: {
        label: 'Prevent Focusing Outside Camera',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the focus position will be forced in such a way that the camera will not noticeably collide with the camera region boundaries. Useful for focusing something very close to the camera\'s borders'
      }
    },
  },

  move: {
    name: 'Move',
    icon: 'directions_walk',
    defaultImportant: true,
    additionalText: 'Moves the provided control target to a new position',
    parameters: {
      ...defaultParameters,
      at_speed: {
        label: 'Movement Speed',
        type: 'number',
        default: 70,
        tooltip: 'How fast the target will move',
      },
      use_time_instead: {
        label: 'Overwrite speed with time',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the speed value will be used as a duration instead',
      },
      control: {
        label: 'Controlled Node',
        type: 'node_target',
        required: true,
        tooltip: 'The node to move',
        placeholder: 'BASE:node_name',
      },
      destination: {
        label: 'Destinations',
        type: 'positionArray',
        required: true,
        placeholder: 'An array of positions',
        tooltip: 'Where the target will land',
      },
      animates: {
        label: 'Should Animate',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the node will animate when moved',
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
        tooltip: 'If true, the move will be instantaneous',
      },
      finish_animation: {
        label: 'Finishing animation',
        type: 'text',
        default: '',
        tooltip: 'Animation that will play when the movement finishes',
      },
    },
  },

  remove_item: {
    name: 'Remove Item',
    icon: 'remove_shopping_cart',
    defaultImportant: true,
    additionalText: "Removes the provided item from the player's inventory",
    parameters: {
      ...defaultParameters,
      item_type: {
        label: 'Item Type',
        type: 'text',
        default: 'key_item',
        tooltip: 'The type of item',
      },
      item_id: {
        label: 'Item ID',
        type: 'text',
        required: true,
        tooltip: 'The item id to remove',
      },
      only_deliver: {
        label: 'Only deliver',
        type: 'boolean',
        tooltip:
          'If true, the item will be marked as delivered rather than being removed',
        default: true,
      },
    },
  },

  save: {
    name: 'Save',
    icon: 'save',
    defaultImportant: true,
    additionalText:
      'Performs a save operation with the required parameters (full save if nothing is provided)',
    parameters: {
      ...defaultParameters,
      write_to_file: {
        label: 'Write to file',
        type: 'boolean',
        default: true,
        tooltip:
          'Whether the data will be saved on the file, or just on the virtual save schema',
      },
      map_data: {
        label: 'Map Data',
        type: 'json',
        default: null,
        tooltip: 'The map data to save',
        placeholder: '{ "map_name": {"key":"value"} }',
        helperText:
          'Use the map alias to identify each map (example: V/p, UF/c)',
      },
      npc_data: {
        label: 'NPC Data',
        type: 'json',
        default: null,
        tooltip: 'The NPC data to save',
        placeholder: '{ "npc_name": {"map_name": "data"} }',
        helperText:
          'To identify a map for an NPC, you need to use the actual scene name (unlike the previous field)',
      },
      player_data: {
        label: 'Player Data',
        type: 'json',
        default: null,
        tooltip: 'The Player data to save',
        placeholder: '{ "key": "value" }',
      },
      initial_player_state: {
        label: 'Initial Player State',
        type: 'string',
        default: '',
        tooltip: 'If defined, the player will enter the game in this state',
      },
      new_controllable_player_id: {
        label: 'Controllable Player Id',
        type: 'string',
        default: '',
        tooltip: 'If defined, this player will be used.',
      },
      show_disk_save_feedback: {
        label: 'Show Disk Save Feedback',
        type: 'boolean',
        default: true,
        tooltip:
          'Whether the save icon will appear on the bottom of the screen',
      },
    },
  },

  shake: {
    name: 'Shake',
    icon: 'leak_add',
    defaultImportant: true,
    additionalText: 'Causes the camera to shake with the provided parameters',
    parameters: {
      ...defaultParameters,
      shake_id: {
        label: 'Shake ID',
        type: 'text',
        default: '',
        tooltip:
          'Identifies a single shake request. A blank one will create a random shake id if the shake_amount is more than 0, or will cancel all active shake transactions',
      },
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
        tooltip:
          'How strong will the shake be. If the value is 0 or less, the shake will be cancelled instead (Shake duration will be ignored)',
      },
    },
  },

  sound: {
    name: 'Sound',
    icon: 'mic',
    defaultImportant: false,
    additionalText: 'Plays the provided sound effect',
    parameters: {
      ...defaultParameters,
      sound: {
        label: 'Sound File Name',
        type: 'text',
        required: true,
        tooltip: 'Path to the file that will be played, from the sfx folder',
        placeholder: 'path/to/file_name.wav',
      },
    },
  },

  spawn_object: {
    name: 'Spawn Object',
    icon: 'library_add',
    defaultImportant: true,
    additionalText:
      'Adds the specified object to the map, inside the specified parent',
    parameters: {
      ...defaultParameters,
      object: {
        label: 'Object Scene Full Path',
        type: 'text',
        required: true,
        tooltip: 'The scene to spawn',
        placeholder: 'res://path/to/object.tscn',
      },
      position: {
        label: 'Object Position',
        type: 'position',
        required: false,
        tooltip: 'Where the object will spawn (leave it empty for 0,0)',
      },
      parent: {
        label: 'Parent Object',
        type: 'node_target',
        default: null,
        tooltip: 'If defined, the object will spawn as a child of this object',
      },
      no_invisible_spawn: {
        label: 'No invisible spawn',
        type: 'boolean',
        default: false,
        tooltip:
          'Will not perform the 0.25s of invisibility spawned objects have, which prevents invalid animations from showing for 1 frame',
      },
      initial_animation: {
        label: 'Initial Animation',
        type: 'string',
        default: '',
        tooltip:
          'Animation to perform as the object spawns. Will only apply if the object has an animation player',
      },
      initial_props: {
        label: 'Initial Properties',
        type: 'json',
        default: null,
        tooltip:
          'Initial parameters (key/value pair) that will be injected to the instance',
        placeholder: '{ "property_name": "property_value" }',
      },
    },
  },

  toggle_hud: {
    name: 'Toggle HUD',
    icon: 'subtitles',
    defaultImportant: true,
    additionalText: 'Will show/hide the battle HUD',
    parameters: {
      ...defaultParameters,
      should_show: {
        label: 'Should Show',
        type: 'boolean',
        default: false,
        tooltip: 'Whether the hud will show or hide',
      },
    },
  },

  visible: {
    name: 'Visible',
    icon: 'flip',
    defaultImportant: true,
    additionalText: "Toggles the target object's visibility",
    parameters: {
      ...defaultParameters,
      object: {
        label: 'Target Object',
        type: 'node_target',
        required: true,
        tooltip: 'The object to show or hide',
        placeholder: 'BASE:node_name',
      },
      visible: {
        label: 'Should Be Visible',
        type: 'boolean',
        default: false,
        tooltip: 'Whether to show or hide the object',
      },
    },
  },

  wait: {
    name: 'Wait',
    icon: 'timer',
    defaultImportant: true,
    additionalText: 'Pauses the cutscene execution for a set amount of time',
    parameters: {
      ...defaultParameters,
      duration: {
        label: 'Duration',
        type: 'number',
        required: true,
        tooltip: 'How long the wait will be',
      },
    },
  },

  zoom: {
    name: 'Zoom Camera',
    icon: 'zoom_out_map',
    defaultImportant: true,
    additionalText: 'Zooms the camera to the provided scale',
    parameters: {
      ...defaultParameters,
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
        tooltip: 'How much time will it take to zoom to the target',
      },
    },
  },

  ability_toggle: {
    name: 'Ability Toggle',
    icon: 'toggle_on',
    defaultImportant: false,
    additionalText:
      'Enables/disables a player ability (example: dash, roll, phase)',
    parameters: {
      ...defaultParameters,
      ability_name: {
        label: 'Ability Name',
        type: 'text',
        required: true,
        tooltip:
          'The node name of the ability to enable/disable (on either PlayerOverworld or PlayerBattle)',
        placeholder: 'MeleeAction',
      },
      enabled: {
        label: 'Enabled',
        type: 'boolean',
        default: false,
        tooltip: 'Whether the ability will be enabled or disabled',
      },
    },
  },

  emote: {
    name: 'Show Emotion',
    icon: 'not_listed_location',
    defaultImportant: true,
    additionalText: 'Forces the node to display one of the pre-defined emotes',
    parameters: {
      ...defaultParameters,
      target_object: {
        label: 'Target Object',
        type: 'node_target',
        required: true,
        tooltip: 'The object that will display the emote',
        placeholder: 'BASE:node_name',
      },
      emote: {
        label: 'Emote',
        type: 'dropdown',
        elements: {
          angry: 'Angry',
          exclamation: 'Exclamation',
          question: 'Question',
          three_dots: 'Three Dots',
          sweat: 'Sweat',
          heart: 'Heart',
        },
        required: true,
        tooltip: 'The emote to display',
      },
    },
  },

  create_follower: {
    name: 'Create Follower',
    icon: 'person_add',
    defaultImportant: false,
    additionalText: 'Creates a new object and assigns it as a player follower',
    parameters: {
      ...defaultParameters,
      object_path: {
        label: 'Follower Resource Path',
        type: 'text',
        required: true,
        tooltip: 'The full path to the follower scene',
        placeholder: 'res://path/to/follower/scene.tscn',
      },
      position: {
        label: 'Object Position',
        type: 'position',
        required: true,
        tooltip: 'Where the follower will spawn',
      },
      follower_id: {
        label: 'Follower ID',
        type: 'text',
        required: true,
        tooltip: 'An unique identifier for the follower, used to delete it',
        placeholder: 'unique_follower_id',
      },
      do_not_muffle_footsteps: {
        label: 'Do Not muffle footsteps',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the foostep player will not be muffled for the follower',
      },
      follow_steps_behind: {
        label: 'Follow Steps Behind',
        type: 'number',
        default: 10,
        tooltip: 'The amount of steps this follower will be offset relative to the player (each step is equivalent to 5px)'
      }
    },
  },

  remove_follower: {
    name: 'Remove Follower',
    icon: 'person_add_disabled',
    defaultImportant: false,
    additionalText: 'Removes the follower identified by the provided unique id',
    parameters: {
      ...defaultParameters,
      follower_id: {
        label: 'Follower ID',
        type: 'text',
        required: true,
        tooltip: 'The follower id to be removed',
        placeholder: 'unique_follower_id',
      },
      keep_on_map: {
        label: 'Keep on map',
        type: 'boolean',
        default: false,
        tooltip:
          'Whether the follower will be removed or will just stop following the player',
      },
    },
  },

  remove_all_followers: {
    name: 'Remove all Followers',
    icon: 'layers_clear',
    defaultImportant: false,
    additionalText: 'Removes all followers currently registered to the player',
    parameters: {
      ...defaultParameters,
      keep_on_map: {
        label: 'Keep on map',
        type: 'boolean',
        default: false,
        tooltip:
          'Whether the follower will be removed or will just stop following the player',
      },
    },
  },

  capture_follower: {
    name: 'Capture Follower',
    icon: 'supervisor_account',
    defaultImportant: false,
    additionalText: 'Sets an already existing object as a player follower',
    parameters: {
      ...defaultParameters,
      target_object: {
        label: 'Target Object',
        type: 'node_target',
        required: true,
        tooltip: 'The object that will be set as the follower',
        placeholder: 'BASE:node_name',
      },
      follower_id: {
        label: 'Follower ID',
        type: 'text',
        required: true,
        tooltip: 'An unique identifier for the follower, used to delete it',
        placeholder: 'unique_follower_id',
      },
      do_not_muffle_footsteps: {
        label: 'Do Not muffle footsteps',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the foostep player will not be muffled for the follower',
      },
      follow_steps_behind: {
        label: 'Follow Steps Behind',
        type: 'number',
        default: 10,
        tooltip: 'The amount of steps this follower will be offset relative to the player (each step is equivalent to 5px)'
      }
    },
  },

  action_command: {
    name: 'Action Command',
    icon: 'error_outline',
    defaultImportant: true,
    additionalText:
      'Pauses the cutscene execution and waits for a user input to continue',
    parameters: {
      ...defaultParameters,
      target_zoom: {
        label: 'Target Zoom',
        type: 'number',
        required: true,
        tooltip: 'How much will the camera zoom',
      },
      target_zoom_duration: {
        label: 'Zoom Duration',
        type: 'number',
        required: true,
        tooltip: 'How long will the zoom last',
      },
      action: {
        label: 'Required Action',
        type: 'text',
        required: true,
        tooltip: 'Action to listen to',
      },
      message: {
        label: 'Prompt Message',
        type: 'text',
        required: true,
        tooltip: 'Prompt text',
      },
      zooms_camera: {
        label: 'Zooms camera',
        type: 'boolean',
        default: true,
        tooltip: 'Whether the camera will use the target_zoom',
      },
      pauses: {
        label: 'Pauses',
        type: 'boolean',
        default: true,
        tooltip:
          'If true, the game will pause until the action command is pressed',
      },
      invisible_action: {
        label: 'Invisible Action',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the action command promtp will be invisible',
      },
      auto_advance_fallback_timeout: {
        label: 'Auto Advance fallback timeout',
        type: 'number',
        default: 0.0,
        tooltip:
          'If this value is more than 0, the event will force finish after this duration if the player has not pressed anything',
      },
    },
  },

  glitch: {
    name: 'Glitch',
    icon: 'gesture',
    defaultImportant: false,
    additionalText: 'Displays a static glitch overlay',
    parameters: {
      ...defaultParameters,
      with_crackling_sounds: {
        label: 'With Crackling Sounds',
        type: 'boolean',
        default: true,
        tooltip:
          'Whether the crackling glithch sounds will play with the glitch',
      },
      duration: {
        label: 'Custom Duration',
        type: 'number',
        default: 0,
        tooltip: 'Leave at 0 to play for the default duration',
      },
      overlay_image_source: {
        label: 'Overlay Image Source',
        type: 'text',
        default: '',
        placeholder: 'image_name.png=1.0|used_overlay',
        tooltip:
          'used to parse images that will flash while the glitch is active',
      },
    },
  },

  storyline_message: {
    name: 'Storyline Message',
    icon: 'notification_important',
    defaultImportant: false,
    additionalText:
      'Emits a message that the StorylineManager can detect to check if any storyline needs to be updated',
    parameters: {
      ...defaultParameters,
      message_name: {
        label: 'Message Name',
        type: 'text',
        required: true,
        placeholder: 'message_name',
      },
    },
  },

  look_at: {
    name: 'Look At',
    icon: 'person_search',
    defaultImportant: false,
    additionalText:
      'Subjet must be a MovableBody, and Look Target must be a Node2D',
    parameters: {
      ...defaultParameters,
      subject: {
        label: 'Subject',
        type: 'node_target',
        required: true,
        placeholder: 'The node that will "look" at something',
      },
      look_target: {
        label: 'Look Target',
        type: 'node_target',
        required: true,
        placeholder: 'Who the subject will face',
      },
    },
  },

  look_at_direction: {
    name: 'Look At Direction',
    icon: 'travel_explore',
    defaultImportant: false,
    additionalText: 'Subject must be a movable body',
    parameters: {
      ...defaultParameters,
      subject: {
        label: 'Subject',
        type: 'node_target',
        required: true,
        placeholder: 'The node that will "look" at a given direction',
      },
      direction: {
        label: 'Look Target',
        type: 'dropdown',
        required: true,
        placeholder: 'The direction the subject will face',
        elements: {
          up: 'Up',
          down: 'Down',
          left: 'Left',
          right: 'Right',
        },
      },
    },
  },

  inject_bgm_player: {
    name: 'Inject BGM player',
    icon: 'hearing',
    additionalText: 'Inject a intro/bgm combo to the current map.',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      intro_res: {
        label: 'Intro BGM Resource',
        type: 'string',
        required: false,
        placeholder: 'From the BGM folder',
        default: '',
      },
      bgm_res: {
        label: 'Main BGM Resource',
        type: 'string',
        required: false,
        placeholder: 'From the BGM folder',
        default: '',
      },
      persist_map_changes: {
        label: 'Persist map changes',
        type: 'boolean',
        required: false,
        default: false,
        tooltip: 'If true, the bgm will persist between map changes',
      },
      out_duration: {
        label: 'Out Duration',
        type: 'number',
        required: true,
        default: 0.5,
        tooltip: 'How long will the fade-out take',
      },
      in_duration: {
        label: 'In Duration',
        type: 'number',
        required: true,
        default: 0.5,
        tooltip: 'How long will the fade-in take',
      },
      silence_duration: {
        label: 'Silence Duration',
        type: 'number',
        required: true,
        default: 0.0,
        tooltip: 'Silence interval between bgms',
      },
      play_from_beginning: {
        label: 'Play From Beginning',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the bgm will ignore saved offsets',
      },
      max_loops: {
        label: 'Max Loops',
        type: 'number',
        default: -1,
        tooltip:
          'How many loops before invalidating, leave it at -1 to make it loop as long as it can',
        helperText: 'A value of -1 means infinite loops',
      },
      silence_after_song_loops: {
        label: 'Silence after song loops',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the original bgm will not be restored when loops end',
      },
    },
  },

  clear_injected_bgm: {
    name: 'Clear injected bgm',
    icon: 'hearing_disabled',
    additionalText:
      'This event will remove the custom injected bgm and will play whatever is defined in the map',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      out_duration: {
        label: 'Out Duration',
        type: 'number',
        required: true,
        default: 0.5,
        tooltip: 'How long will the fade-out take',
      },
      in_duration: {
        label: 'In Duration',
        type: 'number',
        required: true,
        default: 0.5,
        tooltip: 'How long will the fade-in take',
      },
      silence_duration: {
        label: 'Silence Duration',
        type: 'number',
        required: true,
        default: 0.0,
        tooltip: 'Silence interval between bgms',
      },
      play_from_beginning: {
        label: 'Play From Beginning',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the bgm will ignore saved offsets',
      },
    },
  },

  change_node_property: {
    name: 'Change node properties',
    icon: 'touch_app',
    additionalText:
      'Updates all listed properties in the dictionary with the new value',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      node: {
        label: 'Node',
        type: 'node_target',
        required: true,
        placeholder: 'The node that will be modified',
      },
      properties: {
        label: 'Properties',
        type: 'json',
        required: true,
        tooltip: 'properties that will be changed',
        placeholder: '{"prop_name": "new_value"}',
      },
    },
  },

  full_minigame: {
    name: 'Launch Full Minigame',
    icon: 'videogame_asset',
    additionalText:
      'Launches a minigame (will wait for the cutscene to finish)',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      minigame_path: {
        label: 'Minigame Node Path',
        type: 'string',
        required: true,
        placeholder: 'The minigame node, inside res://Minigames',
      },
      save_on_cutscene_finish: {
        label: 'Save game when the minigame starts',
        type: 'boolean',
        default: false,
        tooltip:
          'Whether starting the minigame after the cutscene finishes will force a save',
      },
    },
  },

  call_node_method: {
    name: 'Call Node Method',
    icon: 'phone_callback',
    additionalText: 'Calls the provided method in the node inside the tree',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      node_name: {
        label: 'Node Name',
        required: true,
        type: 'string',
        placeholder: 'FooNode',
      },
      method_name: {
        label: 'Method Name',
        required: true,
        type: 'string',
        placeholder: 'method_name',
      },
      parameters: {
        label: 'Method parameters',
        required: false,
        default: '',
        placeholder: 'param1, param2, true(bool), 5(int), 4.0(float)',
        tooltip:
          'You can use parenthesis to specify a data type, otherwise it will default to strings. Accepts String, bool, int and float for now.',
      },
    },
  },

  give_memory: {
    name: 'Give Memory',
    icon: 'psychology',
    additionalText: 'Unlocks a new memory for the player',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      memory_name: {
        label: 'Memory Name',
        required: true,
        type: 'string',
        placeholder: 'FooMemoryNode',
      },
      no_fanfare: {
        label: 'No Fanfare',
        type: 'boolean',
        default: false,
        tooltip: 'If true, the prompt will be skipped',
      },
      fade_full_message: {
        label: 'Fade Full Message',
        type: 'boolean',
        default: true,
        tooltip: 'If true, the message will fade in instead of it being typed',
      },
      message_type_speed: {
        label: 'Message type speed',
        type: 'number',
        default: 0.1,
        tooltip: 'How fast will the prompt message be typed',
      },
      skip_instructions: {
        label: 'Skip Instructions',
        type: 'boolean',
        default: false,
        tooltip:
          'If true, the prompt will never trigger the instructions, even if this memory is the first one obtained',
      },
    },
  },

  toggle_memory_lock: {
    name: 'Toggle memory lock',
    icon: 'lock',
    additionalText: 'Locks/unlocks an existing memory',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      memory_name: {
        label: 'Memory Name',
        required: true,
        type: 'string',
        placeholder: 'FooMemoryNode',
      },
      locked: {
        label: 'Locked',
        type: 'boolean',
        default: false,
      },
    },
  },

  toggle_memory: {
    name: 'Toggle Memory',
    icon: 'cloud_done',
    additionalText: 'activates/deactivates an existing memory',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      memory_name: {
        label: 'Memory Name',
        required: true,
        type: 'string',
        placeholder: 'FooMemoryNode',
      },
      active: {
        label: 'Active',
        type: 'boolean',
        default: false,
      },
    },
  },

  give_currency: {
    name: 'Give Currency',
    icon: 'monetization_on',
    additionalText: "Adds the provided funds to the player's wallet",
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      given_amount: {
        label: 'Given Amount',
        required: true,
        type: 'number',
      },
      show_fanfare: {
        label: 'Show Fanfare',
        type: 'boolean',
        default: true,
        required: false
      },
      custom_message: {
        label: 'Custom Message',
        type: 'string',
        required: false
      },
      with_animation: {
        label: 'With Animation',
        type: 'boolean',
        default: true,
        tooltip: 'Show the celebrate animation (only works if show_fanfare is true)'
      }
    },
  },

  seed_next_run: {
    name: 'Seed Next Run',
    icon: 'grass',
    additionalText:
      'Modifies the initial state for the next time the player presses new game',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      seed_name: {
        label: 'Seed Name',
        required: true,
        type: 'string',
        placeholder: 'seed_name',
        tooltip:
          'Note that this seed must be registered in SaveSeeder.gd as an option, otherwise nothing will happen',
      },
    },
  },

  toggle_player_control: {
    name: 'Toggle Player Control',
    icon: 'warning',
    additionalText:
      'WARNING: THIS EVENT IS DANGEROUS (enables/disables movement inside cutscene). DO NOT USE ALONGSIDE MAP CHANGES OR PLAYER MOVEMENTS',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      control_status: {
        label: 'Control Status',
        required: true,
        type: 'boolean',
        tooltip: '',
      },
    },
  },

  toggle_pocket_dimension: {
    name: 'Toggle Pocket Dimension',
    icon: 'monochrome_photos',
    additionalText: 'Toggles the pocket dimension mantle on or off',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      mantle_lifted: {
        label: 'Mantle Lifted',
        required: true,
        type: 'boolean',
        default: true,
        tooltip: 'Whether the mantle wil be lowereed (false) or lifted (true)',
      },
    },
  },

  branching_player_input: {
    name: 'Branching Player Input',
    icon: 'alt_route',
    additionalText: 'Performs a jump based on the pressed input',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      action_string: {
        label: 'Action String',
        required: true,
        type: 'text',
        placeholder: 'action_name:jump_name:label(?),action_name_2:jump_name_2',
      },
    },
  },

  toggle_cutscene_bars: {
    name: 'Toggle Cutscene Bars',
    icon: 'movie_filter',
    additionalText: 'Shows/Hides the cutscene bars',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      bars_visible: {
        label: 'Bars Visible',
        type: 'boolean',
        default: true,
        tooltip:
          'Whether the bars will show/hide (should do nothing if the bars are already in the desired state)',
      },
    },
  },

  slowdown_event: {
    name: 'Slowdown',
    icon: 'hourglass_bottom',
    additionalText: 'Modifies the world speed',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      world_speed: {
        label: 'World Speed',
        type: 'number',
        required: true,
        tooltip: 'The final world speed',
      },
      transition_duration: {
        label: 'Transition Duration',
        type: 'number',
        default: 0.0,
        tooltip: 'How long the change will take (0 will be instant)',
      },
      transition_ignores_world_speed: {
        label: 'Transition ignores world speed',
        type: 'boolean',
        default: true,
        tooltip:
          'Ignoring the world speed will make the transition last the same time, regardless of slowdown. Not ignoring it will make the event eaiser to time with other events that ARE slowed down/sped up.',
      },
    },
  },

  mark_flashback_visited: {
    name: 'Mark Flashback Visited',
    icon: 'bookmark_added',
    additionalText: 'Marks the provided flashback as visited',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      flashback_name: {
        label: 'Flashback Name',
        type: 'dropdown',
        required: true,
        elements: {
          village_morning: 'Village Morning',
          village_night: 'Village Night',
          mansion: 'Mansion',
        },
      },
    },
  },

  mark_active_flashback: {
    name: 'Mark Active Flashback',
    icon: 'push_pin',
    additionalText: 'Marks the provided flashback as active',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      flashback_name: {
        label: 'Flashback Name',
        type: 'dropdown',
        required: false,
        default: '',
        elements: {
          village_morning: 'Village Morning',
          village_night: 'Village Night',
          mansion: 'Mansion',
        },
      },
    },
  },

  attempt_wakeup: {
    name: 'Attempt Wakeup',
    icon: 'airline_seat_flat_angled',
    additionalText: 'Tries to wakeup if you are revisiting a flashback',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
    },
  },

  lock_camera: {
    name: 'Lock Camera',
    icon: 'control_camera',
    additionalText: 'Forces the camera to stay at the current position',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
    },
  },

  give_key_access_item: {
    name: 'Give Key Access Item',
    icon: 'add_card',
    additionalText: '',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
      key_access_item_id: {
        label: 'Key Access Item Id',
        type: 'text',
        required: true,
        placeholder: 'The ID identifying the key access item',
      },
      aux_message: {
        label: 'Aux message',
        type: 'text',
        required: false,
      },
      show_fanfare: {
        label: 'Show Fanfare',
        type: 'boolean',
        default: true,
      },
      target_item_owner: {
        label: 'Target Item Owner',
        type: 'String',
        default: '',
        placeholder:
          'The character this item will be given to. Leave empty to give it to the current character.',
      },
    },
  },

  remove_key_access_item: {
    name: 'Remove Key Access Item',
    icon: 'credit_card_off',
    additionalText: '',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      key_access_item_id: {
        label: 'Key Access Item Id',
        type: 'text',
        required: true,
        placeholder: 'The ID identifying the key access item',
      },
      target_item_owner: {
        label: 'Target Item Owner',
        type: 'String',
        default: '',
        placeholder:
          'The character this item will be removed from. Leave empty to give it to the current character.',
      },
    },
  },

  add_memory_point: {
    name: 'Add Memory Point',
    icon: 'cloud_upload',
    additionalText:
      "Adds the provided amount of points to the player's baseline memory point amount",
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      amount: {
        label: 'Amount',
        type: 'number',
        default: 1,
        required: true,
      },
    },
  },

  remove_memory_point: {
    name: 'Remove Memory Point',
    icon: 'cloud_download',
    additionalText:
      "Removes the provided amount of points from the player's baseline memory point amount (will clamp at 0)",
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      amount: {
        label: 'Amount',
        type: 'number',
        default: 1,
        required: true,
      },
    },
  },

  force_storyline_step: {
    name: 'Force Storyline Step',
    icon: 'move_down',
    additionalText:
      'Forces a storyline to configure itself for an specific step',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      storyline_name: {
        label: 'Storyline Name',
        type: 'text',
        required: true,
        placeholder: 'FooStoryline',
        tooltip: 'The storyline that will be configured',
      },
      step_name: {
        label: 'Step Name',
        type: 'text',
        required: true,
        placeholder: 'foo_step',
        tooltip: 'The step that the storyline will be forced to',
      },
    },
  },

  go_to_main_menu: {
    name: 'Go to Main Menu',
    icon: 'open_in_new',
    additionalText: 'Returns the player to the main menu (cutscene will force end)',
    defaultImportant: true,
    parameters: {
      ...defaultParameters,
    }
  },

  call_group_method: {
    name: 'Call Group Method',
    icon: 'diversity_1',
    additionalText: 'Calls the provided method in the group',
    defaultImportant: false,
    parameters: {
      ...defaultParameters,
      group_name: {
        label: 'Group Name',
        type: 'text',
        required: true,
        placeholder: 'GroupName',
        tooltip: 'The group whose method will be called'
      },
      method_name: {
        label: 'Method Name',
        type: 'text',
        required: true,
        placeholder: 'method_name',
        tooltip: 'The method that will be called'
      }
    }
  }
};

export default eventSchema;
