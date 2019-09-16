import React from 'react';
import { GenericForm } from '../../../elements';
import { bundleEntityInputSchema } from '../../../../globals';

const CompletionBundleForm = props => {

    const { buttonText = 'Create', data = {} } = props;

    const { handleSubmit } = props;

    return (
        <GenericForm
            initialDataSet={data}
            schema={bundleEntityInputSchema}
            buttonText={buttonText}
            handleSubmit={data => handleSubmit(data)}
        />
    );
}

export default CompletionBundleForm;

