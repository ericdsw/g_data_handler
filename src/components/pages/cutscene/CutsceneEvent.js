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
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import { useDialogueManager } from '../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { CreateEventForm } from './forms';
import { eventSchema } from '../../../globals';
import { createEventDescription } from '../../../functions';

import { styles } from './styles/CutsceneEventStyle';
import AddEventToTemplateForm from './forms/AddEventToTemplateForm';

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
  handleEditEvent,
  handleDeleteEvent,
  handleAddToTemplate,
  eventIndex
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'editEvent',
    'confirmDelete',
    'addToTemplate'
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
          <Tooltip
            arrow
            title={data !== undefined && data !== '' ? data : 'N/A'}
            enterDelay={300}
          >
            <TableCell
              align="left"
              padding="none"
              size="small"
              style={{ padding: 10 }}
            >
              <Typography>
                <b>{paramName}</b>
              </Typography>
              {data !== undefined && data !== '' && (
                <Typography variant="caption">{data}</Typography>
              )}
              {(data === undefined || data === '') && (
                <Typography variant="caption" style={{ color: '#aaa' }}>
                  N/A
                </Typography>
              )}
            </TableCell>
          </Tooltip>
        </TableRow>
      );
    });
  }, [cutsceneEventData]);

  return (
    <Grid item>
      <div style={{ padding: 8 }}>
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
            title={<Typography>{name}</Typography>}
            subheader={
              <Tooltip title={eventDescription} enterDelay={300}>
                <Typography variant="subtitle2">{eventDescription}</Typography>
              </Tooltip>
            }
            style={{
              minHeight: 100,
              alignItems: 'flex-start',
            }}
          />
          <CardActions className={classes.actions} disableSpacing>

            {/* Edit button */}
            <Tooltip title="Edit Event">
              <IconButton
                aria-label="Edit"
                onClick={() => toggleDialogue('editEvent', 'show')}
                size="large"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            {/* Delete Button */}
            <Tooltip title="Delete Event">
              <IconButton
                aria-label="Delete"
                onClick={() => toggleDialogue('confirmDelete', 'show')}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {/* Add To template button */}
            <Tooltip title="Add Event to Template">
              <IconButton
                size="large"
                onClick={() => toggleDialogue('addToTemplate', 'show')}
              >
                <CollectionsBookmarkIcon />
              </IconButton>
            </Tooltip>

            {/* Expand Icon */}
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
                <TableBody style={{ wordWrap: 'break-word' }}>
                  {listParams}
                </TableBody>
              </Table>
            </CardContent>
          </Collapse>
        </Card>
      </div>

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

      <GenericDialogue
        title="Add event to template"
        open={dialogues['addToTemplate']}
        maxWidth='sm'
        onClose={() => toggleDialogue('addToTemplate', 'hide')}
      >
        <AddEventToTemplateForm
          eventId={cutsceneEventData.id}
          onAddEvent={(selectedTemplate) => {
            toggleDialogue('addToTemplate', 'hide');
            handleAddToTemplate(selectedTemplate);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the cutscene event?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDeleteEvent(cutsceneEventData.id);
          toggleDialogue('confirmDelete', 'hide');
        }}
      />
    </Grid>
  );
};

export default CutsceneEvent;
