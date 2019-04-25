import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    TextField,
    Grid,
    Button,
    Snackbar,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    }
})

class CreateJumpForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jump_name: '',
            jump_file: '',
            errorMessage: ''
        }
    }

    submitData = event => {
        event.preventDefault()
        event.stopPropagation()

        let errorInputs = []
        if (this.state.jump_name === '') {
            errorInputs.push('Jump Name')
        }
        if (this.state.jump_file === '') {
            errorInputs.push('Target Cutscene File')
        }

        if (errorInputs.length > 0) {
            const errorNames = errorInputs.join(', ')
            this.setState({
                errorMessage: `The following inputs are required: ${errorNames}`
            })
        } else {
            this.props.creationHandler(
                this.state.jump_name,
                this.state.jump_file
            )
        }
    }

    handleChange = identifier => event => {
        this.setState({
            [identifier]: event.target.value
        })
    }

    render() {
        const { classes } = this.props
        return (
            <form onSubmit={this.submitData}>
                <Grid container>
                    <Grid item xs>
                        <TextField
                            id='jump_name'
                            label='Jump Name'
                            value={this.state.jump_name}
                            onChange={this.handleChange('jump_name')}
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

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={this.state.errorMessage !== ''}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={
                        <span id='message-id'>
                            {this.state.errorMessage}
                        </span>
                    }
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                />


            </form>
        )
    }
}

export default withStyles(styles)(CreateJumpForm)

