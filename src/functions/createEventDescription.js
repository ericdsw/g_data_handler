/**
 * This method will generate the appropiate description for the defined
 * event type and parameters
 */
export default function createEventDescription(type, parameters) {
  switch (type) {
    case 'gain_abilities':
      return `Max allowed level: ${parameters.max_level}`;
    case 'animation':
      return `Animate ${parameters.object} with ${parameters.animation}`;
    case 'battle':
      return `${parameters.enemy_scene} (${parameters.max_hp})`;
    case 'change_bgm':
      if (parameters.BGM === '') {
        return 'Will mute BGM';
      } else {
        return `New BGM: ${parameters.BGM}`;
      }
    case 'change_enemy':
      return `New Enemy: ${parameters.new_enemy}`;
    case 'change_map':
      return `${parameters.map} at position ${
        typeof parameters.position === 'object'
          ? JSON.stringify(parameters.position)
          : parameters.position
      }`;
    case 'change_map_state':
      return `Map alias: ${parameters.map}, new state: ${parameters.state}`;
    case 'overworld_player_state':
      return `New state: ${parameters.new_state}`;
    case 'color_flash':
      const { color_hex, in_duration, stay_duration, out_duration } =
        parameters;
      const data = `${in_duration} | ${stay_duration} | ${out_duration}`;
      return `${color_hex} (${data})`;
    case 'conditional_state_change':
      const checkMapAmount = Object.keys(parameters.checked_maps).length;
      const changedMapAmount = Object.keys(parameters.target_maps).length;
      return `Check ${checkMapAmount} maps to change ${changedMapAmount} maps`;
    case 'jump':
      return `Jump Name: ${parameters.jump_name}`;
    case 'damage_enemy':
      return `Apply ${parameters.amount} damage`;
    case 'damage_player':
      return `Receive ${parameters.amount} damage`;
    case 'destroy_object':
      return `Will destroy ${parameters.object}`;
    case 'dialogue':
      return `${parameters.name} in file ${parameters.file}`;
    case 'exit_battle':
      return `Custom return: ${
        !parameters.custom_return_map ? 'false' : 'true'
      }`;
    case 'give_item':
      return `Give the item ${parameters.item_id}`;
    case 'next_run':
      return `Next run name: ${parameters.next_run_name}`;
    case 'level_up':
      return `Target level: ${parameters.target_level}`;
    case 'minigame':
      return `Play ${parameters.game}`;
    case 'move_camera':
      return `Focus ${parameters.target}`;
    case 'move':
      const { control, destination } = parameters;
      if (typeof destination === 'object') {
        if (destination.length <= 1) {
          return `Will move ${control} to ${destination[0]}`;
        } else {
          return `Will move ${control} ${destination.length} positions`;
        }
      } else {
        return `Will move ${control} to ${destination}`;
      }
    case 'remove_item':
      return `Remove the item ${parameters.item_id}`;
    case 'save':
      const { map_data, npc_data, player_data } = parameters;
      if (!map_data && !npc_data && !player_data) {
        return 'Complete Save';
      } else {
        return 'Partial Save';
      }
    case 'shake':
      const { duration, shake_amount, shake_id } = parameters;
      if (shake_amount <= 0){
        if (!shake_id) {
          return `Will cancel all active shakes`
        }
        return `Will cancel shake transaction with id: ${shake_id}`;
      }
      if (duration > 0) {
        return `For ${duration} seconds, with ${shake_amount} intensity (ID: ${shake_id || 'Not Specified'})`;
      }
      return `Will shake with intensity ${shake_amount} indefinitely (ID: ${shake_id || 'Not Specified'})`
    case 'sound':
      return `Play sound ${parameters.sound}`;
    case 'spawn_object':
      return `${parameters.object} at position ${
        typeof parameters.position === 'object'
          ? JSON.stringify(parameters.position)
          : parameters.position
      }`;
    case 'toggle_hud':
      return `Visible: ${parameters.should_show ? 'true' : 'false'}`;
    case 'visible':
      const { visible, object } = parameters;
      return `${visible ? 'Show' : 'Hide'} object ${object}`;
    case 'wait':
      return `Wait for ${parameters.duration} seconds`;
    case 'zoom':
      const { target_zoom, zoom_duration } = parameters;
      return `To ${target_zoom} for ${zoom_duration} seconds`;
    case 'ability_toggle':
      const { enabled, ability_name } = parameters;
      return `${enabled ? 'Enable' : 'Disable'} the ability ${ability_name}`;
    case 'emote':
      const { target_object, emote } = parameters;
      return `${target_object} will show '${emote}'`;
    case 'create_follower':
      return `Create follower with id: ${parameters.follower_id}`;
    case 'remove_follower':
      return `Remove follower with id: ${parameters.follower_id}`;
    case 'capture_follower':
      return `Capture ${parameters.target_object} with id ${parameters.follower_id}`;
    case 'action_command':
      return `Wait for action ${parameters.action}`;
    case 'glitch':
      return 'Will show graphical glitch';
    case 'storyline_message':
      return `Will emit storyline message: "${parameters.message_name}"`;
    case 'look_at':
      return `Node ${parameters.subject} will look at ${parameters.look_target}`;
    case 'inject_bgm_player':
      if (!parameters.intro_res && !parameters.bgm_res) {
        return `No resources, bgm will fade out.`;
      }
      if (!parameters.intro_res) {
        return `Will inject bgm ${parameters.bgm_res}`;
      }
      return `Will inject bgm ${parameters.bgm_res} with intro ${parameters.intro_res}`;
    case 'clear_injected_bgm':
      return `Will clear any custom bgm playing`;
    case 'change_node_property':
      return `Will modify props in node ${parameters.node}`;
    case 'call_node_method':
      return `Will call ${parameters.method_name} in node ${parameters.node_name}`;
    case 'give_memory':
      return `Will give the memory ${parameters.memory_name}`;
    case 'toggle_memory_lock':
      return `Will ${parameters.locked ? 'lock' : 'unlock'} the memory ${
        parameters.memory_name
      }`;
    case 'toggle_memory':
      return `Will turn the memory ${parameters.memory_name} ${
        parameters.active ? 'on' : 'off'
      }`;
    case 'give_currency':
      return `Will add ${parameters.given_amount} to the wallet`;
    case 'seed_next_run':
      return `Will apply the seed ${parameters.seed_name} to the next run.`;
    case 'toggle_player_control':
      if (parameters.control_status) {
        return 'Will return control to the player';
      }
      return 'Will take away control from the player';
    case 'toggle_pocket_dimension':
      if (parameters.mantle_lifted) {
        return 'Mantle will be lifted';
      }
      return 'Mantle will be lowered';
    case 'branching_player_input':
      return 'Will branch depending on the player input';
    case 'toggle_cutscene_bars':
      return `Will ${parameters.bars_visible ? 'Show' : 'Hide'} bars`;
    case 'slowdown_event':
      return `Will modify world time scale to ${parameters.world_speed} (duration: ${parameters.transition_duration})`;
    case 'look_at_direction':
      let dirWord = "";
      switch (parameters.direction) {
        case "up":
          dirWord = "up";
          break;
        case "down":
          dirWord = "down";
          break;
        case "left":
          dirWord = "to the left"
          break;
        case "right":
          dirWord = "to the right";
          break;
        default:
          break;
      }

      return `Will look ${dirWord}`
    case 'mark_flashback_visited':
      return `Will mark the flashback ${parameters.flashback_name} as visited`;
    case 'mark_active_flashback':
      if (parameters.flashback_name) {
        return `Will mark the flashback ${parameters.flashback_name} as active`;
      }
      return `Will remove any active flashback`;
    default:
      return '';
  }
}
