import { Autocomplete, TextField } from '@mui/material';

import { useAppSelector } from '@/hooks';

type TargetObjectFieldProps = {
  value: string,
  label: string,
  onChange: (newVal: any) => void,
}

const TargetObjectField = ({ value, label, onChange }: TargetObjectFieldProps) => {
  const savedTargetObjects = useAppSelector(state => state.dialogue.savedTargetObjects);
  return (
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
      options={savedTargetObjects}
      disableClearable
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label={label} margin="normal" />
      )}
    />
  );
};

export default TargetObjectField;
