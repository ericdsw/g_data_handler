import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tooltip,
  Zoom,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { DialogueMessageToolbar, ConversationCardTitle } from './elements';
import { cleanMessage } from './functions';

const SwarmContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.messageBackground,
  borderBottom: '1px solid #666',
  padding: theme.spacing(2),
}));
/**
 * Dimensions, colors and fonts mimics how the dialogues are being displayed in-game
 */
const SwarmMessageTextWrapper = styled(Box)(({ theme }) => ({
  width: 188 * 2,
  height: 28 * 2,
  borderRadius: 6 * 2,
  fontSize: 12 * 2,
  color: '#000',
  backgroundColor: '#C9C3B8',
  fontFamily: "'JF Dot Ayu Gothic 18'",
  border: '2px solid #272523',
}));

const MessageSwarm = ({
  swarmData,
  handleEdit,
  handleDelete,
  handleSplitBelow,
}) => {

  return (
    <SwarmContainer square={true}>
      <CardHeader
        title={
          <ConversationCardTitle
            text="Dialogue Swarm"
            icon="forum"
            color="#43a047"
          />
        }
        subheader="Will display a swarm with the following messages:"
        action={
          <DialogueMessageToolbar
            message={swarmData}
            handleEdit={(data) => handleEdit(data)}
            handleDelete={() => handleDelete()}
            handleSplitBelow={(conversationName) =>
              handleSplitBelow(conversationName)
            }
            omitEdit={false}
          />
        }
      />
      <CardContent>
        {swarmData.swarmData.map((swarmMessage, index) => (
          <Card
            key={index}
            raised={false}
            square={true}
            variant="outlined"
            sx={(theme) => ({
              padding: theme.spacing(1),
              marginBottom: theme.spacing(0.5),
              width: '100%',
            })}
          >
            <Tooltip title={swarmMessage.message} slots={{
              transition: Zoom
            }}>
              <SwarmMessageTextWrapper>
                <Box sx={{
                  marginLeft: 8 * 2,
                  lineHeight: `${25 * 2}px`,
                }}>
                  {cleanMessage(swarmMessage.message)}
                </Box>
              </SwarmMessageTextWrapper>
            </Tooltip>
            <Typography variant="body2" style={{ marginTop: 8 }}>
              Target: {swarmMessage.target_object}. Appears after{' '}
              {swarmMessage.appearance_timeout} second(s).
            </Typography>
          </Card>
        ))}
      </CardContent>
    </SwarmContainer>
  );
};

export default MessageSwarm;
