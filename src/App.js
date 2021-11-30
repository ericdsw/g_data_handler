import React, { useState } from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { NavigationDrawer, ApplicationBar } from "./components/elements";
import { drawerWidth } from "./globals";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import baseTheme from "./themes/baseTheme";
import routes, { fallbackRoute } from "./router";
import store from "./store";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
  },
});

// Prevents tardiness
window.onbeforeunload = function() {
  return 'u sure?';
}

const App = () => {
  const [drawerOpen, toggleDrawerOpen] = useState(false);
  const [darkMode, toggleDarkMode] = useState(true);

  const classes = makeStyles(styles)();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <MuiThemeProvider theme={baseTheme(darkMode ? "dark" : "light")}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <Router>
              <ApplicationBar
                handleToggle={() => toggleDrawerOpen(!drawerOpen)}
                handleDarkModeToggle={() => {
                  if (darkMode) {
                    console.log("Psychopath mode engaged");
                  }
                  toggleDarkMode(!darkMode);
                }}
                isDarkMode={darkMode}
              />
              <NavigationDrawer
                isOpen={drawerOpen}
                handleCollapse={() => toggleDrawerOpen(false)}
              />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                  <Route component={fallbackRoute.component} />
                </Switch>
              </main>
            </Router>
          </SnackbarProvider>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
