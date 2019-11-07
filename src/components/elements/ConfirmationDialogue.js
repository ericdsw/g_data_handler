import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const styles = theme => ({
    cancelButton: {
        color: red[500],
    },
    confirmButton: {
        color: green[500]
    }
});

const ConfirmationDialogue = props => {

    const { 
        isOpen = false, handleClose, handleConfirm, message, classes,
        descriptionText = '' 
    } = props;

    if (! isOpen) {
        return <React.Fragment />
    } else {
        return (
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth={true}
                maxWidth='sm'
            >
                <DialogTitle>{message}</DialogTitle>
                {descriptionText !== '' && 
                    <DialogContent>
                        <Typography variant='subtitle2'>
                            {descriptionText}
                        </Typography>
                    </DialogContent>
                }
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
}

export default withStyles(styles)(ConfirmationDialogue);
