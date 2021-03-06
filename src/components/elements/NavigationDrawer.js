import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

import routes from "../../router";
import { drawerWidth } from "../../globals";

const styles = (theme) => ({
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
});

const NavigationDrawer = (props) => {
  const classes = makeStyles(styles)();

  const { isOpen, handleCollapse } = props;

  const drawerContent = (
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

      <Hidden xsDown implementation="css">
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
