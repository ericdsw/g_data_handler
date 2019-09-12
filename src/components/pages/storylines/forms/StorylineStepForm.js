import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';

const styles = theme => ({

});

const StorylineStepForm = props => {

    const [stepName, updateStepName] = useState(
        props.stepName ? props.stepName : ''
    );

    function handleSubmit(event) {
        event.preventDefault();
        props.handleSubmit(stepName);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <TextField
                id='step_name'
                label='Step Name'
                value={stepName}
                onChange={e => updateStepName(e.target.value)}
                autoFocus
                fullWidth
                variant='outlined'
                margin='normal'
            />
            <br /><br />
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        {props.stepName ? 'Update' : 'Create'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default withStyles(styles)(StorylineStepForm);
