import { useCallback, useMemo, useState } from 'react';
import { Box, Grid, TextField, Card, ButtonBase } from '@mui/material';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { editConversationMessage } from '@/actions/dialogueActions';
import { cleanMessage } from '../functions';

const StyledContentWrapper = styled(Box)({
  display: 'inline-block',
  position: 'relative',
  width: 322 * 2,
  height: 56 * 2,
  fontSize: 12 * 2,
  borderRadius: 3 * 2,
  fontFamily: "'JF Dot Ayu Gothic 18'",
  whiteSpace: 'pre-line',
});
const StyledMessageTextOnlyWrapper = styled(Box)({
  marginLeft: 8 * 2,
  marginTop: 6 * 2,
  height: 47 * 2,
  lineHeight: '30px',
  cursor: 'text',
  wordBreak: 'break-word',
});
const StyledContentSpeakerName = styled('div')({
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
});

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

  const handleClick = useCallback(
    (e) => {
      setAnchor(anchor ? null : e.currentTarget);
    },
    [setAnchor, anchor]
  );

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

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container sx={{
        justifyContent: "center",
        flexGrow: 1
      }}>
        <StyledContentWrapper
          sx={{
            color: isTransparent ? 'white' : 'black',
            backgroundColor: isTransparent ? 'transparent' : '#C9C3B8',
            border: isTransparent ? 'none' : '2px solid #272523',
            textAlign: isTransparent ? 'center' : 'left',
          }}
        >
          {hasSpeakerName && (
            <StyledContentSpeakerName>{speakerName}</StyledContentSpeakerName>
          )}
          <ButtonBase
            onClick={handleClick}
            aria-describedby={id}
            disableRipple
            sx={{
              textTransform: 'none',
              border: 'none',
              background: 'none',
              color: 'black',
              fontSize: 12 * 2,
              borderRadius: 3 * 2,
              fontFamily: "'JF Dot Ayu Gothic 18'",
              whiteSpace: 'pre-line',
              textAlign: isTransparent ? 'center' : 'left',
            }}
          >
            <StyledMessageTextOnlyWrapper sx={{ width: !hasImage ? 306 * 2 : 249 * 2 }}>
              {messageTextOnly}
            </StyledMessageTextOnlyWrapper>
          </ButtonBase>
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
            <Card sx={{ width: 310 * 2 }}>
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
              src={`images/${usedImagePath}`}
              style={{
                width: 'auto',
                height: 64 * 2,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          )}
        </StyledContentWrapper>
      </Grid>
    </Box>
  );
};

export default FloatingDialogue;
