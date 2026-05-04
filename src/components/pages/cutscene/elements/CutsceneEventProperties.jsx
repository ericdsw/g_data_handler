import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import { eventSchema } from '@/globals';
import {
  possibleEaseTypes,
  possibleTransTypes,
} from '@/globals/godotEnums';

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
      if (typeof paramValue === 'object') {
        return JSON.stringify(paramValue);
      }
      return paramValue;
  }
}

const CutsceneEventProperties = ({ cutsceneEventData }) => {
  return (
    <Table>
      <TableBody sx={{ wordWrap: 'break-word' }}>
        {Object.keys(cutsceneEventData.parameters).map((paramName) => {
          const curVal = cutsceneEventData.parameters[paramName];
          const parsedValue = getValue(
            cutsceneEventData.type,
            paramName,
            curVal
          );
          return (
            <TableRow key={paramName}>
              <Tooltip arrow title={parsedValue} enterDelay={300}>
                <TableCell
                  align="left"
                  padding="none"
                  size="small"
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>
                    <b>{paramName}</b>
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={(theme) => ({
                      color: paramIsValid(curVal) ? theme.palette.primary : theme.palette.secondary
                    })}
                  >
                    {parsedValue}
                  </Typography>
                </TableCell>
              </Tooltip>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CutsceneEventProperties;
