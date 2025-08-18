import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Draggable } from 'react-beautiful-dnd';

import CutsceneRow from './CutsceneRow';
import {
  addCutsceneRowAtPosition,
  deleteCutsceneRow,
  addCutsceneEvent,
  injectTemplate,
  addCutsceneRowToBulk,
  removeCutsceneRowFromBulk,
} from '../../../actions/cutsceneActions';

const memoizedSelectCutsceneRowData = createSelector(
  state => state.cutscene.cutsceneRows,
  (cutsceneRowData) => ({
    cutsceneRowData,
  })
);

const memoizedSelectIsRowInBulkMode = createSelector(
  state => state.cutscene.cutsceneRowsToMerge,
  (_, rowId) => rowId,
  (rowsToMerge, rowId) => rowsToMerge.includes(rowId)
);

const CutsceneRowContainer = ({ rowId, rowNumber }) => {
  const dispatch = useDispatch();
  const { cutsceneRowData } = useSelector((state) =>
    memoizedSelectCutsceneRowData(state)
  );
  const isInBulkMode = useSelector(state => memoizedSelectIsRowInBulkMode(state, rowId));

  const rowData = useMemo(
    () => cutsceneRowData[rowId],
    [rowId, cutsceneRowData]
  );

  const handleAddRowBelow = useCallback(() => {
    dispatch(addCutsceneRowAtPosition(rowNumber + 1));
  }, [dispatch, rowNumber]);

  const handleAddRowAbove = useCallback(() => {
    dispatch(addCutsceneRowAtPosition(rowNumber));
  }, [dispatch, rowNumber]);

  const handleDeleteRow = useCallback(() => {
    dispatch(deleteCutsceneRow(rowId));
  }, [dispatch, rowId]);

  const handleAddEvent = useCallback(
    (eventData) => {
      dispatch(addCutsceneEvent(rowId, eventData));
    },
    [dispatch, rowId]
  );

  const handleInjectTemplate = useCallback(
    (templateId) => {
      dispatch(injectTemplate(rowId, templateId));
    },
    [dispatch, rowId]
  );

  const handleToggleBulkMode = useCallback(
    (checked) => {
      if (checked) {
        dispatch(addCutsceneRowToBulk(rowId));
      } else {
        dispatch(removeCutsceneRowFromBulk(rowId));
      }
    }, [dispatch, rowId]
  );

  return (
    <Draggable draggableId={rowId} index={rowNumber}>
      {(provided) => {
        return (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <CutsceneRow
              rowData={rowData}
              rowNumber={rowNumber}
              handleAddRowBelow={handleAddRowBelow}
              handleAddRowAbove={handleAddRowAbove}
              handleDeleteRow={handleDeleteRow}
              handleAddEvent={handleAddEvent}
              dragHandleProps={provided.dragHandleProps}
              handleInjectTemplate={handleInjectTemplate}
              handleToggleBulkSelected={handleToggleBulkMode}
              isBulkSelected={isInBulkMode}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default CutsceneRowContainer;
