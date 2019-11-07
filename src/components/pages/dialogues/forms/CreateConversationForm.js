import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    TextField,
    Grid,
    Button
} from '@material-ui/core';

const styles = theme => ({
 
});

class CreateConversationForm extends React.Component {

    state = {
        conversationName: ''
    }

    isEdit = false;

    constructor(props) {
        super(props);
        if (props.conversationName) {
            this.state = {
                conversationName: props.conversationName
            }
            this.isEdit = true;
        }
    }

    submitData = event => {

        event.preventDefault();
        event.stopPropagation();

        if (this.state.conversationName === '') {
            this.props.enqueueSnackbar(
                'The conversation name is required',
                {variant:'error'}
            );
        } else {
            this.props.creationHandler(this.state.conversationName);
        }
    }

    handleChange = identifier => event => {
        this.setState({
            [identifier]: event.target.value
        });
    }

    render() {

        let buttonText = 'Create Conversation';
        if (this.isEdit) {
            buttonText = 'Edit Conversation';
        }

        return (
            <form onSubmit={this.submitData}>
                <Grid container>
                    <Grid item xs>
                        <TextField
                            id='conversationName'
                            label='Conversation Name'
                            value={this.state.conversationName}
                            onChange={this.handleChange('conversationName')}
                            autoFocus
                            fullWidth variant='outlined' margin='normal' />
                        </Grid>
                    </Grid>
                    <Grid justify='flex-end' container>
                        <Button
                            type='submit'
                            variant='contained'
                            style={{marginTop:16}}
                            color='primary'
                        >
                            {buttonText}
                        </Button>
                    </Grid>
            </form>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateConversationForm));
