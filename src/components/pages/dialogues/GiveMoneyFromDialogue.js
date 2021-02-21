import React, { useMemo } from 'react';
import { 
  Icon, Card, CardContent, Typography, Grid, makeStyles 
} from '@material-ui/core';
import { DialogueMessageToolbar } from "./elements";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#222",
    borderBottom: "1px solid #666",
  },
  moneyIconContainer: {
    color: '#ad9b0c',
  },
  moneyIcon: {
    fontSize: 30,
  }
});

const GiveMoneyFromDialogue = ({ 
  message, 
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow
}) => {

  const classes = useStyles();

  const usedMessage = useMemo(() => {
    return !message.custom_message ?
      'Will use the default message' :
      `Custom message: ${message.custom_message}` 
  }, [message.custom_message]);

  return (
    <Card className={classes.container}>
      <CardContent>
        <Grid container justify="flex-end">
          <DialogueMessageToolbar
            message={message}
            handleAddAbove={(data) => handleAddAbove(data)}
            handleAddBelow={(data) => handleAddBelow(data)}
            handleEdit={() => {
              /* No edit logic */
            }}
            handleDelete={() => handleDelete()}
            handleSplitBelow={(conversationName) => {
              handleSplitBelow(conversationName);
            }}
            omitEdit={true}
          />
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems="flex-end" className={classes.moneyIconContainer}>
              <Icon className={classes.moneyIcon}>
                local_atm
              </Icon>
              &nbsp;
              <Typography variant="body1">
                Give Money
              </Typography>
            </Grid>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Will give {message.amount} to the player
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {usedMessage}
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

export default GiveMoneyFromDialogue;
