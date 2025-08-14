import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';

const selectTemplates = (state) => state.cutscene.eventTemplates;
const selectTemplateIds = (state) => state.cutscene.templateIds;
const memoizedSelector = createSelector(
  [selectTemplates, selectTemplateIds],
  (templates, templateIds) => ({
    templates,
    templateIds,
  })
);

const AddEventToTemplateForm = ({ onAddEvent }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { templates, templateIds } = useSelector((state) =>
    memoizedSelector(state)
  );
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedTemplate) {
      enqueueSnackbar('No template selected', { variant: 'error' });
      return;
    }
    onAddEvent(selectedTemplate);
  };

  return (
    <form onSubmit={submitForm} style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            value={selectedTemplate}
            onChange={(_, val) => {
              setSelectedTemplate(val);
            }}
            onInputChange={(_, val) => {
              setSelectedTemplate(val);
            }}
            options={templateIds}
            disableClearable
            getOptionLabel={(option) => {
              if (!option || !Object.keys(templates).includes(option)) {
                return '---';
              }
              return templates[option].name;
            }}
            renderInput={(params) => <TextField {...params} label="Template" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Add to template
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEventToTemplateForm;
