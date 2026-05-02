import { useMemo } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';

import { DialogueMessageToolbar, ConversationCardTitle } from './elements';

const GiveMoneyFromDialogue = ({
  message,
  handleEdit,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
}) => {

  const usedMessage = useMemo(() => {
    return !message.custom_message
      ? 'Will use the default message'
      : `Custom message: ${message.custom_message}`;
  }, [message.custom_message]);

  return (
    <Card sx={(theme) => ({
      backgroundColor: theme.palette.messageBackground,
      borderBottom: '1px solid #666',
      padding: theme.spacing(2),
    })}>
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
          <Grid size={12}>
            <Typography variant="body2">{usedMessage}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GiveMoneyFromDialogue;
