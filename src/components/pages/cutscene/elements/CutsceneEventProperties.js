import { Table, TableBody, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import { eventSchema } from "../../../../globals";
import { possibleEaseTypes, possibleTransTypes } from "../../../../globals/godotEnums";


const useStyles = makeStyles(theme => ({
  tableBody: {
    wordWrap: 'break-word'
  },
  tableCell: {
    padding: 10,
  },
  paramValueValid: {
    color: theme.palette.text.primary
  },
  paramValueInvalid: {
    color: theme.palette.text.secondary
  }
}));


function paramIsValid(paramValue) {
  return paramValue !== undefined && paramValue !== '';
}

function getValue(eventType, paramName, paramValue) {

  if (!paramIsValid(paramValue)) {
    return 'N/A';
  }
  if (paramName === 'is_important') {
    return paramValue ? 'True' : 'False';
  }

  const event = eventSchema[eventType];
  const eventParameterType = event.parameters[paramName].type;
  switch (eventParameterType) {
    case 'boolean':
      return paramValue ? 'True' : 'False';
    case 'json':
      return JSON.stringify(paramValue);
    case 'tween_trans_types':
      return possibleTransTypes[paramValue];
    case 'tween_ease_types':
      return possibleEaseTypes[paramValue];
    case 'dropdown':
      return event.parameters[paramName].elements[paramValue];
    default:
      return paramValue
  }
}

const CutsceneEventProperties = ({
  cutsceneEventData
}) => {
  const classes = useStyles();
  return (
    <Table>
      <TableBody className={classes.tableBody}>
        {Object.keys(cutsceneEventData.parameters).map((paramName) => {
          const curVal = cutsceneEventData.parameters[paramName];
          const parsedValue = getValue(cutsceneEventData.type, paramName, curVal);
          return (
            <TableRow key={paramName}>
              <Tooltip arrow title={parsedValue} enterDelay={300}>
                <TableCell align="left" padding="none" size="small" className={classes.tableCell}>
                  <Typography><b>{paramName}</b></Typography>
                  <Typography
                    variant="caption"
                    className={paramIsValid(curVal) ? classes.paramValueValid : classes.paramValueInvalid}
                  >
                    {parsedValue}
                  </Typography>
                </TableCell>
              </Tooltip>
            </TableRow>
          )
      })}
      </TableBody>
    </Table>
  );
}

export default CutsceneEventProperties;
