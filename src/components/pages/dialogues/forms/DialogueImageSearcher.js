import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { withSnackbar } from 'notistack';
import {
  MenuItem,
  Grid,
  IconButton,
  Menu,
  Typography,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import speakerSchema from '../../../../globals/speakerSchema';

const LARGE_AVATAR_SIZE = 128;
const SMALL_AVATAR_SIZE = 32;

const ITEM_HEIGHT = 48;
const PAPER_PROPS = {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5,
    width: 200,
  },
};

const styles = () => ({
  imagePreview: {
    backgroundColor: '#C9C3B8',
    marginTop: 16,
    height: 225,
    borderRadius: 4,
  },
  largeAvatar: {
    width: LARGE_AVATAR_SIZE,
    height: LARGE_AVATAR_SIZE,
    borderRadius: 0,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  smallAvatar: {
    width: SMALL_AVATAR_SIZE,
    height: SMALL_AVATAR_SIZE,
    borderRadius: 0,
  },
});

class DialogueImageSearcher extends React.Component {
  state = {
    anchorEl: null,
  };

  handleSearchImageShow = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSearchImageClose = () => {
    this.setState({ anchorEl: null });
  };

  handleUpdateImage = (image) => () => {
    const { updateImage } = this.props;
    updateImage(image);
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, image, selectedSpeaker } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let searchContent;
    const speakerImages = [];

    // First, add the ones from the speaker
    if (selectedSpeaker) {
      speakerImages.push(...speakerSchema[selectedSpeaker].speakerImages);
    }

    Object.keys(speakerSchema)
      .filter((speakerKey) => speakerKey !== selectedSpeaker)
      .forEach((speakerKey) => {
        const currentSpeaker = speakerSchema[speakerKey];
        speakerImages.push(...currentSpeaker.speakerImages);
      });

    if (!image || !speakerImages.includes(image)) {
      searchContent = (
        <IconButton
          aria-label="Select Image"
          aria-owns={open ? 'image-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleSearchImageShow}
          size="large"
        >
          <SearchIcon />
        </IconButton>
      );
    } else {
      searchContent = (
        <div
          className={classes.largeAvatar}
          style={{
            backgroundImage: `url(images/${image})`,
          }}
          aria-owns={open ? 'image-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleSearchImageShow}
          alt="Speaker"
          imgProps={{
            style: {
              width: LARGE_AVATAR_SIZE,
              height: LARGE_AVATAR_SIZE,
            },
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.imagePreview}
        >
          {searchContent}
        </Grid>

        <Menu
          id="image-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleSearchImageClose}
          PaperProps={PAPER_PROPS}
        >
          {speakerImages.map((image) => (
            <MenuItem key={image} onClick={this.handleUpdateImage(image)}>
              <Avatar
                className={classes.smallAvatar}
                src={`images/${image}`}
                alt="Speaker"
                imgProps={{
                  style: {
                    width: SMALL_AVATAR_SIZE,
                    height: 'auto',
                  },
                }}
              />
              <Typography variant="body2">{image}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withSnackbar(withStyles(styles)(DialogueImageSearcher));
