import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Subscriptions from '@material-ui/icons/Subscriptions';
import SystemUpdateAlt from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';

import { ConfirmationDialogue, FabAbsoluteContainer, GenericDialogue } from '../../elements';
import TemplateList from './elements/TemplateList';

import Cutscene from './Cutscene';
import CutsceneToolbar from './CutsceneToolbar';
import { DragJsonFileManager } from '../../elements';
import {
  parseFile,
  fillCutsceneWithDefaults,
} from '../../../functions';
import {
  updateCutsceneFileName,
  updateCutscene,
  addCutsceneRow,
  addCutsceneJump,
  deleteCutsceneJump,
  updateCutsceneHideBars,
  updateWithEmptyCutscene,
  deleteCutscene,
  reorderCutsceneRows,
  reorderCutsceneEvent,
  moveCutsceneEvent,
  exportCurrentCutscene,
  deleteCutsceneRowBulk,
  bulkSelectAll,
  bulkUnselectAllCutsceneRows
} from '../../../actions/cutsceneActions';

import {
  transformIn,
} from '../../../models/transformers/CutsceneTransformer';
import { useDialogueManager } from '../../../hooks';
import { ClearAll, DeleteSweep, SelectAll } from '@mui/icons-material';
import { red } from '@mui/material/colors';

const selectCutsceneId = (state) => state.cutscene.currentCutsceneId;
const selectCutscenes = (state) => state.cutscene.cutscenes;
const selectFileName = (state) => state.cutscene.fileName;
const selectHideBars = (state) => state.cutscene.hideBars;
const selectJumps = (state) => state.cutscene.currentCutsceneJumps;

const memoizedSelectCutsceneData = createSelector(
  [
    selectCutsceneId,
    selectCutscenes,
    selectFileName,
    selectHideBars,
    selectJumps,
  ],
  (
    currentCutsceneId,
    cutscenes,
    fileName,
    hideBars,
    currentCutsceneJumps,
  ) => ({
    currentCutsceneId,
    currentCutscene: cutscenes[currentCutsceneId],
    fileName,
    hideBars,
    currentCutsceneJumps,
  })
);

const CutsceneContainer = () => {
  const [dialogues, toggleDialogue] = useDialogueManager(
    'templates', 'confirmBulkDelete', 'confirmClearCutscene'
  );

  /**
   * Snackbar related
   */
  const { enqueueSnackbar } = useSnackbar();
  const showError = useCallback(
    (errorMessage) => {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    },
    [enqueueSnackbar]
  );

  /**
   * Redux communication
   */
  const dispatch = useDispatch();
  const {
    currentCutsceneId,
    currentCutscene,
    currentCutsceneJumps,
    fileName,
    hideBars,
  } = useSelector((state) => memoizedSelectCutsceneData(state));
  const bulkModeRows = useSelector(state => state.cutscene.cutsceneRowsToMerge);

  const bulkRowsAmount = useMemo(() => bulkModeRows.length, [bulkModeRows]);
  const rowsAmount = useMemo(
    () => currentCutscene ? currentCutscene.cutsceneRows.length : 0,
    [currentCutscene]
  );

  /**
   * In case some fucky wucky happens, I'll just bind these two methods directly
   * to the window object so they can be invoked by the browser's console.
   */
  useEffect(() => {
    window.exportCutscene = () => {
      dispatch(exportCurrentCutscene());
    };
  }, [dispatch, fileName]);

  const exportFile = useCallback(() => {
    if (currentCutscene.cutsceneRows.length <= 0) {
      showError('Cannot export an empty cutscene');
      return;
    }
    dispatch(exportCurrentCutscene());
  }, [dispatch, currentCutscene, showError]);

  const clearCutscene = useCallback(() => {
    dispatch(deleteCutscene());
  }, [dispatch]);

  const updateEmpty = useCallback(() => {
    dispatch(updateWithEmptyCutscene());
  }, [dispatch]);

  const updateCutsceneFromFile = useCallback(async (targetFile) => {
    try {
      const json = await parseFile(targetFile, 'application/json');
      const jumps = json['cutscene_jumps'] || {};
      const hideBars = json['hide_black_bars'] || false;

      const fixedCutscene = fillCutsceneWithDefaults(json.data);

      const { result, entities } = transformIn(fixedCutscene);

      dispatch(
        updateCutscene({
          currentCutsceneId: result,
          jumps,
          fileName: targetFile.name,
          hideBars: hideBars,
          ...entities,
        })
      );
    } catch (e) {
      showError(e.message);
    }
  }, [dispatch, showError]);

  const updateHideBars = useCallback((shouldHide) => {
    dispatch(updateCutsceneHideBars(shouldHide));
  }, [dispatch]);

  const changeFileName = useCallback((newFileName) => {
    dispatch(updateCutsceneFileName(newFileName));
  }, [dispatch]);

  const addRow = useCallback(() => {
    dispatch(addCutsceneRow());
  }, [dispatch]);

  const addJump = useCallback((jumpName, fileName) => {
    dispatch(addCutsceneJump(jumpName, fileName));
  }, [dispatch]);

  const deleteJump = useCallback((jumpName) => {
    dispatch(deleteCutsceneJump(jumpName));
  }, [dispatch]);

  const bulkDelete = useCallback(() => {
    dispatch(deleteCutsceneRowBulk());
  }, [dispatch]);

  const handleModifySelect = useCallback(() => {
    if (rowsAmount > bulkRowsAmount) {
      dispatch(bulkSelectAll());
    } else {
      dispatch(bulkUnselectAllCutsceneRows());
    }
  }, [dispatch, rowsAmount, bulkRowsAmount])

  const onDragEnd = useCallback((result) => {
    const { source, destination, draggableId, type } = result;
    // If no destination is defined or no movement needs to be made, skip
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    switch (type) {
      case 'cutsceneRow':
        dispatch(
          reorderCutsceneRows(source.index, destination.index, draggableId)
        );
        break;

      case 'cutsceneEvent':
        if (source.droppableId === destination.droppableId) {
          dispatch(
            reorderCutsceneEvent(
              source.index,
              destination.index,
              source.droppableId,
              draggableId
            )
          );
        } else {
          dispatch(
            moveCutsceneEvent(
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
  }, [dispatch]);

  return (
    <>
      {currentCutsceneId !== '' && (
        <>
          <CutsceneToolbar
            jumps={currentCutsceneJumps}
            handleAddRow={addRow}
            handleAddJump={addJump}
            handleDeleteJump={deleteJump}
            handleExport={exportFile}
            handleClearCutscene={() => toggleDialogue('confirmClearCutscene', 'show')}
          />
          <Cutscene
            cutscene={currentCutscene}
            fileName={fileName}
            hideBars={hideBars}
            handleFileNameChange={changeFileName}
            handleAddRow={addRow}
            handleShouldHideBars={updateHideBars}
            handleDragEnd={onDragEnd}
          />
        </>
      )}
      {currentCutsceneId === '' && (
        <DragJsonFileManager
          buttonString="New Cutscene"
          dragString={
            <>
              <Typography gutterBottom>
                <Subscriptions fontSize="large" />
              </Typography>
              Drag a <code>.json</code> here to edit an existing cutscene.
            </>
          }
          handleEmpty={updateEmpty}
          handleUpdateFromFile={updateCutsceneFromFile}
        />
      )}
      <FabAbsoluteContainer
        buttonMetadata={[
          {
            title: rowsAmount > bulkRowsAmount ? 'Select All' : 'Unselect All',
            icon: rowsAmount > bulkModeRows ? <SelectAll /> : <ClearAll />,
            color: 'default',
            hidden: bulkRowsAmount <= 0,
            onClick: handleModifySelect
          },
          {
            title: 'Delete Selected',
            icon: <DeleteSweep />,
            onClick: () => toggleDialogue('confirmBulkDelete', 'show'),
            color: 'error',
            hidden: bulkRowsAmount <= 0,
            style: {
              background: red[300]
            }
          },
          {
            title: 'Templates',
            icon: <LibraryBooksIcon />,
            onClick: () => toggleDialogue('templates', 'show'),
            color: 'secondary'
          },
          {
            title: 'Clear Cutscene',
            color: 'error',
            icon: <DeleteIcon />,
            hidden: currentCutsceneId === '',
            onClick: () => toggleDialogue('confirmClearCutscene', 'show'),
          },
          {
            title: 'Export',
            icon: <SystemUpdateAlt />,
            onClick: exportFile,
            color: 'primary',
            hidden: currentCutsceneId === ''
          },
        ]}
      />
      <GenericDialogue
        open={dialogues['templates']}
        onClose={() => toggleDialogue('templates', 'hide')}
        maxWidth="lg"
      >
        <TemplateList />
      </GenericDialogue>
      <ConfirmationDialogue
        message="Delete selected rows?"
        isOpen={dialogues['confirmBulkDelete']}
        handleConfirm={() => {
          bulkDelete();
          toggleDialogue('confirmBulkDelete', 'hide');
        }}
        handleClose={() => toggleDialogue('confirmBulkDelete', 'hide')}
      />
      <ConfirmationDialogue
        message="Clear the current cutscene?"
        isOpen={dialogues['confirmClearCutscene']}
        handleConfirm={() => {
          toggleDialogue('confirmClearCutscene', 'hide');
          clearCutscene();
        }}
        handleClose={() => toggleDialogue('confirmClearCutscene', 'hide')}
      />
    </>
  );
};

export default CutsceneContainer;
