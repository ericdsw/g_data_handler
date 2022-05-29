import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { NavigationDrawer, ApplicationBar } from './components/elements';
import { drawerWidth } from './globals';

// import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import routes, { fallbackRoute } from './router';

import { toggleDarkMode } from './actions/appActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
}));

// Prevents tardiness
window.onbeforeunload = function () {
  return 'u sure?';
};

const App = () => {
  const [drawerOpen, toggleDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.app);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <ApplicationBar
            handleToggle={() => toggleDrawerOpen(!drawerOpen)}
            handleDarkModeToggle={() => dispatch(toggleDarkMode())}
            isDarkMode={darkMode}
          />
          <NavigationDrawer
            isOpen={drawerOpen}
            handleCollapse={() => toggleDrawerOpen(false)}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact.toString()}
                  element={route.component}
                />
              ))}
              <Route component={fallbackRoute.component} />
            </Routes>
          </main>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
