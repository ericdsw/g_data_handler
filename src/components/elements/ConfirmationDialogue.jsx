import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { red, green } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: red[400],
  },
  confirmButton: {
    color: green[400],
  },
}));

const ConfirmationDialogue = ({
  isOpen = false,
  handleClose,
  handleConfirm,
  message,
  descriptionText = '',
}) => {
  const classes = useStyles();

  if (!isOpen) {
    return <React.Fragment />;
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>{message}</DialogTitle>
      {descriptionText !== '' && (
        <DialogContent>
          <Typography variant="subtitle2">{descriptionText}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button className={classes.cancelButton} onClick={handleClose}>
          No
        </Button>
        <Button className={classes.confirmButton} onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogue;
