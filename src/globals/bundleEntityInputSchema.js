const bundleEntityInputSchema = {

    additionalText: 'Cutscene will take precedence over fade. Affected map must be defined for either of them to work',
    parameters: {
        next_step: {
            label: 'Next Step',
            type: 'text',
            required: true
        }, 
        use_fade: {
            label: 'Use Fade',
            type: 'boolean'
        }, 
        change_cutscene: {
            label: 'Change Cutscene',
            type: 'text',
            placeholder: 'json file, starting from the cutscenes res folder'
        },
        affected_map: {
            label: 'Affected Map Name',
            type: 'text',
            placeholder: 'Fade/cutscene will only happen if this is the current map'
        }
    }

}

export default bundleEntityInputSchema;
