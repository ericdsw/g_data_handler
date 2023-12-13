import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import CutsceneEvent from './CutsceneEvent';
import {
  editCutsceneEvent,
  deleteCutsceneEvent,
} from '../../../actions/cutsceneActions';

const selectCutsceneEvents = state => state.cutscene.cutsceneEvents;

const memoizedSelectCutsceneEventData = createSelector([selectCutsceneEvents], cutsceneEvents => ({
  cutsceneEvents
}))

const CutsceneEventContainer = ({
  eventId,
}) => {

  const dispatch = useDispatch()
  const { cutsceneEvents } = useSelector(state => memoizedSelectCutsceneEventData(state));

  const cutsceneEventData = useMemo(() => cutsceneEvents[eventId], [cutsceneEvents, eventId])

  const handleEditEvent = useCallback(newEventData => {
    dispatch(editCutsceneEvent(eventId, newEventData));
  }, [eventId, dispatch]);

  const handleDeleteEvent = useCallback(() => {
    dispatch(deleteCutsceneEvent(eventId));
  }, [eventId, dispatch])

  return (
    <CutsceneEvent
      cutsceneEventData={cutsceneEventData}
      handleEditEvent={handleEditEvent}
      handleDeleteEvent={handleDeleteEvent}
    />
  );
};

export default CutsceneEventContainer;
