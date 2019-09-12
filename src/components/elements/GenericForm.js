import React from 'react';
import {
    TextField
} from '@material-ui/core';

class GenericForm extends React.Component {

    onSubmit = event => {
        event.preventDefault();
    }

    handleInputChange = inputId => event => {
        const { fieldSchema } = this.props;
        const inputStructure = fieldSchema[inputId];
        if (inputStructure.type === 'boolean') {

        } else {

        }
    }

    constructor(props) {
        super(props);

    }

    // // Parameters
    // const { schema, submitMessage } = props;

    // // Methods
    // const { handleSubmit } = props;

    // function onFormSubmit(event) {
    //     event.preventDefault();
    //     handleSubmit(event);
    // }

    

    // return (
    //     <form onSubmit={e => onFormSubmit(e)}>
    //         {schema.map((inputData, index) => (
    //             <div />
    //         ))}
    //     </form>
    // );

}

export default GenericForm;
