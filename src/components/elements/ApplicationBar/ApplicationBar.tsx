import makeStyles from '@mui/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { applicationName } from '@/globals';

import CutsceneFileNamesButton from './CutsceneFileNamesButton';
import PreloadedDialoguesButton from './PreloadedDialoguesButton';
import DarkModeButton from './DarkModeButton';
import HelpButton from './HelpButton';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const ApplicationBar = ({ handleToggle }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* Drawer button */}
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
          onClick={handleToggle}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Application Name */}
        <Typography variant='h6' noWrap component='div'>{applicationName}</Typography>

        {/* Space between name and buttons */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Buttons */}
        <Box sx={{ display: 'flex' }}>
          <CutsceneFileNamesButton /> 
          <PreloadedDialoguesButton />
          <DarkModeButton />
          <HelpButton />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
