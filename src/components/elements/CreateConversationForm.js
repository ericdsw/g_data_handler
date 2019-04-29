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
        return (
            <form onSubmit={this.submitData}>
                <Grid container>
                    <Grid item xs>
                        <TextField
                            id='conversationName'
                            label='Conversation Name'
                            value={this.state.conversationName}
                            onChange={this.handleChange('conversationName')}
                            fullWidth variant='outlined' margin='normal' />
                        </Grid>
                    </Grid>
                    <Grid justify='flex-end' container>
                        <Button
                            type='submit'
                            variant='contained'
                            style={{marginTop:8}}
                            color='primary'>
                            Add Conversation
                        </Button>
                    </Grid>
            </form>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateConversationForm));
