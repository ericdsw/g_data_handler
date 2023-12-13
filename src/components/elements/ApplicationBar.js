import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Icon,
  Badge,
  Tooltip,
} from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { applicationName } from '../../globals';
import { useDialogueManager } from '../../hooks';
import GenericDialogue from './GenericDialogue';

import HelpContent from './HelpContent';
import PreloadedDialoguesContent from './PreloadedDialoguesContent';
import PreLoadedCutscenesContent from './PreLoadedCutscenesContent';

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

const selectLoadedFileData = state => state.dialogue.preUploadedFiles;
const selectLoadedCutsceneFileData = state => state.cutscene.preloadedCutsceneFileNames;

const selectData = createSelector(
  [selectLoadedFileData, selectLoadedCutsceneFileData],
  (preUploadedFiles, preUploadedCutsceneFiles)=> ({
    preUploadedFiles,
    preUploadedCutsceneFiles
  })
);

const ApplicationBar = ({ isDarkMode, handleToggle, handleDarkModeToggle }) => {

  const {
    preUploadedFiles,
    preUploadedCutsceneFiles
  } = useSelector(state => selectData(state));

  const classes = useStyles();
  const [dialogues, toggleDialogue] = useDialogueManager(
    'helpDialogue',
    'preloadedDialoguesDialogue',
    'preloadedCutscenesDialogue'
  );

  const fileAmount = useMemo(() => Object.keys(preUploadedFiles).length, [preUploadedFiles])
  const cutsceneFileAmount = useMemo(() => preUploadedCutsceneFiles.length, [preUploadedCutsceneFiles]);

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
              <Tooltip title="Cutscene file names">
                <IconButton
                  className={classes.buttons}
                  size="large"
                  onClick={() => toggleDialogue('preloadedCutscenesDialogue', 'show')}
                >
                  {cutsceneFileAmount > 0 && (
                    <Badge badgeContent={cutsceneFileAmount} color="primary">
                      <AllInboxIcon />
                    </Badge>
                  )}
                  {cutsceneFileAmount <= 0 && (
                    <AllInboxIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Preloaded Dialogues">
                <IconButton
                  className={classes.buttons}
                  size="large"
                  onClick={() => toggleDialogue('preloadedDialoguesDialogue', 'show')}
                >
                  {fileAmount > 0 && (
                    <Badge badgeContent={fileAmount} color="primary">
                      <Inventory2Icon />
                    </Badge>
                  )}
                  {fileAmount <= 0 && (
                    <Inventory2Icon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="mode">
                <IconButton
                  className={classes.buttons}
                  onClick={() => handleDarkModeToggle()}
                  size="large"
                >
                  {!isDarkMode && <Brightness4Icon />}
                  {isDarkMode && <BrightnessHighIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="help">
                <IconButton
                  className={classes.buttons}
                  onClick={() => toggleDialogue('helpDialogue', 'show')}
                  size="large"
                >
                  <Icon>help_outline</Icon>
                </IconButton>
              </Tooltip>
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

      <GenericDialogue
        open={dialogues['preloadedDialoguesDialogue']}
        onClose={() => toggleDialogue('preloadedDialoguesDialogue', 'hide')}
        maxWidth='md'
      >
        <PreloadedDialoguesContent />
      </GenericDialogue>

      <GenericDialogue
        open={dialogues['preloadedCutscenesDialogue']}
        onClose={() => toggleDialogue('preloadedCutscenesDialogue', 'hide')}
        maxWidth='md'
      >
        <PreLoadedCutscenesContent />
      </GenericDialogue>

    </AppBar>
  );
};

export default ApplicationBar;
