import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Icon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

import { applicationName } from '../../globals';
import { useDialogueManager } from '../../hooks';
import GenericDialogue from './GenericDialogue';

import HelpContent from './HelpContent';

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
  buttons: {
    color: theme.palette.primary.contrastText,
  },
}));

const ApplicationBar = ({ isDarkMode, handleToggle, handleDarkModeToggle }) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager('helpDialogue');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6" color="inherit">
              <IconButton
                color="inherit"
                aria-label="Open Drawer"
                onClick={() => handleToggle()}
                className={classes.menuButton}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              {applicationName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justifyContent="flex-end">
              <IconButton
                className={classes.buttons}
                onClick={() => handleDarkModeToggle()}
                size="large"
              >
                {!isDarkMode && <Brightness4Icon />}
                {isDarkMode && <BrightnessHighIcon />}
              </IconButton>
              <IconButton
                className={classes.buttons}
                onClick={() => toggleDialogue('helpDialogue', 'show')}
                size="large"
              >
                <Icon>help_outline</Icon>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>

      <GenericDialogue
        open={dialogues['helpDialogue']}
        onClose={() => toggleDialogue('helpDialogue', 'hide')}
        maxWidth="sm"
      >
        <HelpContent />
      </GenericDialogue>
    </AppBar>
  );
};

export default ApplicationBar;
