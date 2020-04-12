import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Icon,
  Grid,
} from "@material-ui/core";

import { ConversationChoices, ConversationExtraParams } from "./elements";
import { DialogueMessageToolbar } from "./elements";
import { speakerSchema } from "../../../globals";

import { styles } from "./styles/DialogueMessageStyle";

const DialogueMessage = (props) => {
  const { message, classes } = props;

  const {
    handleEdit,
    handleDelete,
    handleAddAbove,
    handleAddBelow,
    handleSplitBelow,
  } = props;

  let usedImagePath, speakerName;

  // Extract data from speaker
  if (message.speaker) {
    usedImagePath = speakerSchema[message.speaker].image;
    speakerName = speakerSchema[message.speaker].name;
  }

  if (message.image) {
    usedImagePath = message.image;
  }
  if (message.name) {
    speakerName = message.name;
  }

  return (
    <Card square={true} className={classes.messageContainer}>
      {message.interrupts && (
        <div className={classes.interruptDiv}>
          <Typography align="center" variant="body2">
            <b>Interrupts Previous</b>
          </Typography>
        </div>
      )}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                {message.speaker && (
                  <Typography
                    variant="caption"
                    className={classes.subTitle}
                    align="left"
                  >
                    Speaker: {message.speaker}
                  </Typography>
                )}

                <Typography
                  variant="h6"
                  className={classes.title}
                  align="left"
                  gutterBottom
                >
                  {speakerName}
                </Typography>
              </div>
              <DialogueMessageToolbar
                message={message}
                handleAddAbove={(data) => handleAddAbove(data)}
                handleAddBelow={(data) => handleAddBelow(data)}
                handleEdit={(data) => handleEdit(data)}
                handleDelete={() => handleDelete()}
                handleSplitBelow={(conversationName) =>
                  handleSplitBelow(conversationName)
                }
                omitEdit={false}
              />
            </div>
            <div className={classes.details}>
              {usedImagePath && (
                <div className={classes.contentImage}>
                  <Avatar
                    className={classes.avatar}
                    src={`/images/${usedImagePath}`}
                  />
                </div>
              )}
              <div className={classes.content}>{message.message}</div>
            </div>

            <ConversationExtraParams message={message} />

            <ConversationChoices message={message} />
            {message.target_object && (
              <Typography
                variant="body1"
                className={classes.targetObject}
                align="right"
              >
                <Icon>directions_walk</Icon>
                {message.target_object}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(DialogueMessage);
