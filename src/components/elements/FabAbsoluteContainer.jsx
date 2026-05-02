import { Box, Fab, Grid } from '@mui/material';

const FabAbsoluteContainer = ({
  buttonMetadata,
  bottomSpacing = 32,
  rightSpacing = 32,
}) => {
  return (
    <Box
      sx={{ position: 'fixed', bottom: bottomSpacing, right: rightSpacing }}
    >
      <Grid container spacing={2} direction="column">
        {buttonMetadata.map((data) => (
          <Grid
            key={data.title}
            id={data.title}
            sx={{
              maxHeight: data.hidden ? 0 : 70,
              transition: 'max-height 0.4s ease',
            }}
          >
            <Fab
              variant="extended"
              color={data.color || 'primary'}
              onClick={data.onClick}
              sx={{
                transform: data.hidden ? 'scale(0.0)' : 'scale(1.0)',
                transition: 'transform 0.2s ease',
                width: 200,
                ...(data.style || {}),
              }}
            >
              {data.icon}
              &nbsp; {data.title}
            </Fab>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FabAbsoluteContainer;
