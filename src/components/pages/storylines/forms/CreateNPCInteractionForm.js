import React from 'react';
import { interactionInputSchema } from '../../../../globals';
import { GenericForm } from '../../../elements';

const CreateNPCInteractionForm = props => {

    // Parameters
    const { data = {}, interactionType = '', buttonText = 'Create' } = props;

    // Methods
    const { handleSubmit } = props;

    let currentSchema = {};
    if (interactionType !== '') {
        currentSchema = interactionInputSchema[interactionType];
    }
    
    const onSubmit = data => {
        handleSubmit(data);
    }
    
    if (interactionType !== '') {
        return (
            <GenericForm
                initialDataSet={data}
                schema={currentSchema}
                buttonText={buttonText}
                handleSubmit={data => onSubmit(data)}
            />
        )
    }
    return <React.Fragment />
}

export default CreateNPCInteractionForm;
