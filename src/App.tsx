import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { NavigationDrawer, ApplicationBar } from '@/components/elements';
import { drawerWidth } from '@/globals';
import routes, { fallbackRoute } from '@/router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
}));

// Prevents accidental closes
window.onbeforeunload = function () {
  return 'u sure?';
};

const App = () => {
  const [drawerOpen, toggleDrawerOpen] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <ApplicationBar handleToggle={() => toggleDrawerOpen(!drawerOpen)} />
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
