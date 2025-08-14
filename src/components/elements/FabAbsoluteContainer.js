import React from 'react';

import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

const FabAbsoluteContainer = ({
  buttonMetadata,
  bottomSpacing = 32,
  rightSpacing = 32,
}) => {
  return (
    <div
      style={{ position: 'fixed', bottom: bottomSpacing, right: rightSpacing }}
    >
      <Grid container spacing={2}>
        {buttonMetadata.map((data) => (
          <Grid key={data.title} item id={data.title}>
            <Fab variant="extended" color="primary" onClick={data.onClick}>
              {data.icon}
              &nbsp; {data.title}
            </Fab>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FabAbsoluteContainer;
