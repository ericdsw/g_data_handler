import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import {
  MenuItem,
  Grid,
  IconButton,
  Menu,
  Typography,
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { speakerImages } from "../../../../globals/speakerSchema";

const ITEM_HEIGHT = 48;
const PAPER_PROPS = {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5,
    width: 200,
  },
};

const styles = () => ({
  imagePreview: {
    backgroundColor: "#ccc",
    marginTop: 16,
    height: 225,
    borderRadius: 4,
  },
  largeAvatar: {
    width: 150,
    height: 150,
  },
  smallAvatar: {
    width: 40,
    height: 40,
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
    const { classes, image } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let searchContent;

    if (!image || !speakerImages.includes(image)) {
      searchContent = (
        <IconButton
          aria-label="Select Image"
          aria-owns={open ? "image-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleSearchImageShow}
        >
          <SearchIcon />
        </IconButton>
      );
    } else {
      searchContent = (
        <Avatar
          className={classes.largeAvatar}
          src={`images/${image}`}
          aria-owns={open ? "image-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleSearchImageShow}
          alt="Speaker"
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
