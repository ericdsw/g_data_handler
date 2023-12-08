import React, { useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Tooltip, Zoom, Card } from '@mui/material';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

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
    width: 310 * 2,
    height: 55 * 2,
    fontSize: 12 * 2,
    borderRadius: 6 * 2,
    fontFamily: "'JF Dot Ayu Gothic 18'",
    whiteSpace: 'pre-line',
    color: props.transparent ? 'white' : 'black',
    backgroundColor: props.transparent ? 'transparent' : '#C9C3B8',
    border: props.transparent ? 'none' : '2px solid #272523',
    textAlign: props.transparent ? 'center' : 'left',
  }),
  contentText: (props) => ({
    marginLeft: 8 * 2,
    marginTop: 6 * 2,
    width: props.noImage ? 282 * 2 : 242 * 2,
    height: 47 * 2,
    lineHeight: '30px',
    cursor: 'text'
  }),
  contentImage: {
    width: 'auto',
    height: 64 * 2,
    position: 'absolute',
    bottom: 0,
    right: 1,
  },
  contentSpeakerName: {
    width: 100 * 2,
    height: 20 * 2,
    left: 18 * 2,
    position: 'absolute',
    top: 0,
    marginTop: -(30 * 2) / 2,
    color: '#fff',
    borderRadius: 4 * 2,
    backgroundColor: '#4C4945',
    border: '4px solid #282624',
    lineHeight: `${16 * 2}px`,
    paddingLeft: 2 * 2,
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

  const handleClick = e => {
    setAnchor(anchor ? null : e.currentTarget)
  }

  const handlePopupTextChange = e => {
    dispatch(editConversationMessage(fullMessage.id, {
      ...fullMessage,
      message: e.target.value
    }));
  }

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
          <Tooltip TransitionComponent={Zoom} title={messageFullText}>
            <div
              className={classes.contentText}
              onClick={handleClick}
            >
              {messageTextOnly}
            </div>
          </Tooltip>
          {hasImage && (
            <img
              alt="speaker"
              className={classes.contentImage}
              src={`images/${usedImagePath}`}
            />
          )}
        </div>
      </Grid>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        placement="top"
        offset={20}
      >
        <ClickAwayListener onClickAway={() => setAnchor(null)}>
          <Card>
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
        </ClickAwayListener>
      </BasePopup>
    </div>
  );
};

export default FloatingDialogue;
