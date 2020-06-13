import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { DialogActions, DialogTitle, Button } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

const styles = (theme) => ({
  cancelButton: {
    color: red[500],
  },
  confirmButton: {
    color: green[500],
  },
});
const confirmationDialogueContent = (props) => {
  const { message, classes } = props;
  const { handleClose, handleConfirm } = props;
  return (
    <React.Component>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button className={classes.cancelButton} onClick={handleClose}>
          No
        </Button>
        <Button className={classes.confirmButton} onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </React.Component>
  );
};

export default withStyles(styles)(confirmationDialogueContent);
