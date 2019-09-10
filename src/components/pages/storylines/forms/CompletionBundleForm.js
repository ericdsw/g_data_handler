import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Grid
} from '@material-ui/core';

const styles = theme => ({

});

const CompletionBundleForm = props => {

    const { handleSubmit } = props;

    const [data, updateData] = useState({
        next_step: '',
        use_fade: false,
        change_cutscene: '',
        affected_map: '',
        conditions: []
    });

    function onSubmit(event) {
        event.preventDefault();
        handleSubmit(data);
    }

    function handleInputChange(key, value) {
        updateData(Object.assign({}, data, {
            [key]: value
        }));
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <TextField
                label='Next Step'
                id='next_step'
                fullWidth
                value={data['next_step']}
                onChange={(e) => handleInputChange('next_step', e.target.value)}
                variant='outlined'
                margin='normal'
            />
            <FormControlLabel
                label='Use Fade'
                control={
                    <Switch
                        onChange={e => {
                            handleInputChange('use_fade', e.target.checked)
                        }}
                        checked={data['use_fade']}
                        value={data['use_fade']}
                    />
                }
            />
            <TextField
                label='Change Cutscene'
                id='change_cutscene'
                fullWidth
                value={data['change_cutscene']}
                onChange={(e) => {
                    handleInputChange('change_cutscene', e.target.value)
                }}
                variant='outlined'
                margin='normal'
            />
            <TextField
                label='Affected Map'
                id='affected_map'
                fullWidth
                value={data['affected_map']}
                onChange={(e) => {
                    handleInputChange('affected_map', e.target.value);
                }}
                variant='outlined'
                margin='normal'
            />
            <br /><br />
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

export default withStyles(styles)(CompletionBundleForm);

