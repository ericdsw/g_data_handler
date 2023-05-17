import React from 'react';
import { connect } from 'react-redux';
import CutsceneEvent from '../pages/cutscene/CutsceneEvent';
import {
  editCutsceneEvent,
  deleteCutsceneEvent,
} from '../../actions/cutsceneActions';

const CutsceneEventContainer = ({
  rowNumber,
  eventNumber,
  editCutsceneEvent,
  deleteCutsceneEvent,
  cutsceneEventData
}) => {
  return (
    <CutsceneEvent
      cutsceneEventData={cutsceneEventData}
      handleEditEvent={(newEventData) => { editCutsceneEvent(rowNumber, eventNumber, newEventData) }}
      handleDeleteEvent={() => { deleteCutsceneEvent(rowNumber, eventNumber) }}
    />
  )
}

export default connect(null, {
  editCutsceneEvent,
  deleteCutsceneEvent,
})(CutsceneEventContainer);
