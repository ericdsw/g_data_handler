import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Button, Fab, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';

import TemplateCard from './TemplateCard';
import { DragAndDrop } from '../../../elements';

import { createTemplate, createTemplateWithData, moveEventBetweenTemplates, reorderEventInTemplate, reorderTemplate } from '../../../../actions/cutsceneActions';
import { downloadJSON, parseFile } from '../../../../functions';

const selectTemplateIds = state => state.cutscene.templateIds;
const selectTemplates = state => state.cutscene.eventTemplates;
const selectCutsceneEvents = state => state.cutscene.cutsceneEvents;
const memoizedSelector = createSelector(
  [selectTemplates, selectTemplateIds, selectCutsceneEvents],
  (templates, templateIds, cutsceneEvents) => ({
    templates,
    templateIds,
    cutsceneEvents
  })
);

const TemplateList = ({
  showInject = false,
  onInjectRequested = null
}) => {

  const dispatch = useDispatch();

  const { templates, templateIds, cutsceneEvents } = useSelector(state => memoizedSelector(state));
  const { enqueueSnackbar } = useSnackbar();

  const [newTemplateName, updateNewTemplateName] = useState('');

  const submitNewTemplate = e => {
    e.preventDefault();
    e.stopPropagation();
    if (newTemplateName) {
      updateNewTemplateName('');
      dispatch(createTemplate(newTemplateName));
    }
  }

  const rowRequestedInject = (templateName) => {
    if (onInjectRequested) {
      onInjectRequested(templateName);
    }
  }

  const handleDragEnd = result => {
    const { source, destination, draggableId, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    switch (type) {
      case 'templateRow':
        dispatch(reorderTemplate(source.index, destination.index, draggableId));
        break;
      case 'cutsceneTemplate':
        if (source.droppableId === destination.droppableId) {
          dispatch(
            reorderEventInTemplate(
              source.index,
              destination.index,
              source.droppableId,
              draggableId
            )
          );
        } else {
          dispatch(
            moveEventBetweenTemplates(
              source.index,
              destination.index,
              source.droppableId,
              destination.droppableId,
              draggableId
            )
          );
        }
        break;
      default:
        break;
    }
  }

  const handleDrop = async (files) => {
    try {
      for (let i = 0; i < files.length; i++) {
        const json = await parseFile(files[i], 'application/json');
        Object.keys(json).forEach(templateName => {
          const templateEvents = json[templateName];
          dispatch(createTemplateWithData(templateName, templateEvents));
        })
      }
    } catch (e) {
      enqueueSnackbar('Error importing templates', { variant: 'error' });
    }
  }

  const handleExportAll = () => {
    const result = {};
    templateIds.forEach(templateId => {
      const template = templates[templateId];
      result[template.name] = []
      template.templateEvents.forEach(eventId => {
        const cutsceneEvent = {...cutsceneEvents[eventId]}
        delete cutsceneEvent.id;
        result[template.name].push(cutsceneEvent);
      })
    });
    downloadJSON('templates.json', result);
  }

  const handleExportSingle = templateId => {
    const result = {};
    const template = templates[templateId];
    result[template.name] = []
    template.templateEvents.forEach(eventId => {
      const cutsceneEvent = {...cutsceneEvents[eventId]}
      delete cutsceneEvent.id;
      result[template.name].push(cutsceneEvent);
    });
    downloadJSON(`${template.name}.json`, result);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2} style={{ padding: 8 }}>
        <Grid item xs>
          <Typography variant='h5'>Templates</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={submitNewTemplate}>
            <Grid container alignItems="center">
              <TextField
                label="Template name"
                value={newTemplateName}
                onChange={e => updateNewTemplateName(e.target.value)}
              />
              <Fab
                size="small"
                color="primary"
                style={{ marginLeft: 12, boxShadow: 'none' }}
                type='submit'
              >
                <AddIcon />
              </Fab>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <DragAndDrop handleDrop={handleDrop}>
                <Paper 
                  elevation={1}
                  style={{
                    padding: 16,
                    cursor: 'pointer',
                    width: 150,
                    height: 130,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="caption" color="textSecondary" align="center">
                    Drag a JSON file here to import existing templates
                  </Typography>
                </Paper>
              </DragAndDrop>
              <br />
              <Button
                fullWidth
                variant="contained"
                onClick={handleExportAll}
              >
                Export all
              </Button>
            </Grid>
            <Grid item xs>
              {templateIds.length <= 0 && (
                <div style={{ padding: 12 }}>
                  <Typography variant="body2" textAlign="center">No templates found</Typography>
                </div>
              )}
              {templateIds.length > 0 && (
                <Droppable
                  droppableId='templateList'
                  type='templateRow'
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {templateIds.map((templateId, index) => (
                        <TemplateCard
                          key={templateId}
                          templateData={templates[templateId]}
                          index={index}
                          showInjectButton={showInject}
                          onInjectRequested={rowRequestedInject}
                          onExportRequested={handleExportSingle}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default TemplateList;