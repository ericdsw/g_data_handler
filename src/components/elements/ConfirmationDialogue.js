import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Dialog, 
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    cancelButton: {
        backgroundColor: red[500],
    },
});

class ConfirmationDialogue extends React.Component {

    state = {
        isOpen: false
    }

    handleClose = () => {
        this.setState({isOpen: false});
    }

    handleConfirm = () => {
        const { confirmAction } = this.props;
        this.setState({isOpen: false});
        confirmAction();
    }

    render() {
        const { message, classes } = this.props;
        return (
            <Dialog
                open={this.state.isOpen}
                onClose={this.handleClose}
            >
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        className={classes.cancelButton}
                        onClick={this.handleClose}
                        variant='contained'
                    >
                        No
                    </Button>
                    <Button 
                        onClick={this.handleConfirm} 
                        color='primary'
                        variant='contained'
                    >
                        Yea
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ConfirmationDialogue);
