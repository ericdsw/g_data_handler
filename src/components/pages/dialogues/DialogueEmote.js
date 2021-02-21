import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { DialogueMessageToolbar } from "./elements";

import { styles } from "./styles/DialogueEmoteStyle";

const DialogueEmote = ({ 
  message, 
  classes,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow
}) => {

  const imagePath = `/images/emotes/${message.message}.png`;

  return (
    <Grid container>
      <Grid item xs={1} md={4}>
        {/* Empty grid item */}
      </Grid>
      <Grid item xs={10} md={4}>
        <Card className={classes.emoteContainer}>
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

            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Grid container justify="center">
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

export default withStyles(styles)(DialogueEmote);
