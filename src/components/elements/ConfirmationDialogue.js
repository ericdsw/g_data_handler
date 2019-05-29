import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Dialog, 
    DialogActions,
    DialogTitle,
    Button
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    cancelButton: {
        color: red[500],
    },
});

class ConfirmationDialogue extends React.Component {

    props = {
        isOpen: false
    }

    handleConfirm = () => {
        const { confirmAction } = this.props;
        confirmAction();
    }

    render() {
        const { message, classes, isOpen, handleClose } = this.props;
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth='sm'
            >
                <DialogTitle>{message}</DialogTitle>
                <DialogActions>
                    <Button 
                        className={classes.cancelButton}
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button 
                        onClick={this.handleConfirm} 
                        color='primary'
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ConfirmationDialogue);
