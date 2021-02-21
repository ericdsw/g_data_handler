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
  itemIconContainer: {
    color: '#2d81b5',
  },
  itemIcon: {
    fontSize: 30,
  }
});

const GiveItemFromDialogue = ({ 
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
            <Grid container alignItems="flex-end" className={classes.itemIconContainer}>
              <Icon className={classes.itemIcon}>
                card_giftcard
              </Icon>
              &nbsp;
              <Typography variant="body1">
                Give Item
              </Typography>
            </Grid>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Will the item with the id {message.item_id} to the player
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

export default GiveItemFromDialogue;
