import React from 'react';
import { Button, Card, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { DragHandle } from '@material-ui/icons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useDispatch } from 'react-redux';

import CutsceneEventContainer from '../CutsceneEventContainer';
import { ConfirmationDialogue, GenericDialogue } from '../../../elements';
import { useDialogueManager } from '../../../../hooks';
import UpdateTemplateNameForm from '../forms/UpdateTemplateNameForm';
import { CreateEventForm } from '../forms';

import {
  updateTemplateName,
  deleteTemplate,
  addExistingEventToTemplate
} from '../../../../actions/cutsceneActions';

const TemplateCard = ({
  templateData,
  index,
  onExportRequested,
  onAddEventToCardRequested,
  showInjectButton = false,
  onInjectRequested = null,
}) => {

  const dispatch = useDispatch();

  const [dialogues, toggleDialogue] = useDialogueManager('edit', 'confirmDelete', 'addEvent');

  const onInjectButtonClick = () => {
    if (onInjectButtonClick) {
      onInjectRequested(templateData.id);
    }
  }

  const onExportButtonClick = () => {
    onExportRequested(templateData.id);
  }

  return (
    <>
      <Draggable
        draggableId={templateData.id}
        index={index}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div style={{ paddingBottom: 8 }}>

              <Card style={{ padding: 16 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item {...provided.dragHandleProps}>
                    <DragHandle />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                      <b>{templateData.name}</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Export single template">
                      <IconButton
                        onClick={onExportButtonClick}
                      >
                        <FileDownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add cutscene event">
                      <IconButton onClick={() => toggleDialogue('addEvent', 'show')}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit template name">
                      <IconButton
                        onClick={() => toggleDialogue('edit', 'show')}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete template">
                      <IconButton
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {showInjectButton && (
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={onInjectButtonClick}
                      >
                        Inject
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Droppable
                    droppableId={templateData.id}
                    type="cutsceneTemplate"
                    direction="horizontal"
                  >
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          minHeight: 1
                        }}
                      >
                        <Grid container>
                          {templateData.templateEvents.map((eventId, index) => (
                            <CutsceneEventContainer
                              key={eventId}
                              eventId={eventId}
                              eventIndex={index}
                              compact
                            />
                          ))}
                          {provided.placeholder}
                        </Grid>
                      </div>
                    )}
                  </Droppable>

                </Grid>
              </Card>
            </div>
          </div>
        )}
      </Draggable>

      <GenericDialogue
        title="Edit Template Name"
        open={dialogues['edit']}
        onClose={() => toggleDialogue('edit', 'hide')}
        maxWidth='sm'
      >
        <UpdateTemplateNameForm
          data={{ template_name: templateData.name }}
          handleSubmit={result => {
            toggleDialogue('edit', 'hide');
            dispatch(updateTemplateName(templateData.id, result.template_name));
          }}
        />
      </GenericDialogue>

      <GenericDialogue
        title="Add event to template"
        open={dialogues['addEvent']}
        maxWidth="sm"
        onClose={() => toggleDialogue('addEvent', 'hide')}
      >
        <CreateEventForm
          creationHandler={(eventData) => {
            toggleDialogue('addEvent', 'hide');
            dispatch(addExistingEventToTemplate(templateData.id, eventData));
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the template?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogue('confirmDelete', 'hide');
          dispatch(deleteTemplate(templateData.id));
        }}
      />

    </>
  );
}

export default TemplateCard