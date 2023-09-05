import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Drawer,
  Hidden,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import routes from '../../router';
import { drawerWidth } from '../../globals';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const NavigationDrawer = ({ isOpen, handleCollapse }) => {
  const classes = useStyles();

  const drawerContent = useMemo(
    () => (
      <div>
        <div className={classes.toolbar} />
        <List>
          {routes.map((route) => (
            <ListItemButton
              component={NavLink}
              onClick={() => handleCollapse()}
              to={route.path}
              key={route.path}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItemButton>
          ))}
        </List>
      </div>
    ),
    [classes.toolbar, handleCollapse]
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={isOpen}
          onClose={() => handleCollapse()}
          classes={{ paper: classes.drawerPaper }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{ paper: classes.drawerPaper }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default NavigationDrawer;
