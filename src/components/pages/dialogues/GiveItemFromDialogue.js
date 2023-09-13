import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { DialogueMessageToolbar, ConversationCardTitle } from './elements';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.messageBackground,
    borderBottom: '1px solid #666',
    padding: theme.spacing(2),
  },
  itemIconContainer: {
    color: '#2d81b5',
  },
  itemIcon: {
    fontSize: 30,
  },
}));

const GiveItemFromDialogue = ({
  message,
  handleEdit,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
}) => {
  const classes = useStyles();

  const usedMessage = useMemo(() => {
    return !message.custom_message
      ? 'Will use the default message'
      : `Custom message: ${message.custom_message}`;
  }, [message.custom_message]);

  const subHeaderMessage = useMemo(() => {
    if (message.amount <= 1) {
      return `Will give the item with the id ${message.item_id} to the player`;
    }
    return `Will give ${message.amount} instances of the item ${message.item_id} to the player`;
  }, [message.item_id, message.amount]);

  return (
    <Card className={classes.container}>
      <CardHeader
        title={
          <ConversationCardTitle
            text="Give Item"
            icon="card_giftcard"
            color="#2d81b5"
          />
        }
        subheader={subHeaderMessage}
        action={
          <DialogueMessageToolbar
            message={message}
            handleAddAbove={(data) => handleAddAbove(data)}
            handleAddBelow={(data) => handleAddBelow(data)}
            handleEdit={handleEdit}
            handleDelete={() => handleDelete()}
            handleSplitBelow={(conversationName) => {
              handleSplitBelow(conversationName);
            }}
          />
        }
      />
      <CardContent>
        {message.show_fanfare && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body2">{usedMessage}</Typography>
            </Grid>
            <Grid item xs={12}>
              {message.flavor_message && (
                <Typography variant="caption">
                  Flavor: {message.flavor_message}
                </Typography>
              )}
              {!message.flavor_message && (
                <Typography variant="caption">No flavor defined</Typography>
              )}
            </Grid>
          </Grid>
        )}
        {!message.show_fanfare && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <b>Will skip fanfare &nbsp;(ಥ_ಥ)</b>
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default GiveItemFromDialogue;
