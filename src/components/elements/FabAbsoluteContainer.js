import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  fab: {
    transition: 'transform 0.2s ease',
    width: 200
  },
  fabContainer: {
    transition: 'max-height 0.4s ease'
  }
});

const FabAbsoluteContainer = ({
  buttonMetadata,
  bottomSpacing = 32,
  rightSpacing = 32
}) => {

  const classes = useStyles();

  return (
    <div
      style={{ position: 'fixed', bottom: bottomSpacing, right: rightSpacing }}
    >
      <Grid container spacing={2} direction="column">
        {buttonMetadata.map((data) => (
          <Grid
            item
            key={data.title}
            id={data.title}
            className={classes.fabContainer}
            style={{ maxHeight : data.hidden ? 0 : 70}}
          >
            <Fab
              variant="extended"
              color={data.color || 'primary'}
              onClick={data.onClick}
              className={classes.fab}
              style={{
                transform : data.hidden ? 'scale(0.0)' : 'scale(1.0)',
                ...(data.style || {})
              }}
            >
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
