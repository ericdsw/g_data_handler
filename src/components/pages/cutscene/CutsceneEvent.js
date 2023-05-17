import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Avatar,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDialogueManager } from '../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { CreateEventForm } from './forms';
import { eventSchema } from '../../../globals';
import { createEventDescription } from '../../../functions';

import { styles } from './styles/CutsceneEventStyle';

function parseParameter(parameter) {
  switch (typeof parameter) {
    case 'boolean':
      return parameter ? 'True' : 'False';
    case 'object':
      return JSON.stringify(parameter);
    default:
      return parameter;
  }
}

const useStyles = makeStyles(styles);

const CutsceneEvent = ({
  cutsceneEventData,
  rowNumber,
  eventNumber,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'editEvent',
    'confirmDelete'
  );

  const [expanded, toggleExpand] = useState(false);

  const { name, icon } = useMemo(
    () => eventSchema[cutsceneEventData.type],
    [cutsceneEventData.type]
  );

  const important = useMemo(
    () => cutsceneEventData.parameters.is_important,
    [cutsceneEventData]
  );

  const eventDescription = useMemo(
    () =>
      createEventDescription(
        cutsceneEventData.type,
        cutsceneEventData.parameters
      ),
    [cutsceneEventData]
  );

  const listParams = useMemo(() => {
    const paramNames = Object.keys(cutsceneEventData.parameters);
    return paramNames.map((paramName, index) => {
      const data = parseParameter(cutsceneEventData.parameters[paramName]);
      return (
        <TableRow key={index}>
          <TableCell align="left" padding="none" size="small">
            <b>{paramName}</b>
          </TableCell>
          <TableCell align="left">
            <Tooltip title={data || ''} enterDelay={300}>
              <Typography>{data}</Typography>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  }, [cutsceneEventData]);

  return (
    <Grid item>
      <Card className={classes.eventCard} elevation={2}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Type"
              className={
                typeof important !== 'undefined' && !important
                  ? classes.avatarNonImportant
                  : classes.avatar
              }
            >
              <Icon>{icon}</Icon>
            </Avatar>
          }
          title={name}
          subheader={
            <Tooltip title={eventDescription} enterDelay={300}>
              <Typography>{eventDescription}</Typography>
            </Tooltip>
          }
        />
        <CardActions className={classes.actions} disableSpacing>
          <IconButton
            aria-label="Edit"
            onClick={() => toggleDialogue('editEvent', 'show')}
            size="large"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => toggleDialogue('confirmDelete', 'show')}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => toggleExpand(!expanded)}
            aria-expanded={expanded}
            aria-label="More Info"
            size="large"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Table>
              <TableBody>{listParams}</TableBody>
            </Table>
          </CardContent>
        </Collapse>
      </Card>

      <GenericDialogue
        title="Edit Cutscene Event"
        open={dialogues['editEvent']}
        maxWidth="sm"
        onClose={() => toggleDialogue('editEvent', 'hide')}
      >
        <CreateEventForm
          existingData={cutsceneEventData}
          creationHandler={(cutsceneData) => {
            handleEditEvent(cutsceneData);
            toggleDialogue('editEvent', 'hide');
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the cutscene event?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDeleteEvent(rowNumber, eventNumber);
          toggleDialogue('confirmDelete', 'hide');
        }}
      />
    </Grid>
  );
};

export default CutsceneEvent;
