import React from 'react';

import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import VisuallyHiddenInput from './VisuallyHiddenInput';

import { addPreLoadedCutscenes } from '../../actions/cutsceneActions';


const selectLoadedCutsceneFileData = state => state.cutscene.preloadedCutsceneFileNames;
const memoizedSelector = createSelector([selectLoadedCutsceneFileData], (loadedCutsceneFileData => ({
  loadedCutsceneFileData
})));


const PreLoadedCutscenesContent = () => {

  const dispatch = useDispatch();
  const { loadedCutsceneFileData } = useSelector(state => memoizedSelector(state));

  const handleFileUpload = e => {
    const jsonFiles = [...e.target.files].filter(file => file.type === 'application/json');
    const paths = jsonFiles.map(file => file.webkitRelativePath.replace(/^Cutscenes\//, ''));
    dispatch(addPreLoadedCutscenes(paths));
  }

  return (
    <>
      <div style={{ padding: 8 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Button variant="contained" component="label">
              Import Cutscenes Folder
              <VisuallyHiddenInput
                type="file"
                directory="true"
                webkitdirectory="true"
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
          {loadedCutsceneFileData.length > 0 && (
            <Grid item>
              <Typography variant="body2">
                <b>Loaded {loadedCutsceneFileData.length} files</b>
              </Typography>
            </Grid>
          )}
        </Grid>

        {loadedCutsceneFileData.length <= 0 && (
          <div style={{ padding: 12 }}>
            <Typography variant="body1" textAlign="center">No files loaded</Typography>
          </div>
        )}

        {loadedCutsceneFileData.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadedCutsceneFileData.map(fileName => (
                <TableRow key={fileName}>
                  <TableCell>{fileName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

      </div>
    </>
  )
};

export default PreLoadedCutscenesContent;
