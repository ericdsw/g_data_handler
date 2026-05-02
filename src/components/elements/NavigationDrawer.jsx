import { useMemo, useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import routes from '@/router';
import { drawerWidth } from '@/globals';
import { ToolbarSpace } from '@/components/elements';

const NavigationDrawer = () => {
  const [drawerOpen, toggleDrawerOpen] = useState(false);

  const drawerContent = useMemo(
    () => (
      <div>
        <ToolbarSpace />
        <List>
          {routes.map((route) => (
            <ListItemButton
              component={NavLink}
              onClick={() => toggleDrawerOpen(!drawerOpen)}
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
    [toggleDrawerOpen, drawerOpen]
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Navigation"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => toggleDrawerOpen(!drawerOpen)}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default NavigationDrawer;
