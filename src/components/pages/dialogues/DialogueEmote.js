import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid, CardHeader } from '@mui/material';

import { DialogueMessageToolbar, ConversationCardTitle } from './elements';

import { styles } from './styles/DialogueEmoteStyle';

const useStyles = makeStyles(styles);

const DialogueEmote = ({
  message,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
}) => {
  const classes = useStyles();
  const imagePath = useMemo(
    () => `/images/emotes/${message.message}.png`,
    [message.message]
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card className={classes.emoteContainer}>
          <CardHeader
            title={
              <ConversationCardTitle
                text="Show Emote"
                icon="mood"
                color="#ab47bc"
              />
            }
            subheader="Will show the following emote:"
            action={
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
            }
          />
          <CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Grid container justifyContent="center">
                  <div className={classes.emoteImageBackground}>
                    <img
                      alt="asdflol"
                      src={imagePath}
                      className={classes.emoteImage}
                    />
                  </div>
                </Grid>
                <br />
                <Typography
                  align="center"
                  variant="body1"
                  className={classes.emoteTarget}
                >
                  {message.target_object}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} md={4}>
        {/* Empty grid item */}
      </Grid>
    </Grid>
  );
};

export default DialogueEmote;
