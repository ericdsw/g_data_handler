import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { NavigationDrawer, ApplicationBar } from '@/components/elements';
import routes from '@/router';
import { NotFound } from '@/components/pages';
import { ToolbarSpace } from '@/components/elements';

const StyledContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));

// Prevents accidental closes
window.onbeforeunload = function () {
  return 'u sure?';
};

const App = () => {
  const [drawerOpen, toggleDrawerOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <ApplicationBar handleToggle={() => toggleDrawerOpen(!drawerOpen)} />
          <NavigationDrawer />
          <StyledContentWrapper>
            <ToolbarSpace />
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
              <Route element={<NotFound />} />
            </Routes>
          </StyledContentWrapper>
        </BrowserRouter>
      </SnackbarProvider>
    </Box>
  );
};

export default App;
