import React from 'react';
import { MenuItem, ListItemIcon, Icon, ListItemText } from '@mui/material';

const AddBelowMenuOptions = ({
  addMessageBelowSelected,
  addEmoteBelowSelected,
  addSwarmBelowSelected,
  giveMoneyBelowSelected,
  giveItemBelowSelected,
  selectItemBelowSelected
}) => (
  <>
    <MenuItem onClick={addMessageBelowSelected}>
      <ListItemIcon>
        <Icon>add_comment</Icon>
      </ListItemIcon>
      <ListItemText primary="Add message below" />
    </MenuItem>
    <MenuItem onClick={addEmoteBelowSelected}>
      <ListItemIcon>
        <Icon>emoji_emotions</Icon>
      </ListItemIcon>
      <ListItemText primary="Add emote below" />
    </MenuItem>
    <MenuItem onClick={addSwarmBelowSelected}>
      <ListItemIcon>
        <Icon>forum</Icon>
      </ListItemIcon>
      <ListItemText primary="Add swarm below" />
    </MenuItem>
    <MenuItem onClick={giveMoneyBelowSelected}>
      <ListItemIcon>
        <Icon>paid</Icon>
      </ListItemIcon>
      <ListItemText primary="Give money below" />
    </MenuItem>
    <MenuItem onClick={giveItemBelowSelected}>
      <ListItemIcon>
        <Icon>local_grocery_store</Icon>
      </ListItemIcon>
      <ListItemText primary="Give item below" />
    </MenuItem>
    <MenuItem onClick={selectItemBelowSelected}>
      <ListItemIcon>
        <Icon>grading</Icon>
      </ListItemIcon>
      <ListItemText primary="Select item below" />
    </MenuItem>
  </>
);

export default AddBelowMenuOptions;