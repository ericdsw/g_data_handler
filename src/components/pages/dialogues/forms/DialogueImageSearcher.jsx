import { useMemo, useState, useCallback } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Avatar,
  ClickAwayListener,
  Card,
  Autocomplete,
  TextField,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import StyledPopper from '@/components/elements/StyledPopper';
import speakerSchema from '@/globals/speakerSchema';

const LARGE_AVATAR_SIZE = 128;
const SMALL_AVATAR_SIZE = 32;

const DialogueImageSearcher = ({ updateImage, image, selectedSpeaker }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const id = open ? `dialogue_search_popper` : undefined;

  const handleSearchImageShow = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleSearchImageClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateImage = (image) => {
    updateImage(image);
    setAnchorEl(null);
  };

  const speakerImages = useMemo(() => {
    const result = [];
    if (selectedSpeaker) {
      result.push(...speakerSchema[selectedSpeaker].speakerImages);
    }
    Object.keys(speakerSchema)
      .filter((speakerKey) => speakerKey !== selectedSpeaker)
      .forEach((speakerKey) => {
        const currentSpeaker = speakerSchema[speakerKey];
        result.push(...currentSpeaker.speakerImages);
      });

    return result;
  }, [selectedSpeaker]);

  const searchContent = useMemo(() => {
    if (!image || !speakerImages.includes(image)) {
      return (
        <IconButton
          aria-label="Select Image"
          aria-owns={open ? 'image-menu' : undefined}
          aria-haspopup="true"
          onClick={handleSearchImageShow}
          size="large"
        >
          <SearchIcon />
        </IconButton>
      );
    }
    return (
      <Box
        sx={{
          backgroundImage: `url(images/${image})`,
          width: LARGE_AVATAR_SIZE,
          height: LARGE_AVATAR_SIZE,
          borderRadius: 0,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-owns={open ? 'image-menu' : undefined}
        aria-haspopup="true"
        onClick={handleSearchImageShow}
        alt="Speaker"
        imgProps={{
          style: {
            width: LARGE_AVATAR_SIZE,
            height: LARGE_AVATAR_SIZE,
          },
        }}
      />
    );
  }, [image, speakerImages, open, handleSearchImageShow]);

  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#C9C3B8',
          marginTop: 16,
          height: 225,
          borderRadius: 4,
        }}>
        {searchContent}
      </Grid>
      <StyledPopper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => handleSearchImageClose()}>
          <Card elevation={1} style={{ padding: 12 }}>
            <Autocomplete
              open
              options={speakerImages}
              disableClearable
              onChange={(_, value) => {
                handleUpdateImage(value);
              }}
              getOptionLabel={(option) => String(option)}
              renderOption={(props, option) => (
                <Box component="li" style={{ padding: 12 }} {...props}>
                  <Grid container spacing={1} sx={{
                    alignItems: "center"
                  }}>
                    <Grid>
                      <Avatar
                        src={`images/${option}`}
                        alt="Speaker"
                        sx={{
                          width: SMALL_AVATAR_SIZE,
                          height: SMALL_AVATAR_SIZE,
                          borderRadius: 0,
                        }}
                      />
                    </Grid>
                    <Grid size="grow">
                      <Typography variant="body2">{option}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search speaker image" />
              )}
            />
          </Card>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};
export default DialogueImageSearcher;
