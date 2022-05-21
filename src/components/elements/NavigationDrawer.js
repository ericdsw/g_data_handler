import React, { useMemo } from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import routes from "../../router";
import { drawerWidth } from "../../globals";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selectedLink: {
    background: theme.palette.action.hover,
  },
}));

const NavigationDrawer = ({ isOpen, handleCollapse }) => {
  const classes = useStyles();

  const drawerContent = useMemo(
    () => (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routes.map((route) => (
            <ListItem
              button
              component={NavLink}
              onClick={() => handleCollapse()}
              to={route.path}
              key={route.path}
              exact
              activeClassName={classes.selectedLink}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
          ))}
        </List>
      </div>
    ),
    [classes.selectedLink, classes.toolbar, handleCollapse]
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
