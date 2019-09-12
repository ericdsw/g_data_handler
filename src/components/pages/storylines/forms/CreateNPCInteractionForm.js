import React, { useState } from 'react';
import {
    Grid,
    Button,
    Typography,
} from '@material-ui/core';

import { interactionInputSchema } from '../../../../globals';
import {
    createInput
} from '../../../../functions';

const CreateNPCInteractionForm = props => {

    // Parameters
    const { interactionType } = props;

    // Methods
    const { handleSubmit } = props;

    const [formData, updateFormData] = useState({});

    let currentSchema = {};
    if (interactionType !== '') {
        currentSchema = interactionInputSchema[interactionType].parameters;
    }

    const handleInputChange = key => event => {
        const newData = Object.assign(formData, {
            [key]: event.target.value
        });
        updateFormData(newData);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (interactionType !== '') {
            for (const key in formData) {
                if (currentSchema[key].type === 'array') {
                    let value = formData[key].replace(/\s/g, '');
                    formData[key] = value.split(",");
                }
            }
            handleSubmit(formData);
        }
    }
    
    return (
        <form onSubmit={e => onSubmit(e)}>
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
            {interactionType !== '' &&
                <Typography variant='body2'>
                    <i>{interactionInputSchema[interactionType].additionalText}</i>
                </Typography>
            }
            <Grid container justify='flex-end'>
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Create
                </Button>
            </Grid>
        </form>
    );

}

export default CreateNPCInteractionForm;
