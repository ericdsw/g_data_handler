import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { DirectionsWalk } from '@material-ui/icons';

import { editConversationMessage } from '../../../actions/dialogueActions';

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
  const dispatch = useDispatch();

  const changeLocation = (newLocation) => {
    dispatch(
      editConversationMessage(message.id, {
        ...message,
        location: newLocation,
      })
    );
  };

  const changeUiVariant = (newUiVariant) => {
    dispatch(
      editConversationMessage(message.id, {
        ...message,
        ui_variant: newUiVariant,
      })
    );
  };

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
  }, [message.speaker, message.image, message.name]);

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
                handleAddAbove={handleAddAbove}
                handleAddBelow={handleAddBelow}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSplitBelow={handleSplitBelow}
                omitEdit={false}
              />
            </div>
            <Grid container>
              <Grid item xs={3}>
                <Card elevation={0} style={{ padding: 20 }}>
                  <table>
                    <tr>
                      <td>Location: &nbsp;&nbsp;</td>
                      <td>
                        <ButtonGroup variant="outlined">
                          <Button
                            sx={{ textTransform: 'none' }}
                            size="small"
                            variant={
                              !message.location ? 'contained' : 'outlined'
                            }
                            onClick={() => changeLocation('')}
                          >
                            None
                          </Button>
                          <Button
                            sx={{ textTransform: 'none' }}
                            size="small"
                            variant={
                              message.location === 'top'
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => changeLocation('top')}
                          >
                            Top
                          </Button>
                          <Button
                            sx={{ textTransform: 'none' }}
                            size="small"
                            variant={
                              message.location === 'bottom'
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => changeLocation('bottom')}
                          >
                            Bottom
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                    <tr>
                      <div style={{ height: 5 }} />
                    </tr>
                    <tr>
                      <td>Variant: &nbsp;&nbsp;</td>
                      <td>
                        <ButtonGroup variant="outlined">
                          <Button
                            sx={{ textTransform: 'none' }}
                            size="small"
                            variant={
                              message.ui_variant === 'default'
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => changeUiVariant('default')}
                          >
                            Default
                          </Button>
                          <Button
                            sx={{ textTransform: 'none' }}
                            size="small"
                            variant={
                              message.ui_variant === 'battle'
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => changeUiVariant('battle')}
                          >
                            Transparent
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </table>
                </Card>
              </Grid>
              <Grid item xs>
                <FloatingDialogue
                  fullMessage={message}
                  speakerName={speakerName}
                  messageFullText={message.message}
                  uiVariant={message.ui_variant}
                  usedImagePath={usedImagePath}
                />
              </Grid>
            </Grid>

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
                <DirectionsWalk />
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
