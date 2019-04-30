import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    TextField,
    Grid,
    Button,
} from '@material-ui/core';

const styles = theme => ({

});

class CreateJumpForm extends React.Component {

    state = {
        jump_name: '',
        jump_file: ''
    }

    submitData = event => {
        event.preventDefault();
        event.stopPropagation();

        let errorInputs = [];
        if (this.state.jump_name === '') {
            errorInputs.push('Jump Name');
        }
        if (this.state.jump_file === '') {
            errorInputs.push('Target Cutscene File');
        }

        if (errorInputs.length > 0) {
            const errorNames = errorInputs.join(', ');
            this.props.enqueueSnackbar(
                `The following inputs are required: ${errorNames}`,
                {variant:'error'}
            );
        } else {
            this.props.creationHandler(
                this.state.jump_name,
                this.state.jump_file
            );
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
                            id='jump_name'
                            label='Jump Name'
                            value={this.state.jump_name}
                            onChange={this.handleChange('jump_name')}
                            autoFocus
                            fullWidth variant='outlined' margin='normal' />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs>
                        <TextField
                            id='jump_file'
                            label='Target Cutscene File'
                            value={this.state.jump_file}
                            onChange={this.handleChange('jump_file')}
                            fullWidth variant='outlined' margin='normal' />
                    </Grid>
                </Grid>
                <Grid justify='flex-end' container>
                    <Button
                        type='submit'
                        variant='contained'
                        style={{marginTop:8}}
                        color='primary'>
                        Add Jump
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateJumpForm));

