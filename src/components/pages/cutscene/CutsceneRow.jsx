import { useMemo } from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import { DragHandle } from '@mui/icons-material';

import { CutsceneRowToolbar } from './elements';
import { CreateEventForm } from './forms';
import CutsceneEventContainer from './CutsceneEventContainer';
import { GenericDialogue, ConfirmationDialogue } from '@/components/elements';
import { useDialogueManager } from '@/hooks';

import TemplateList from './elements/TemplateList';

const MockContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1)
}));
const StyledCutsceneRowPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(3)
}));
const DragHandleWrapper = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  color: theme.palette.getContrastText(theme.palette.messageBackground),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CutsceneRow = ({
  rowData,
  rowNumber,
  isBulkSelected,
  handleAddRowBelow,
  handleAddRowAbove,
  handleDeleteRow,
  handleAddEvent,
  handleInjectTemplate,
  handleToggleBulkSelected,
  ...props
}) => {
  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'createEvent',
    'insertTemplate'
  );

  const cutsceneEventIds = useMemo(() => rowData.cutsceneEvents, [rowData]);

  return (
    <Grid size={12}>
      <MockContainer>
        <StyledCutsceneRowPaper elevation={1}>
          <Grid container sx={{
            alignItems: "center"
          }}>
            <Grid>
              <DragHandleWrapper {...props.dragHandleProps}>
                <DragHandle />
              </DragHandleWrapper>
            </Grid>
            <Grid size="grow">
              <Typography variant="caption">Event Row: {rowNumber}</Typography>
            </Grid>
            <Grid size={8}>
              <CutsceneRowToolbar
                cutsceneRowId={rowData.id}
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
                isBulkSelected={isBulkSelected}
                handleToggleBulkSelected={handleToggleBulkSelected}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2} sx={{
            justifyContent: "center"
          }}>
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
        </StyledCutsceneRowPaper>
      </MockContainer>
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
