import React, { useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Card } from '@mui/material';
import Popover from '@mui/material/Popover';

import { useDispatch } from 'react-redux';

import { editConversationMessage } from '../../../../actions/dialogueActions';
import { cleanMessage } from '../functions';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
  avatar: {
    width: 70,
    height: 70,
  },
  content: (props) => ({
    display: 'inline-block',
    position: 'relative',
    width: 322 * 2,
    height: 56 * 2,
    fontSize: 12 * 2,
    borderRadius: 3 * 2,
    fontFamily: "'JF Dot Ayu Gothic 18'",
    whiteSpace: 'pre-line',
    color: props.transparent ? 'white' : 'black',
    backgroundColor: props.transparent ? 'transparent' : '#C9C3B8',
    border: props.transparent ? 'none' : '2px solid #272523',
    textAlign: props.transparent ? 'center' : 'left',
  }),
  contentTextEdit: {
    width: 310 * 2,
  },
  contentText: (props) => ({
    marginLeft: 8 * 2,
    marginTop: 6 * 2,
    width: props.noImage ? 306 * 2 : 249 * 2,
    height: 47 * 2,
    lineHeight: '30px',
    cursor: 'text',
    wordBreak: 'break-word',
  }),
  contentImage: {
    width: 'auto',
    height: 64 * 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  contentSpeakerName: {
    width: 100 * 2,
    height: 20 * 2,
    left: 18 * 2,
    position: 'absolute',
    top: 0,
    marginTop: -32,
    color: '#fff',
    borderRadius: 2 * 2,
    backgroundColor: '#4C4945',
    border: '2px solid #282624',
    lineHeight: `36px`,
    paddingLeft: 4 * 2,
  },
}));

const FloatingDialogue = ({
  fullMessage,
  speakerName,
  messageFullText,
  uiVariant,
  usedImagePath,
}) => {
  const dispatch = useDispatch();

  const isTransparent = useMemo(
    () => uiVariant && uiVariant !== 'default',
    [uiVariant]
  );

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const id = open ? `simple-popper-${messageFullText}` : undefined;

  const handleClick = (e) => {
    setAnchor(anchor ? null : e.currentTarget);
  };

  const handlePopupTextChange = (e) => {
    dispatch(
      editConversationMessage(fullMessage.id, {
        ...fullMessage,
        message: e.target.value,
      })
    );
  };

  const hasSpeakerName = useMemo(
    () => speakerName && !isTransparent,
    [speakerName, isTransparent]
  );

  const hasImage = useMemo(
    () => usedImagePath && usedImagePath !== 'NONE' && !isTransparent,
    [usedImagePath, isTransparent]
  );

  const messageTextOnly = useMemo(
    () => cleanMessage(messageFullText),
    [messageFullText]
  );

  const classes = useStyles({
    transparent: isTransparent,
    noImage: !hasImage,
  });

  return (
    <div className={classes.wrapper}>
      <Grid container justifyContent="center">
        <div className={classes.content}>
          {hasSpeakerName && (
            <div className={classes.contentSpeakerName}>{speakerName}</div>
          )}
          <div
            className={classes.contentText}
            onClick={handleClick}
            aria-describedby={id}
          >
            {messageTextOnly}
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            style={{ marginLeft: -16 }}
          >
            <Card className={classes.contentTextEdit}>
              <TextField
                value={messageFullText}
                onChange={handlePopupTextChange}
                multiline
                rows={3}
                style={{
                  width: 310 * 2,
                }}
              />
            </Card>
          </Popover>
          {hasImage && (
            <img
              alt="speaker"
              className={classes.contentImage}
              src={`images/${usedImagePath}`}
            />
          )}
        </div>
      </Grid>
    </div>
  );
};

export default FloatingDialogue;
