import { useMemo } from 'react';
import { Box, Card, CardContent, Typography, Grid, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import EmoteBackground from '@/images/emote_background.png';
import { DialogueMessageToolbar, ConversationCardTitle } from './elements';

const EmoteImageBackground = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: 48,
  height: 48,
  padding: 8,
  margin: 0,
  background: `url(${EmoteBackground})`,
  backgroundSize: '48px 48px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  textAlign: 'center',
}));
const StyledEmoteContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.messageBackground,
  borderBottom: '1px solid #666',
  padding: theme.spacing(2),
}));

const DialogueEmote = ({
  message,
  handleDelete,
  handleAddAbove,
  handleAddBelow,
  handleSplitBelow,
}) => {
  const imagePath = useMemo(
    () => `/images/emotes/${message.message}.png`,
    [message.message]
  );

  return (
    <Grid container>
      <Grid size={12}>
        <StyledEmoteContainer>
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
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Grid>
                <Grid container sx={{
                  justifyContent: "center"
                }}>
                  <EmoteImageBackground>
                    <img
                      alt="Dialogue Emote"
                      src={imagePath}
                      style={{ width: 24, height: 24 }}
                    />
                  </EmoteImageBackground>
                </Grid>
                <br />
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ fontWeight: 'bold', color: blue[200] }}
                >
                  {message.target_object}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledEmoteContainer>
      </Grid>
      <Grid size={{ xs: 1, md: 4 }} />
    </Grid>
  );
};

export default DialogueEmote;
