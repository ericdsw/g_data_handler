import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { red, green } from '@mui/material/colors';

const ConfirmationDialogue = ({
  isOpen = false,
  handleClose,
  handleConfirm,
  message,
  descriptionText = '',
}) => {
  if (!isOpen) {
    return <></>;
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
        <Button sx={{ color: red[400] }} onClick={handleClose}>
          No
        </Button>
        <Button sx={{ color: green[400] }} onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogue;
