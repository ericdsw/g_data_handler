import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import CutsceneRow from '../pages/cutscene/CutsceneRow';
import {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
} from '../../actions/cutsceneActions';

class CutsceneRowContainer extends React.Component {
  addRowBelow = () => {
    const { rowNumber, addCutsceneRowAtPosition } = this.props;
    addCutsceneRowAtPosition(rowNumber + 1);
  };

  addRowAbove = () => {
    const { rowNumber, addCutsceneRowAtPosition } = this.props;
    addCutsceneRowAtPosition(rowNumber);
  };

  deleteCutsceneRow = () => {
    const { rowNumber, deleteCutsceneRow } = this.props;
    deleteCutsceneRow(rowNumber);
  };

  addNewEvent = (eventData) => {
    const { rowNumber, addCutsceneEvent } = this.props;
    addCutsceneEvent(rowNumber, eventData);
  };

  render() {
    const { rowData, rowNumber } = this.props;
    return (
      <CutsceneRow
        rowData={rowData}
        rowNumber={rowNumber}
        handleAddRowBelow={this.addRowBelow}
        handleAddRowAbove={this.addRowAbove}
        handleDeleteRow={this.deleteCutsceneRow}
        handleAddEvent={this.addNewEvent}
      />
    );
  }
}

export default connect(null, {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
})(withSnackbar(CutsceneRowContainer));
