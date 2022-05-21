import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tooltip,
  Zoom,
} from "@mui/material";

import { DialogueMessageToolbar, ConversationCardTitle } from "./elements";
import { cleanMessage } from "./functions";

const styles = (theme) => ({
  swarmContainer: {
    width: "100%",
    backgroundColor: theme.palette.messageBackground,
    borderBottom: "1px solid #666",
    padding: theme.spacing(2),
  },

  /**
   * Dimensions, colors and fonts mimics how the dialogues are being displayed in-game
   */
  swarmMessageTextWrapper: {
    width: 188 * 2,
    height: 28 * 2,
    borderRadius: 6 * 2,
    fontSize: 12 * 2,
    color: "#000",
    backgroundColor: "#C9C3B8",
    fontFamily: "'JF Dot Ayu Gothic 18'",
    border: "2px solid #272523",
  },
  swarmMessageTextContent: {
    marginLeft: 8 * 2,
    lineHeight: `${25 * 2}px`,
  },
  swarmMessage: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    width: "100%",
  },
});

const useStyles = makeStyles(styles);

const MessageSwarm = ({
  swarmData,
  handleEdit,
  handleDelete,
  handleSplitBelow,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.swarmContainer} square={true}>
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
            className={classes.swarmMessage}
            raised={false}
            square={true}
            variant="outlined"
            style={{ padding: 16 }}
          >
            <Tooltip TransitionComponent={Zoom} title={swarmMessage.message}>
              <div className={classes.swarmMessageTextWrapper}>
                <div className={classes.swarmMessageTextContent}>
                  {cleanMessage(swarmMessage.message)}
                </div>
              </div>
            </Tooltip>
            <Typography variant="body2" style={{ marginTop: 8 }}>
              Target: {swarmMessage.target_object}. Appears after{" "}
              {swarmMessage.appearance_timeout} second(s).
            </Typography>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MessageSwarm;
