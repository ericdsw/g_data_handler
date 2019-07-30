// This method will generate the appropiate description for the defined
// event type and parameters
export default function createEventDescription(type, parameters) {

    switch (type) {
        case 'gain_abilities':
            return `Max allowed level: ${parameters.max_level}`
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
                (typeof parameters.position === 'object') ?
                    JSON.stringify(parameters.position) : parameters.position
            }`;
        case 'change_map_state':
            return `Map alias: ${parameters.map}, new state: ${parameters.state}`;
        case 'overworld_player_state':
            return `New state: ${parameters.new_state}`;
        case 'color_flash':
            const { 
                color_hex, in_duration, 
                stay_duration, out_duration 
            } = parameters;
            const data = `${in_duration} | ${stay_duration} } ${out_duration}`
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
                (! parameters.custom_return_map) ? 'false' : 'true'
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
            const { map_data, npc_data, player_data} = parameters;
            if (!map_data && !npc_data && !player_data) {
                return 'Complete Save';
            } else {
                return 'Partial Save';
            }
        case 'shake':
            const { duration, shake_amount } = parameters;
            return `For ${duration} seconds, with ${shake_amount} intensity`;
        case 'sound':
            return `Play sound ${parameters.sound}`;
        case 'spawn_object':
            return `${parameters.object} at position ${
                (typeof parameters.position === 'object') ?
                JSON.stringify(parameters.position) : parameters.position
            }`;
        case 'toggle_hud':
            return `Visible: ${(parameters.should_show) ? 'true' : 'false'}`;
        case 'visible':
            const { visible, object } = parameters;
            return `${(visible) ? 'Show' : 'Hide'} object ${object}`;
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
        default:
            return '';
    }
}
