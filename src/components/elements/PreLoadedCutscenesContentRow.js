import React from 'react';

import {
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const PreLoadedCutscenesContentRow = ({
  fileName
}) => {
  <Grid container>
    <Grid item xs>
      <Typography variant="body1">{fileName}</Typography>
      asdf
    </Grid>
    <Grid item>
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton>
        <Delete />
      </IconButton>
    </Grid>
  </Grid>
};

export default PreLoadedCutscenesContentRow;
