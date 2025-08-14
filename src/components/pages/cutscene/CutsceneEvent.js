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
import { checkForRequired, createEventDescription } from '../../../functions';

import { styles } from './styles/CutsceneEventStyle';
import AddEventToTemplateForm from './forms/AddEventToTemplateForm';
import { Warning } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import { CutsceneEventProperties } from './elements';

const useStyles = makeStyles(styles);

const CutsceneEvent = ({
  cutsceneEventData,
  handleEditEvent,
  handleDeleteEvent,
  handleAddToTemplate,
  compact = false,
  skipRequiredCheck = false,
  eventIndex,
}) => {
  const classes = useStyles({ compact });

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

  const missingParams = useMemo(() => {
    const missingParamResults = [];
    const eventType = cutsceneEventData.type;
    const schemaParams = eventSchema[eventType].parameters;
    Object.keys(schemaParams).forEach((paramDataName) => {
      const provided = checkForRequired(
        cutsceneEventData.type,
        paramDataName,
        cutsceneEventData.parameters[paramDataName]
      );
      if (!provided) {
        missingParamResults.push(paramDataName);
      }
    });
    return missingParamResults;
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
                sx={{
                  width: compact ? 36 : 40,
                  height: compact ? 36 : 40,
                }}
              >
                <Icon>{icon}</Icon>
              </Avatar>
            }
            title={
              <Typography variant={compact ? 'body2' : 'body1'}>
                {name}
              </Typography>
            }
            subheader={
              <Tooltip title={eventDescription} enterDelay={300}>
                <Typography variant={compact ? 'caption' : 'subtitle2'}>
                  {eventDescription}
                </Typography>
              </Tooltip>
            }
            style={{
              minHeight: compact ? 70 : 100,
              alignItems: 'flex-start',
            }}
            action={
              <>
                {missingParams.length > 0 && (
                  <Tooltip
                    title={`One or more required props are missing: ${missingParams.join(
                      ', '
                    )}`}
                  >
                    <Warning style={{ margin: 8, color: yellow[500] }} />
                  </Tooltip>
                )}
              </>
            }
          />
          <CardActions className={classes.actions} disableSpacing>
            {/* Edit button */}
            <Tooltip title="Edit Event">
              <IconButton
                aria-label="Edit"
                onClick={() => toggleDialogue('editEvent', 'show')}
                size={compact ? 'small' : 'medium'}
              >
                <EditIcon fontSize={compact ? 'small' : 'inherit'} />
              </IconButton>
            </Tooltip>

            {/* Delete Button */}
            <Tooltip title="Delete Event">
              <IconButton
                aria-label="Delete"
                onClick={() => toggleDialogue('confirmDelete', 'show')}
                size={compact ? 'small' : 'medium'}
              >
                <DeleteIcon fontSize={compact ? 'small' : 'inherit'} />
              </IconButton>
            </Tooltip>

            {/* Add To template button */}
            <Tooltip title="Add Event to Template">
              <IconButton
                size={compact ? 'small' : 'medium'}
                onClick={() => toggleDialogue('addToTemplate', 'show')}
              >
                <CollectionsBookmarkIcon
                  fontSize={compact ? 'small' : 'inherit'}
                />
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
              size={compact ? 'small' : 'medium'}
            >
              <ExpandMoreIcon fontSize={compact ? 'small' : 'inherit'} />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CutsceneEventProperties cutsceneEventData={cutsceneEventData}/>
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
          skipRequiredCheck={skipRequiredCheck}
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
        maxWidth="sm"
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
