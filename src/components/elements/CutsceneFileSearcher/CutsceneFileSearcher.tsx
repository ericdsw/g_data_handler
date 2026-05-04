import { Autocomplete, Grid, TextField } from '@mui/material';
import { useAppSelector } from '@/hooks';

const CutsceneFileSearcher = ({ label, value, onChange }) => {
  const fileNames = useAppSelector(state => state.cutscene.preloadedCutsceneFileNames);
  return (
    <Grid container spacing={2} sx={{ marginTop: 0 }}>
      <Grid size="grow">
        <Autocomplete
          freeSolo
          fullWidth
          value={value || null}
          onChange={(_, val) => {
            onChange({ target: { value: val } });
          }}
          onInputChange={(_, val) => {
            onChange({ target: { value: val } });
          }}
          options={fileNames}
          disableClearable
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      </Grid>
    </Grid>
  );
};

export default CutsceneFileSearcher;
