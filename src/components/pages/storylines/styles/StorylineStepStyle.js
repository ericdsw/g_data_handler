import { blue, green, grey } from '@mui/material/colors';

export const styles = (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  headerSmall: {
    color: '#aaa',
    fontSize: '0.7em',
  },
  descriptionList: {
    color: '#fff',
    lineHeight: '200%',
  },
  blueText: { color: blue[400] },
  greenText: { color: green[400] },
  greyText: { color: grey[400] },
});
