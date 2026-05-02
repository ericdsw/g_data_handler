import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { blue, green, yellow, amber, grey } from '@mui/material/colors';

import { createInput } from '@/functions';

const BlueTypography = styled(Typography)(() => ({
  color: blue[600]
}));
const GreenTypography = styled(Typography)(() => ({
  color: green[600]
}));
const YellowTypography = styled(Typography)(() => ({
  color: yellow[600]
}));
const AmberTypography = styled(Typography)(() => ({
  color: amber[600]
}));
const CodeTypography = styled('code')(() => ({
  color: grey[500]
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

const emptyOnChange = () => () => {};

const HelpContent = () => {
  // const classes = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Types of Inputs
      </Typography>
      <br />
      <Typography variant="body1">
        Depending on the use case, forms can contain inputs with the following
        formats:&nbsp;
      </Typography>
      <br />
      <BlueTypography variant="h6">
        Normal text
      </BlueTypography>
      Account for the mayority of cases and their specific format will depend on
      what the input is for.
      {createInput('foo', textInputSchema, 'Some Text', emptyOnChange)}
      <br />
      <br />
      <AmberTypography variant="h6">
        Positions
      </AmberTypography>
      A position can either be a json with both x and y defined, or a Position2D
      node inside the map, in which case only the node name must be defined.
      {createInput(
        'bar',
        positionInputSchema,
        '{"x": 200, "y": 300} or NodeName',
        emptyOnChange
      )}
      <br />
      <br />
      <YellowTypography variant="h6">
        Position Arrays
      </YellowTypography>
      A position array is a list of Position2Ds on the map, and is defined as a
      comma separated list the position's node names.
      {createInput(
        'baz',
        positionArrayInputSchema,
        'Position1, Position2, Position3',
        emptyOnChange
      )}
      <br />
      <br />
      <GreenTypography variant="h6">
        Node Target
      </GreenTypography>
      A node inside the map, will query depending on the following parameters:
      <ul>
        <li>
          <CodeTypography>CAMERA_VIEWPORT</CodeTypography>&nbsp; Returns the camera node directly,
          useful if you want to add something directly to the camera.
        </li>
        <li>
          <CodeTypography>StateName:NodeName</CodeTypography>&nbsp;
          Will search for a node named NodeName inside the state statename
        </li>
        <li>
          <CodeTypography>CAMERA:NodeName</CodeTypography>&nbsp; Will
          search for a node named NodeName inside the viewport. Useful when you
          want to modify or delete something that is already inside the camera.
        </li>
        <li>
          <CodeTypography>PERMANENT:NodeName</CodeTypography>&nbsp;
          Will search for a node named NodeName inside permanentobjects
        </li>
        <li>
          <CodeTypography>MAP_OBJECTS:NodeName</CodeTypography>
          &nbsp; Will search for a node named NodeName inside the current active
          mapobject instance
        </li>
        <li>
          <CodeTypography>:NodeName</CodeTypography>&nbsp; Will search
          for a node named NodeName directly present as a child of the current
          map
        </li>
      </ul>
      {createInput(
        'qux',
        nodeTargetInputSchema,
        'Default:NPCName',
        emptyOnChange
      )}
    </>
  );
};

export default HelpContent;
