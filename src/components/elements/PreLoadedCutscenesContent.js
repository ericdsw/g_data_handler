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

import { addPreLoadedCutscenes, addSinglePreLoadedCutsceneName } from '../../actions/cutsceneActions';
import PreLoadedCutscenesContentRow from './PreLoadedCutscenesContentRow';

const selectLoadedCutsceneFileData = (state) =>
  state.cutscene.preloadedCutsceneFileNames;
const memoizedSelector = createSelector(
  [selectLoadedCutsceneFileData],
  (loadedCutsceneFileData) => ({
    loadedCutsceneFileData,
  })
);

const PreLoadedCutscenesContent = () => {
  const dispatch = useDispatch();
  const { loadedCutsceneFileData } = useSelector((state) =>
    memoizedSelector(state)
  );

  const handleFileUpload = (e) => {
    const jsonFiles = [...e.target.files].filter(
      (file) => file.type === 'application/json'
    );
    const paths = jsonFiles.map((file) =>
      file.webkitRelativePath.replace(/^Cutscenes\//, '')
    );
    dispatch(addPreLoadedCutscenes(paths));
  };

  const handleSingleFileUpload = e => {
    [...e.target.files].forEach(file => {
      const fileName = file.name;
      dispatch(addSinglePreLoadedCutsceneName(fileName));
    });
  }

  return (
    <>
      <div style={{ padding: 8 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
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
          <Grid item>
            <Button variant="contained" component="label">
              Import single cutscene file
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleSingleFileUpload}
              />
            </Button>
          </Grid>
          {loadedCutsceneFileData.length > 0 && (
            <Grid item xs>
              <Typography variant="body2" textAlign="right">
                <b>Loaded {loadedCutsceneFileData.length} files</b>
              </Typography>
            </Grid>
          )}
        </Grid>

        {loadedCutsceneFileData.length <= 0 && (
          <div style={{ padding: 12 }}>
            <Typography variant="body1" textAlign="center">
              No files loaded
            </Typography>
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
              {loadedCutsceneFileData.map((fileName) => (
                <TableRow key={fileName}>
                  <TableCell>
                    <PreLoadedCutscenesContentRow
                      fileName={fileName}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default PreLoadedCutscenesContent;
