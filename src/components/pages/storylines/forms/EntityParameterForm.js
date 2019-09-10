import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    FormControlLabel,
    Switch
} from '@material-ui/core';

const styles = theme => ({

});

const EntityParameterForm = props => {

    // Parameters
    const { parameters, entityType } = props;

    // Methods
    const { handleParamsChanged } = props;

    function makeTextField(label, key) {

        return (
            <TextField
                id={key}
                label={label}
                onChange={e => handleInputChange(key, e.target.value)}
                value={parameters[key]} 
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
            />
        );
    }

    function makeSwitch(label, key) {
        return (
            <FormControlLabel
                label={label}
                control={
                    <Switch
                        onChange={e => handleInputChange(key, e.target.checked)}
                        checked={parameters[key]}
                        value={parameters[key]}
                    />
                }
            />
        );
    }

    function handleInputChange(key, value) {
        handleParamsChanged(key, value);
    }

    let content;
    switch (entityType) {
        case 'create_npc':
            content = (
                <React.Fragment>
                    {makeTextField('Initial Position*', 'initial_position')}
                    {makeTextField('Resource Path*', 'resource_path')}
                    {makeTextField('Animation', 'animation')}
                    {makeSwitch('Faces Player', 'faces_player')}
                    {makeTextField('Facing Direction', 'facing_direction')}
                </React.Fragment>
            );
            break;
        case 'configure_npc':
            content = (
                <React.Fragment>
                    {makeTextField('Initial Position', 'initial_position')}
                    {makeTextField('Animation', 'animation')}
                    {makeSwitch('Faces Player', 'faces_player')}
                    {makeTextField('Facing Direction', 'facing_direction')}
                </React.Fragment>
            );
            break;
        case 'create_area':
            content = (
                <React.Fragment>
                    {makeTextField('Initial Position*', 'initial_position')}
                </React.Fragment>
            );
            break;
        default:
            content = <React.Fragment />
    }

    return content;
}

export default withStyles(styles)(EntityParameterForm);
