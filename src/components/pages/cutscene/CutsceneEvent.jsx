import { useState, useMemo } from 'react';
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
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Warning } from '@mui/icons-material';
import { yellow, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { useDialogueManager } from '@/hooks';
import { GenericDialogue, ConfirmationDialogue } from '@/components/elements';
import { CreateEventForm } from './forms';
import { eventSchema } from '@/globals';
import { checkForRequired, createEventDescription } from '@/functions';

import AddEventToTemplateForm from './forms/AddEventToTemplateForm';
import { CutsceneEventProperties } from './elements';

const StyledEventCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.background.default}`
}));
const StyledExpandIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

const CutsceneEvent = ({
  cutsceneEventData,
  handleEditEvent,
  handleDeleteEvent,
  handleAddToTemplate,
  compact = false,
  skipRequiredCheck = false,
  eventIndex,
}) => {

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
  const showNonImportant = useMemo(() => typeof important !== 'undefined' && !important, [important]);

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
    <Grid>
      <Box sx={{ padding: 8 }}>
        <StyledEventCard elevation={2} sx={{ width: compact ? 200 : 300 }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="Type"
                sx={(theme) => ({
                  width: compact ? 36 : 40,
                  height: compact ? 36 : 40,
                  backgroundColor: showNonImportant ? grey[300] : theme.palette.primary.main,
                  opacity: showNonImportant ? 0.7 : 1.0
                })}
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
            sx={{
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
                    <Warning sx={{ margin: 8, color: yellow[500] }} />
                  </Tooltip>
                )}
              </>
            }
          />
          <CardActions sx={{ display: 'flex' }} disableSpacing>
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
            <StyledExpandIconButton
              onClick={() => toggleExpand(!expanded)}
              aria-expanded={expanded}
              aria-label="More Info"
              size={compact ? 'small' : 'medium'}
              sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <ExpandMoreIcon fontSize={compact ? 'small' : 'inherit'} />
            </StyledExpandIconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CutsceneEventProperties cutsceneEventData={cutsceneEventData} />
            </CardContent>
          </Collapse>
        </StyledEventCard>
      </Box>
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
