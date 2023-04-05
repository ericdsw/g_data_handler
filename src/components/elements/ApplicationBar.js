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
import { blue, green, yellow, amber, grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

import { drawerWidth, applicationName } from '../../globals';
import { useDialogueManager } from '../../hooks';
import GenericDialogue from './GenericDialogue';

import { createInput } from '../../functions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  blueText: { color: blue[600] },
  greenText: { color: green[600] },
  yellowText: { color: yellow[600] },
  amberText: { color: amber[600] },
  codeText: { color: grey[500] },
  buttons: {
    color: theme.palette.primary.contrastText,
  },
}));

const textInputSchema = {
  label: 'Generic Text Input',
  type: 'text',
};

const positionInputSchema = {
  label: 'Position Input',
  type: 'position',
};

const positionArrayInputSchema = {
  label: 'Position Array',
  type: 'positionArray',
};

const nodeTargetInputSchema = {
  label: 'Node Target',
  type: 'node_target',
};

const ApplicationBar = ({ isDarkMode, handleToggle, handleDarkModeToggle }) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager('helpDialogue');

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.appBar}
      enableColorOnDark
    >
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
        <Typography variant="h5" gutterBottom>
          <b>Types of Inputs</b>
        </Typography>
        <br />
        <Typography variant="body1">
          Depending on the use case, forms can contain inputs with the following
          formats:&nbsp;
          <br />
          <br />
          <Typography variant="h6" className={classes.blueText}>
            Normal text
          </Typography>
          Account for the mayority of cases and their specific format will
          depend on what the input is for.
          {createInput('foo', textInputSchema, 'Some Text', () => {})}
          <br />
          <br />
          <Typography variant="h6" className={classes.amberText}>
            Positions
          </Typography>
          A position can either be a json with both x and y defined, or a
          Position2D node inside the map, in which case only the node name must
          be defined.
          {createInput(
            'bar',
            positionInputSchema,
            '{"x": 200, "y": 300} or NodeName',
            () => {}
          )}
          <br />
          <br />
          <Typography variant="h6" className={classes.yellowText}>
            Position Arrays
          </Typography>
          A position array is a list of Position2Ds on the map, and is defined
          as a comma separated list the position's node names.
          {createInput(
            'baz',
            positionArrayInputSchema,
            'Position1, Position2, Position3',
            () => {}
          )}
          <br />
          <br />
          <Typography variant="h6" className={classes.greenText}>
            Node Target
          </Typography>
          A node inside the map, will query depending on the following
          parameters:
          <ul>
            <li>
              <code>CAMERA_VIEWPORT</code>&nbsp; Returns the camera node directly, useful
              if you want to add something directly to the camera.
            </li>
            <li>
              <code classname={classes.codetext}>StateName:NodeName</code>&nbsp;
              Will search for a node named NodeName inside the state statename
            </li>
            <li>
              <code classname={classes.codetext}>CAMERA:NodeName</code>&nbsp;
              Will search for a node named NodeName inside the viewport. Useful when
              you want to modify or delete something that is already inside the camera.
            </li>
            <li>
              <code classname={classes.codetext}>PERMANENT:NodeName</code>&nbsp;
              Will search for a node named NodeName inside permanentobjects
            </li>
            <li>
              <code classname={classes.codetext}>MAP_OBJECTS:NodeName</code>
              &nbsp; Will search for a node named NodeName inside the current
              active mapobject instance
            </li>
            <li>
              <code classname={classes.codetext}>:NodeName</code>&nbsp; Will
              search for a node named NodeName directly present as a child of
              the current map
            </li>
          </ul>
          {createInput(
            'qux',
            nodeTargetInputSchema,
            'Default:NPCName',
            () => {}
          )}
        </Typography>
      </GenericDialogue>
    </AppBar>
  );
};

export default ApplicationBar;
