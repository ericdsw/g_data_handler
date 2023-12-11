import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { Icon, Typography } from '@mui/material';

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
} from '../../../actions/cutsceneActions';

const selectCurrentCutscene = state => state.cutscene.currentCutscene;
const selectCurrentCutsceneJumps = state => state.cutscene.currentCutsceneJumps;
const selectFileName = state => state.cutscene.fileName;
const selectHideBars = state => state.cutscene.hideBars;
const selectCutsceneContainerData = createSelector([
  selectCurrentCutscene, selectCurrentCutsceneJumps, selectFileName, selectHideBars
], (currentCutscene, currentCutsceneJumps, fileName, hideBars) => ({
  currentCutscene, currentCutsceneJumps, fileName, hideBars
}));

const CutsceneContainer = () => {

  /**
   * Snackbar related
   */
  const enqueueSnackbar = useSnackbar();
  const showError = useCallback((errorMessage) => {
    enqueueSnackbar(errorMessage, { variant: 'error' });
  }, [enqueueSnackbar]);

  /**
   * Redux communication
   */
  const dispatch = useDispatch();
  const {
    currentCutscene,
    currentCutsceneJumps,
    fileName,
    hideBars
  } = useSelector(state => selectCutsceneContainerData(state));

  /**
   * Memoized reference to the generated JSON
   */
  const generatedJson = useMemo(() => ({
    data: currentCutscene,
    cutscene_jumps: currentCutsceneJumps,
    hide_black_bars: hideBars
  }), [currentCutscene, currentCutsceneJumps, hideBars]);

  /**
   * Generates the exported file
   */
  const exportFile = useCallback(() => {
    // Check that the cutscene is not empty
    if (currentCutscene.length <= 0) {
      showError('Cannot export an empty cutscene');
      return;
    }

    // Check that no rows are empty
    let emptyRows = 0;
    currentCutscene.forEach((row) => {
      if (row.length <= 0) {
        emptyRows += 1;
      }
    });
    if (emptyRows > 0) {
      showError(
        `${emptyRows} row${emptyRows > 1 ? 's are' : ' is'} empty`
      );
      return;
    }

    // Perform download
    downloadJSON(fileName, generatedJson);
  }, [currentCutscene, fileName, generatedJson, showError]);

  useEffect(() => {
    window.exportCutscene = exportFile;
    window.printCutscene = () => {
      console.log(JSON.stringify(generatedJson))
    }
  }, [generatedJson, exportFile]);

  const clearCutscene = () => {
    dispatch(updateCutscene({
      cutscene: null,
      fileName: '',
      jumps: {},
      hideBars: false,
    }))
  };

  const updateWithEmptyCutscene = () => {
    dispatch(updateCutscene({
      cutscene: [],
      jumps: {},
      fileName: 'cutscene_file_name.json',
      hideBars: false,
    }));
  };

  const updateCutsceneFromFile = (targetFile) => {
    parseFile(targetFile, 'application/json')
      .then((json) => {
        let jumps = {};
        let hideBars = false;
        if (json['cutscene_jumps']) {
          jumps = json['cutscene_jumps'];
        }
        if (json['hide_black_bars']) {
          hideBars = json['hide_black_bars'];
        }
        dispatch(updateCutscene({
          cutscene: fillCutsceneWithDefaults(json['data']),
          jumps: jumps,
          fileName: targetFile.name,
          hideBars: hideBars,
        }));
      })
      .catch((error) => showError(error.message));
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

  if (currentCutscene !== null) {
    return (
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
          fileName={fileName}
          cutsceneRows={currentCutscene}
          jumps={currentCutsceneJumps}
          hideBars={hideBars}
          handleFileNameChange={changeFileName}
          handleAddRow={addRow}
          handleShouldHideBars={updateHideBars}
        />
      </>
    )
  }
  return (
    <DragJsonFileManager
      buttonString="New Cutscene"
      dragString={
        <React.Fragment>
          <Typography gutterBottom>
            <Icon fontSize="large">subscriptions</Icon>
          </Typography>
          Drag a <code>.json</code> here to edit an existing cutscene.
        </React.Fragment>
      }
      handleEmpty={updateWithEmptyCutscene}
      handleUpdateFromFile={updateCutsceneFromFile}
    />
  );

}

export default CutsceneContainer;

