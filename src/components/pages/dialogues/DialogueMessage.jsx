import { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { DirectionsWalk } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

import { editConversationMessage } from '@/actions/dialogueActions';
import { speakerSchema } from '@/globals';
import {
  ConversationChoices,
  ConversationExtraParams,
  DialogueMessageToolbar,
  FloatingDialogue,
} from './elements';

const StyledMessageContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.messageBackground,
  position: 'relative',
  borderBottom: '1px solid #666',
  padding: theme.spacing(2),
}));

const DialogueMessage = ({
  handleEdit,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
  message,
}) => {
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
    <StyledMessageContainer square>
      {message.interrupts && (
        <Box sx={{
          background: red[600],
          color: 'white',
          padding: 6,
        }}>
          <Typography align="center" variant="body2">
            <b>Interrupts Previous</b>
          </Typography>
        </Box>
      )}
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                {message.speaker && (
                  <Typography
                    variant="caption"
                    align="left"
                    sx={theme => ({
                      color: theme.palette.getContrastText(theme.palette.messageBackground),
                    })}
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
              <Grid size={3}>
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
              <Grid size="grow">
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
                sx={{ color: blue[200] }}
                align="right"
              >
                <DirectionsWalk />
                {message.target_object}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </StyledMessageContainer>
  );
};

export default DialogueMessage;
