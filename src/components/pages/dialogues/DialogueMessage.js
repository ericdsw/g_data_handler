import React, { useMemo } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Icon,
  Grid,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import clsx from "clsx";

import { ConversationChoices, ConversationExtraParams } from "./elements";
import { DialogueMessageToolbar } from "./elements";
import { speakerSchema } from "../../../globals";

import { styles } from "./styles/DialogueMessageStyle";
import { cleanMessage } from "./functions";

const DialogueMessage = ({
  handleEdit,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
  message,
  classes,
}) => {
  const { usedImagePath, speakerName } = useMemo(() => {
    let imageResult, nameResult;

    // Extract data from speaker
    if (message.speaker) {
      imageResult = speakerSchema[message.speaker].image;
      nameResult = speakerSchema[message.speaker].name;
    }

    if (message.image) {
      imageResult = message.image;
    }
    if (message.name) {
      nameResult = message.name;
    }

    return {
      usedImagePath: imageResult,
      speakerName: nameResult,
    };
  }, [message]);

  const hasImage = useMemo(
    () => usedImagePath && usedImagePath !== "NONE",
    [usedImagePath]
  );

  const messageTextOnly = useMemo(
    () => cleanMessage(message.message),
    [message.message]
  );

  return (
    <Card square className={classes.messageContainer}>
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
              <Grid container justifyContent="center">
                <div className={classes.content}>
                  {speakerName && (
                    <div className={classes.contentSpeakerName}>
                      {speakerName}
                    </div>
                  )}
                  <Tooltip TransitionComponent={Zoom} title={message.message}>
                    <div
                      className={clsx(
                        classes.contentText,
                        hasImage ? "" : classes.contentTextNoImage
                      )}
                    >
                      {messageTextOnly}
                    </div>
                  </Tooltip>
                  {hasImage && (
                    <img
                      alt="asdf"
                      className={classes.contentImage}
                      src={`/images/${usedImagePath}`}
                    />
                  )}
                </div>
              </Grid>
            </div>

            {/* Extra Parameters */}
            <ConversationExtraParams message={message} />

            {/* Choices */}
            <ConversationChoices message={message} />

            {/* Target Object */}
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
