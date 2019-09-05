import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Grid
} from '@material-ui/core';

import EntityParameterForm from './EntityParameterForm';

const styles = theme => ({

});

const CreateMapEntityForm = props => {

    const [formData, updateFormData] = useState({
        entityName: '',
        entityType: 'create_npc',
        mapName: props.mapName ? props.mapName : '',
        paramData: {}
    });

    const possibleTypes = {
        'create_npc': 'Create NPC',
        'configure_npc': 'Configure NPC',
        'create_area': 'Create Area'
    }

    function parametersChanged(newData) {
        updateFormData(Object.assign({}, formData, {
            paramData: newData
        }));
    }

    function handleInputChange(key, value) {
        var newFormData = Object.assign({}, formData, {
            [key]: value
        });
        updateFormData(newFormData);
    }

    function submitData(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={e => submitData(e)}>
            <TextField
                id='entity_name'
                label='Entity Name'
                onChange={e => handleInputChange('entityName', e.target.value)}
                value={formData.entityName}
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
            />
            <TextField
                id='entity_type'
                label='Type'
                select
                fullWidth
                value={formData.entityType}
                onChange={e => handleInputChange('entityType', e.target.value)}
                variant='outlined'
                margin='normal'
            >
                {Object.keys(possibleTypes).map((type, index) => (
                    <MenuItem key={type} value={type}>
                        <Typography variant='body1'>
                            {possibleTypes[type]}
                        </Typography>
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id='map_name'
                label='Map Name'
                onChange={e => handleInputChange('mapName', e.target.value)}
                value={formData.mapName}
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
                disabled={props.mapName}
            />
            <br /><br />

            <Typography variant='h6'>
                Additional Parameters
            </Typography>

            <EntityParameterForm
                entityType={formData.entityType}
                handleParamsChanged={newData => parametersChanged(newData)}
            />

            <br /> <br />

            <Grid 
                container
                justify='flex-end'
            >
                <Grid item>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default withStyles(styles)(CreateMapEntityForm);
