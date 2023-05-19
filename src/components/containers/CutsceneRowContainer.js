import React from 'react';
import { connect } from 'react-redux';
import CutsceneRow from '../pages/cutscene/CutsceneRow';
import {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
} from '../../actions/cutsceneActions';

const CutsceneRowContainer = ({
  rowData,
  rowNumber,
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
}) => {
  return (
    <CutsceneRow
      rowData={rowData}
      rowNumber={rowNumber}
      handleAddRowBelow={() => {
        addCutsceneRowAtPosition(rowNumber + 1);
      }}
      handleAddRowAbove={() => {
        addCutsceneRowAtPosition(rowNumber);
      }}
      handleDeleteRow={() => {
        deleteCutsceneRow(rowNumber);
      }}
      handleAddEvent={(eventData) => {
        addCutsceneEvent(rowNumber, eventData);
      }}
    />
  );
};

export default connect(null, {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
})(CutsceneRowContainer);
