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
  moneyIconContainer: {
    color: '#ad9b0c',
  },
  moneyIcon: {
    fontSize: 30,
  },
}));

const GiveMoneyFromDialogue = ({
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

  return (
    <Card className={classes.container}>
      <CardHeader
        title={
          <ConversationCardTitle
            text="Give Money"
            icon="local_atm"
            color="#ad9b0c"
          />
        }
        subheader={`Will give ${message.amount} to the player`}
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2">{usedMessage}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GiveMoneyFromDialogue;
