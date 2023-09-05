import { blue, red } from '@mui/material/colors';

export const styles = (theme) => ({
  typeSubheader: {
    color: blue[400],
  },
  blueText: {
    color: blue[400],
  },
  actions: {
    display: 'flex',
  },
  descriptionWrapper: {
    display: 'flex',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'transparent',
  },
  descriptionElement: {
    padding: 16,
    cursor: 'pointer',
    width: '100%',
    fontSize: 14,
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  },
  redButton: {
    color: '#fff',
    backgroundColor: red[400],
  },
  noParametersText: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    paddingTop: 16,
    paddingBottom: 0,
  },
});
