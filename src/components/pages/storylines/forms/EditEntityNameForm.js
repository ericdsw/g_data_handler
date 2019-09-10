import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';

const EditEntityNameForm = props => {

    // Parameters
    const { curName } = props;

    // Methods
    const { handleSubmit } = props;

    const [entityName, updateEntityName] = useState(curName);

    function onSubmit(event) {
        event.preventDefault();
        handleSubmit(entityName);
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <TextField
                id='entity_name'
                label='Entity Name'
                value={entityName}
                onChange={e => updateEntityName(e.target.value)}
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
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditEntityNameForm;
