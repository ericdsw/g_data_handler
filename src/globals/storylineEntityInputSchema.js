const storylineEntityInputSchema = {
  create_npc: {
    name: "Create NPC",
    additionalText:
      "If the NPC already exists, the existing instance will be used instead of creating a new one",
    parameters: {
      name: {
        label: "NPC Name",
        type: "text",
        required: true,
        placeholder: "NpcName",
        tooltip: "Name of the npc to be created",
      },
      map_name: {
        label: "In Map",
        type: "text",
        required: true,
        tooltip: "The map where the npc will be added (just the name)",
      },
      initial_position: {
        label: "Initial position",
        type: "position",
        required: true,
        tooltip: "Where the NPC will spawn",
      },
      resource_path: {
        label: "Resource Path",
        type: "text",
        required: true,
        tooltip: "Path to the NPC scene, starting from the NPC/Custom folder",
        placeholder: "path/to/npc.tscn",
      },
      animation: {
        label: "Animation",
        type: "text",
        placeholder: "foo_animation",
        tooltip: "The animation that the npc will play",
      },
      faces_player: {
        label: "Faces Player",
        type: "boolean",
        tooltip: "If true, faces the player when interacted with",
      },
      facing_direction: {
        label: "Facing Direction",
        type: "dropdown",
        tooltip: "The default facing direction",
        elements: {
          up: "Up",
          down: "Down",
          left: "Left",
          right: "Right",
        },
      },
      parent_walker: {
        label: "Spawn in NPC Walker",
        type: "text",
        tooltip:
          "If defined, the NPC will spawn inside the provided walker (only the name is required)",
        placeholder: "NPCWalkerName",
        afterSeparator: "Optional Walker parameters",
      },
      parent_walker_speed: {
        label: "Movement Speed",
        type: "number",
        tooltip: "How fast the NPC will walk",
      },
      walk_delay: {
        label: "Walk Delay",
        type: "number",
        tooltip: "Time to wait between each point",
      },
    },
  },

  configure_npc: {
    name: "Configure NPC",
    parameters: {
      name: {
        label: "NPC Name",
        type: "text",
        required: true,
        tooltip: "The node name of the NPC instance to configure",
        placeholder: "NpcName",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        tooltip: "Map where the NPC will be looked in (just the name)",
        placeholder: "MapName",
      },
      initial_position: {
        label: "Initial position",
        type: "position",
        tooltip: "If defined, the NPC will be moved to this position",
      },
      animation: {
        label: "Animation",
        type: "text",
        tooltip: "The animation that the npc will play",
      },
      faces_player: {
        label: "Faces Player",
        type: "boolean",
        tooltip: "Faces the player when interacted if true",
      },
      facing_direction: {
        label: "Facing Direction",
        type: "dropdown",
        tooltip: "The NPC default facing direction",
        elements: {
          up: "Up",
          down: "Down",
          left: "Left",
          right: "Right",
        },
      },
      parent_walker: {
        label: "Spawn in NPC Walker",
        type: "text",
        afterSeparator: "Optional Walker parameters",
        tooltip:
          "If defined, the NPC will spawn inside the provided walker (only the name is required)",
        placeholder: "NPCWalkerName",
      },
      parent_walker_speed: {
        label: "Movement Speed",
        type: "number",
        tooltip: "How fast the NPC will walk",
      },
      walk_delay: {
        label: "Walk Delay",
        type: "number",
        tooltip: "Time to wait between each point",
      },
    },
  },

  configure_group: {
    name: "Configure Group",
    parameters: {
      name: {
        label: "GroupInteractionHandler name",
        type: "text",
        required: true,
        tooltip: "The Group interaction handler node name",
        placeholder: "GroupInteractionHandler name",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        tooltip: "Map where the Handler will be looked in (just the name)",
        placeholder: "MapName",
      },
    },
  },

  create_door: {
    name: "Create Door",
    additionalText:
      "If target_map is defined, target_position is required (and vice-versa)",
    parameters: {
      name: {
        label: "NPC Name",
        type: "text",
        required: true,
        tooltip: "Node name that will be given to the door",
        placeholder: "DoorName",
      },
      map_name: {
        label: "In Map",
        type: "text",
        required: true,
        placeholder: "MapName",
        tooltip: "Map where the door will be spawned",
      },
      initial_position: {
        label: "Initial position",
        type: "position",
        required: true,
        tooltip: "Where the door will spawn on the map",
      },
      resource_path: {
        label: "Resource Path",
        type: "text",
        required: true,
        tooltip: "Full path to the door scene",
        placeholder: "res://path/to/door_res.tscn",
      },
      animation: {
        label: "Animation",
        type: "text",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
      },
      faces_player: {
        label: "Faces Player",
        type: "boolean",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
      },
      facing_direction: {
        label: "Facing Direction",
        type: "dropdown",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
        elements: {
          up: "Up",
          down: "Down",
          left: "Left",
          right: "Right",
        },
      },
      target_map: {
        label: "Target Map",
        type: "text",
        tooltip: "Full path to target map resource",
        placeholder: "res://path/to/map.tscn",
      },
      target_position: {
        label: "Target Position",
        type: "position",
        tooltip: "Where the player will spawn on the next map",
      },
      is_locked: {
        label: "Is Locked",
        type: "boolean",
        default: false,
        tooltip: "If true, the door will be locked when spawned",
      },
    },
  },

  configure_door: {
    name: "Configure Door",
    additionalText:
      "If target_map is defined, target_position is required (and vice-versa)",
    parameters: {
      name: {
        label: "NPC Name",
        type: "text",
        required: true,
        tooltip: "The node name of the existing door to configure",
        placeholder: "DoorName",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        placeholder: "MapName",
        tooltip: "Map where the door will be looked in",
      },
      initial_position: {
        label: "Initial position",
        type: "position",
        tooltip: "If defined, will move to this position",
      },
      animation: {
        label: "Animation",
        type: "text",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
      },
      faces_player: {
        label: "Faces Player",
        type: "boolean",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
      },
      facing_direction: {
        label: "Facing Direction",
        type: "dropdown",
        tooltip:
          "Implementation to comply with NPC creator, which also creates doors",
        elements: {
          up: "Up",
          down: "Down",
          left: "Left",
          right: "Right",
        },
      },
      target_map: {
        label: "Target Map",
        type: "text",
        tooltip: "Full path to the target map resource",
        placeholder: "res://path/to/map.tscn",
      },
      target_position: {
        label: "Target Position",
        type: "position",
        tooltip: "Where the player will spawn in the new map",
      },
      is_locked: {
        label: "Is Locked",
        type: "boolean",
        default: false,
        tooltip: "If true, door will lock",
      },
    },
  },

  create_area: {
    name: "Create Notification Area",
    additional_text: "Will only notify when the player enters, nothing more",
    parameters: {
      name: {
        label: "Area Name",
        type: "text",
        required: true,
        tooltip: "Unique name to identify the area",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        placeholder: "MapName",
        tooltip: "The name of the map where the area will spawn",
      },
      initial_position: {
        label: "Initial Position",
        type: "position",
        required: true,
        tooltip: "Where the area will spawn inside the map",
      },
    },
  },

  create_dialogue_area: {
    name: "Create Dialogue Area",
    parameters: {
      name: {
        label: "Area Name",
        type: "text",
        required: true,
        tooltip: "Unique name to identify the area",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        tooltip: "The name of the map where the area will spawn",
      },
      initial_position: {
        label: "Initial Position",
        type: "position",
        required: true,
        tooltip: "Where the area will spawn inside the map",
      },
      dialogue_file: {
        label: "Dialogue file",
        type: "text",
        required: true,
        tooltip: "json file, starting from the dialogues resource folder",
        placeholder: "path/to/dialogue.json",
      },
      message: {
        label: "Message",
        type: "text",
        required: true,
        placeholder: "message_name",
        tooltip: "Message inside the dialogue file that will be used",
      },
    },
  },

  create_cutscene_area: {
    name: "Create Cutscene Area",
    parameters: {
      name: {
        label: "Area Name",
        type: "text",
        required: true,
        tooltip: "Unique name to identify the area",
      },
      map_name: {
        label: "Will appear in map",
        type: "text",
        required: true,
        tooltip: "The name of the map where the area will spawn",
      },
      initial_position: {
        label: "Initial Position",
        type: "position",
        required: true,
        tooltip: "Where the area will spawn inside the map",
      },
      cutscene_file: {
        label: "Cutscene File",
        type: "text",
        require: true,
        placeholder: "path/to/cutscene.json",
        tooltip: "json file, starting from the cutscenes resource folder",
      },
    },
  },

  remove_entity: {
    name: "Remove Entity",
    parameters: {
      name: {
        label: "Entity Name",
        type: "text",
        required: true,
        placeholder: "EntityName",
        tooltip: "The node name of the entity to be removed",
      },
      map_name: {
        label: "Remove from map",
        type: "text",
        required: true,
        placeholder: "MapName",
        tooltip: "The map where the entity is in",
      },
    },
  },
};
export default storylineEntityInputSchema;
