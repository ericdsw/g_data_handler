import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Icon, Grid } from '@mui/material';

import {
  ConversationChoices,
  ConversationExtraParams,
  DialogueMessageToolbar,
  FloatingDialogue,
} from './elements';
import { speakerSchema } from '../../../globals';

import { styles } from './styles/DialogueMessageStyle';

const useStyles = makeStyles(styles);

const DialogueMessage = ({
  handleEdit,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
  message,
}) => {
  const classes = useStyles();

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
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
            <FloatingDialogue
              speakerName={speakerName}
              messageFullText={message.message}
              uiVariant={message.ui_variant}
              usedImagePath={usedImagePath}
            />

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

export default DialogueMessage;
