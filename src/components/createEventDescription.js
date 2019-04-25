
export default function createEventDescription(type, parameters) {

    switch (type) {
        case 'gain_abilities':
            return 'No description available'
        case 'animation':
            return `Animate ${parameters.object} with ${parameters.animation}`
        case 'battle':
            return `${parameters.enemy_scene} (${parameters.max_hp})`
        case 'change_bgm':
            return `New BGM: ${parameters.BGM}`
        case 'change_enemy':
            return `New Enemy: ${parameters.new_enemy}`
        case 'change_map':
            return `${parameters.map} at position ${
                (typeof parameters.position === 'object') ?
                    JSON.stringify(parameters.position) :parameters.position
            }`
        case 'change_map_state':
            return `Map alias: ${parameters.map}, new state: ${parameters.state}`
        case 'overworld_player_state':
            return `New state: ${parameters.new_state}`
        case 'color_flash':
            const { 
                color_hex, in_duration, 
                stay_duration, out_duration 
            } = parameters
            return `${color_hex} (${in_duration} | ${stay_duration} | ${out_duration})`
        case 'conditional_state_change':
            const checkMapAmount = Object.keys(parameters.checked_maps).length
            const changedMapAmount = Object.keys(parameters.target_maps).length
            return `Check ${checkMapAmount} maps to change ${changedMapAmount} maps`
        case 'jump':
            return `Jump Name: ${parameters.jump_name}`
        case 'damage_enemy':
            return `Apply ${parameters.amount} damage`
        case 'damage_player':
            return `Receive ${parameters.amount} damage`
        case 'destroy_object':
            return `Will destroy ${parameters.object}`
        case 'dialogue':
            return `${parameters.name} in file ${parameters.file}`
        case 'exit_battle':
            return `Custom return: ${
                (! parameters.custom_return_map) ? 'false' : 'true'
            }`
        case 'give_item':
            return `Give the item ${parameters.item_id}`
        case 'next_run':
            return `Next run name: ${parameters.next_run_name}`
        case 'level_up':
            return `Target level: ${parameters.target_level}`
        case 'minigame':
            return `Play ${parameters.game}`
        case 'move_camera':
            return `Focus ${parameters.target}`
        case 'move':
            return `Will move ${parameters.control}`
        case 'remove_item':
            return `Remove the item ${parameters.item_id}`
        case 'save':
            const { map_data, npc_data, player_data} = parameters
            if (!map_data && !npc_data && !player_data) {
                return 'Complete Save'
            } else {
                return 'Partial Save'
            }
        case 'shake':
            return `For ${parameters.duration} seconds, with ${parameters.shake_amount} intensity`
        case 'sound':
            return `Play sound ${parameters.sound}`
        case 'spawn_object':
            return `${parameters.object} at position ${parameters.position}`
        case 'toggle_hud':
            return `Visible: ${(parameters.should_show) ? 'true' : 'false'}`
        case 'visible':
            return `${(parameters.visible) ? 'Show' : 'Hide'} object ${parameters.object}`
        case 'wait':
            return `Wait for ${parameters.duration} seconds`
        case 'zoom':
            return `To ${parameters.target_zoom} for ${parameters.zoom_duration} seconds`
        default:
            return ''
    }
}
