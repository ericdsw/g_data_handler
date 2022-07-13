import React, { useMemo, useState, useCallback } from 'react';

import {
  Autocomplete,
  Button,
  TextField,
  Grid
} from '@mui/material';

import { speakerNames } from '../../../../globals';


const SpeakerNameSearchForm = ({
  onSpeakerSelected
}) => {

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');


  const searchableNames = useMemo(() => {
    const result = {};
    Object.keys(speakerNames).forEach(speakerNameKey => {
      const compoundString = `${speakerNames[speakerNameKey]} (${speakerNameKey})`;
      result[compoundString] = speakerNameKey;
    });
    return result;
  }, []);


  const options = useMemo(() => {
    return Object.keys(searchableNames).map(compoundString => ({
      label: compoundString
    }))
  }, [searchableNames]);


  const onSubmit = useCallback(e => {

    e.preventDefault();
    e.stopPropagation();

    if (value && value.label) {
      const usedName = searchableNames[value.label];
      onSpeakerSelected(usedName);
    }

  }, [value, searchableNames, onSpeakerSelected]);

  return (
    <form onSubmit={onSubmit}>

      <Grid
        container
        spacing={2}
        alignItems="center"
      >

        <Grid item xs={12} md={10}>
          <Autocomplete
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={options}
            autoHighlight
            renderInput={params => (
              <TextField {...params} label="Speaker Name" autoFocus />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Select
          </Button>
        </Grid>

      </Grid>
    </form>
  );

}

export default SpeakerNameSearchForm;