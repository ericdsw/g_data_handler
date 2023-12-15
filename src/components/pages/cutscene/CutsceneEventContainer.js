import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Draggable } from 'react-beautiful-dnd';

import CutsceneEvent from './CutsceneEvent';
import {
  editCutsceneEvent,
  deleteCutsceneEvent,
  addExistingEventToTemplate
} from '../../../actions/cutsceneActions';

const selectCutsceneEvents = state => state.cutscene.cutsceneEvents;

const memoizedSelectCutsceneEventData = createSelector([selectCutsceneEvents], cutsceneEvents => ({
  cutsceneEvents
}))

const CutsceneEventContainer = ({
  eventId,
  eventIndex
}) => {

  const dispatch = useDispatch()
  const { cutsceneEvents } = useSelector(state => memoizedSelectCutsceneEventData(state));

  const cutsceneEventData = useMemo(() => cutsceneEvents[eventId], [cutsceneEvents, eventId])

  const handleEditEvent = useCallback(newEventData => {
    dispatch(editCutsceneEvent(eventId, newEventData));
  }, [eventId, dispatch]);

  const handleDeleteEvent = useCallback(() => {
    dispatch(deleteCutsceneEvent(eventId));
  }, [eventId, dispatch]);

  const handleAddToTemplate = useCallback(templateId => {
    dispatch(addExistingEventToTemplate(templateId, cutsceneEventData));
  }, [cutsceneEventData, dispatch]);

  return (
    <Draggable
      draggableId={eventId}
      index={eventIndex}
    >
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <CutsceneEvent
            cutsceneEventData={cutsceneEventData}
            handleEditEvent={handleEditEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleAddToTemplate={handleAddToTemplate}
            eventIndex={eventIndex}
          />
        </div>
      )}
    </Draggable>
  );
};

export default CutsceneEventContainer;
