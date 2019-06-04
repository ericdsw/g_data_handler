import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Dialog, 
    DialogActions,
    DialogTitle,
    Button
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';

const styles = theme => ({
    cancelButton: {
        color: red[500],
    },
    confirmButton: {
        color: green[500]
    }
});

const ConfirmationDialogue = (props) => {
    const { isOpen, handleClose, handleConfirm, message, classes } = props;
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
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
                    className={classes.confirmButton}
                    onClick={handleConfirm} 
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(ConfirmationDialogue);
