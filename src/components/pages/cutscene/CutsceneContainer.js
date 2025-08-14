import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Subscriptions from '@material-ui/icons/Subscriptions';
import SystemUpdateAlt from '@mui/icons-material/SystemUpdateAlt';

import { FabAbsoluteContainer, GenericDialogue } from '../../elements';
import TemplateList from './elements/TemplateList';

import Cutscene from './Cutscene';
import CutsceneToolbar from './CutsceneToolbar';
import { DragJsonFileManager } from '../../elements';
import {
  downloadJSON,
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
} from '../../../actions/cutsceneActions';

import {
  transformIn,
  transformOut,
} from '../../../models/transformers/CutsceneTransformer';
import { useDialogueManager } from '../../../hooks';

const selectCutsceneId = (state) => state.cutscene.currentCutsceneId;
const selectCutscenes = (state) => state.cutscene.cutscenes;
const selectFileName = (state) => state.cutscene.fileName;
const selectHideBars = (state) => state.cutscene.hideBars;
const selectJumps = (state) => state.cutscene.currentCutsceneJumps;
const selectCutsceneRows = (state) => state.cutscene.cutsceneRows;
const selectCutsceneEvents = (state) => state.cutscene.cutsceneEvents;

const memoizedSelectCutsceneData = createSelector(
  [
    selectCutsceneId,
    selectCutscenes,
    selectFileName,
    selectHideBars,
    selectJumps,
    selectCutsceneRows,
    selectCutsceneEvents,
  ],
  (
    currentCutsceneId,
    cutscenes,
    fileName,
    hideBars,
    currentCutsceneJumps,
    cutsceneRows,
    cutsceneEvents
  ) => ({
    currentCutsceneId,
    currentCutscene: cutscenes[currentCutsceneId],
    fileName,
    hideBars,
    currentCutsceneJumps,
    cutsceneRows,
    cutsceneEvents,
  })
);

const CutsceneContainer = () => {
  const [dialogues, toggleDialogue] = useDialogueManager('templates');

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
    cutsceneRows,
    cutsceneEvents,
  } = useSelector((state) => memoizedSelectCutsceneData(state));

  /**
   * Memoized reference to the generated JSON
   */
  const generatedJson = useMemo(
    () => ({
      data: transformOut(currentCutsceneId, {
        cutscenes: {
          [currentCutsceneId]: currentCutscene,
        },
        cutsceneRows,
        cutsceneEvents,
      }),
      cutscene_jumps: currentCutsceneJumps,
      hide_black_bars: hideBars,
    }),
    [
      currentCutscene,
      currentCutsceneJumps,
      hideBars,
      currentCutsceneId,
      cutsceneEvents,
      cutsceneRows,
    ]
  );

  /**
   * In case some fucky wucky happens, I'll just bind these two methods directly
   * to the window object so they can be invoked by the browser's console.
   */
  useEffect(() => {
    window.exportCutscene = () => {
      downloadJSON(fileName, generatedJson);
    };
    window.printCutscene = () => {
      console.log(JSON.stringify(generatedJson));
    };
  }, [generatedJson, fileName]);

  const exportFile = useCallback(() => {
    // Check that the cutscene is not empty
    if (currentCutscene.cutsceneRows.length <= 0) {
      showError('Cannot export an empty cutscene');
      return;
    }

    // Check that no rows are empty
    let emptyRows = 0;

    generatedJson.data.forEach((row) => {
      if (row.length <= 0) {
        emptyRows += 1;
      }
    });
    if (emptyRows > 0) {
      showError(`${emptyRows} row${emptyRows > 1 ? 's are' : ' is'} empty`);
      return;
    }

    // Perform download
    downloadJSON(fileName, generatedJson);
  }, [currentCutscene, fileName, generatedJson, showError]);

  const clearCutscene = () => {
    dispatch(deleteCutscene());
  };

  const updateEmpty = () => {
    dispatch(updateWithEmptyCutscene());
  };

  const updateCutsceneFromFile = async (targetFile) => {
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
  };

  const updateHideBars = (shouldHide) => {
    dispatch(updateCutsceneHideBars(shouldHide));
  };

  const changeFileName = (newFileName) => {
    dispatch(updateCutsceneFileName(newFileName));
  };

  const addRow = () => {
    dispatch(addCutsceneRow());
  };

  const addJump = (jumpName, fileName) => {
    dispatch(addCutsceneJump(jumpName, fileName));
  };

  const deleteJump = (jumpName) => {
    dispatch(deleteCutsceneJump(jumpName));
  };

  const onDragEnd = (result) => {
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
  };

  let content;

  if (currentCutsceneId !== '') {
    content = (
      <>
        <CutsceneToolbar
          jumps={currentCutsceneJumps}
          handleAddRow={addRow}
          handleAddJump={addJump}
          handleDeleteJump={deleteJump}
          handleExport={exportFile}
          handleClearCutscene={clearCutscene}
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
    );
  } else {
    content = (
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
    );
  }

  return (
    <>
      {content}
      <FabAbsoluteContainer
        buttonMetadata={[
          {
            title: 'Templates',
            icon: <LibraryBooksIcon />,
            onClick: () => toggleDialogue('templates', 'show'),
          },
          {
            title: 'Export',
            icon: <SystemUpdateAlt />,
            onClick: exportFile,
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
    </>
  );
};

export default CutsceneContainer;
