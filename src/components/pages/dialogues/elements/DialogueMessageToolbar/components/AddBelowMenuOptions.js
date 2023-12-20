import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { AddComment, EmojiEmotions, Forum, LocalGroceryStore } from '@material-ui/icons';
import { Grading, Paid } from '@mui/icons-material';

const AddBelowMenuOptions = ({
  addMessageBelowSelected,
  addEmoteBelowSelected,
  addSwarmBelowSelected,
  giveMoneyBelowSelected,
  giveItemBelowSelected,
  selectItemBelowSelected,
}) => (
  <>
    <MenuItem onClick={addMessageBelowSelected}>
      <ListItemIcon>
        <AddComment />
      </ListItemIcon>
      <ListItemText primary="Add message below" />
    </MenuItem>
    <MenuItem onClick={addEmoteBelowSelected}>
      <ListItemIcon>
        <EmojiEmotions />
      </ListItemIcon>
      <ListItemText primary="Add emote below" />
    </MenuItem>
    <MenuItem onClick={addSwarmBelowSelected}>
      <ListItemIcon>
        <Forum />
      </ListItemIcon>
      <ListItemText primary="Add swarm below" />
    </MenuItem>
    <MenuItem onClick={giveMoneyBelowSelected}>
      <ListItemIcon>
        <Paid />
      </ListItemIcon>
      <ListItemText primary="Give money below" />
    </MenuItem>
    <MenuItem onClick={giveItemBelowSelected}>
      <ListItemIcon>
        <LocalGroceryStore />
      </ListItemIcon>
      <ListItemText primary="Give item below" />
    </MenuItem>
    <MenuItem onClick={selectItemBelowSelected}>
      <ListItemIcon>
        <Grading />
      </ListItemIcon>
      <ListItemText primary="Select item below" />
    </MenuItem>
  </>
);

export default AddBelowMenuOptions;
