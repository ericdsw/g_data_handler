import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Paper, Grid, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import { CutsceneRowToolbar } from './elements';
import { CreateEventForm } from './forms';
import CutsceneEventContainer from './CutsceneEventContainer';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';

import { styles } from './styles/CutsceneRowStyle';

import TemplateList from './elements/TemplateList';
import { DragHandle } from '@mui/icons-material';

const useStyles = makeStyles(styles);

const CutsceneRow = ({
  rowData,
  rowNumber,
  handleAddRowBelow,
  handleAddRowAbove,
  handleDeleteRow,
  handleAddEvent,
  handleInjectTemplate,
  ...props
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'createEvent',
    'insertTemplate'
  );

  const cutsceneEventIds = useMemo(() => rowData.cutsceneEvents, [rowData]);

  return (
    <Grid item xs={12}>
      <div className={classes.mockContainer}>
        <Paper className={classes.cutsceneRow} elevation={1}>
          <Grid container alignItems="center">
            <Grid item>
              <div
                className={classes.dragHandleElement}
                {...props.dragHandleProps}
              >
                <DragHandle />
              </div>
            </Grid>
            <Grid item xs>
              <Typography variant="caption">Event Row: {rowNumber}</Typography>
            </Grid>
            <Grid item xs={8}>
              <CutsceneRowToolbar
                addAboveClick={handleAddRowAbove}
                addBelowClick={handleAddRowBelow}
                addEventClick={() => {
                  toggleDialogue('createEvent', 'show');
                }}
                deleteRowClick={() => {
                  toggleDialogue('confirmDelete', 'show');
                }}
                insertTemplateClick={() => {
                  toggleDialogue('insertTemplate', 'show');
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" spacing={2}>
            <Droppable
              droppableId={rowData.id}
              type="cutsceneEvent"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: 'flex',
                    marginTop: cutsceneEventIds.length <= 0 ? 0 : 16,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {cutsceneEventIds.map((eventId, index) => (
                    <CutsceneEventContainer
                      key={eventId}
                      eventId={eventId}
                      eventIndex={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </Paper>
      </div>

      <GenericDialogue
        title="Create Cutscene Event"
        open={dialogues['createEvent']}
        maxWidth="sm"
        onClose={() => toggleDialogue('createEvent', 'hide')}
      >
        <CreateEventForm
          creationHandler={(eventData) => {
            handleAddEvent(eventData);
            toggleDialogue('createEvent', 'hide');
          }}
        />
      </GenericDialogue>

      <GenericDialogue
        title="Insert template to row"
        open={dialogues['insertTemplate']}
        maxWidth="lg"
        onClose={() => toggleDialogue('insertTemplate', 'hide')}
      >
        <TemplateList
          showInject
          onInjectRequested={(templateId) => {
            toggleDialogue('insertTemplate', 'hide');
            handleInjectTemplate(templateId);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the cutscene row?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDeleteRow();
          toggleDialogue('confirmDelete', 'hide');
        }}
      />
    </Grid>
  );
};

export default CutsceneRow;
