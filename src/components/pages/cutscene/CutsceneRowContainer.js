import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit';

import CutsceneRow from './CutsceneRow';
import {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
} from '../../../actions/cutsceneActions';

const selectCutsceneRows = state => state.cutscene.cutsceneRows;
const memoizedSelectCutsceneRowData = createSelector([selectCutsceneRows], cutsceneRowData => ({
  cutsceneRowData
}))

const CutsceneRowContainer = ({
  rowId,
  rowNumber,
}) => {

  const dispatch = useDispatch();
  const { cutsceneRowData } = useSelector(state => memoizedSelectCutsceneRowData(state));
  const rowData = useMemo(() => cutsceneRowData[rowId], [rowId, cutsceneRowData]);

  const handleAddRowBelow = useCallback(() => {
    dispatch(addCutsceneRowAtPosition(rowNumber + 1))
  }, [dispatch, rowNumber]);

  const handleAddRowAbove = useCallback(() => {
    dispatch(addCutsceneRowAtPosition(rowNumber))
  }, [dispatch, rowNumber]);

  const handleDeleteRow = useCallback(() => {
    dispatch(deleteCutsceneRow(rowId));
  }, [dispatch, rowId]);

  const handleAddEvent = useCallback((eventData) => {
    dispatch(addCutsceneEvent(rowId, eventData))
  }, [dispatch, rowId]);

  return (
    <CutsceneRow
      rowData={rowData}
      rowNumber={rowNumber}
      handleAddRowBelow={handleAddRowBelow}
      handleAddRowAbove={handleAddRowAbove}
      handleDeleteRow={handleDeleteRow}
      handleAddEvent={handleAddEvent}
    />
  );
};

export default CutsceneRowContainer;
