import React, { useState } from 'react';
import {
    Grid,
    Button,
    TextField
} from '@material-ui/core';

import { completionInputSchema } from '../../../../globals';
import { createInput } from '../../../../functions';

const CompleteConditionForm = props => {

    // Parameters
    const { completionType, conditionParams = {}, name = '' } = props;

    // Methods
    const { handleSubmit } = props;

    const [formData, updateFormData] = useState(conditionParams);
    const [uniqueName, updateUniqueName] = useState(name);

    let currentSchema = {};
    if (completionType !== '') {
        currentSchema = completionInputSchema[completionType].parameters;
    }

    const handleInputChange = key => event => {
        const newData = {...formData};
        newData[key] = event.target.value;
        updateFormData(newData);
    }

    function onSubmit(e) {
        e.preventDefault();
        handleSubmit(uniqueName, formData);
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <TextField
                id='unique_name'
                label='Unique Name *'
                onChange={e => updateUniqueName(e.target.value)}
                value={uniqueName}
                fullWidth
                variant='outlined'
                margin='normal'
            />
            {Object.keys(currentSchema).map((inputName, index) => (
                <React.Fragment key={inputName}>
                    {createInput(
                        inputName,
                        currentSchema[inputName],
                        formData[inputName],
                        handleInputChange
                    )}
                </React.Fragment>
            ))}
            <br /><br />
            <Grid container justify='flex-end'>
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    {name === '' ? 'Create' : 'Edit'}
                </Button>
            </Grid>
        </form>
    );

}

export default CompleteConditionForm;
