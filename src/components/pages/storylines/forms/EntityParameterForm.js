import React, { useState } from 'react';
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
    const { entityType } = props;

    // Methods
    const { handleParamsChanged } = props;

    const [data, updateData] = useState({});

    function makeTextField(label, key) {

        return (
            <TextField
                id={key}
                label={label}
                onChange={e => handleInputChange(key, e.target.value)}
                value={data[key]}
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
                        checked={data[key]}
                        value={data[key]}
                    />
                }
            />
        );
    }

    function handleInputChange(key, value) {
        var newData = Object.assign({}, data, {
            [key]: value
        });
        updateData(newData);
        handleParamsChanged(newData);
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
