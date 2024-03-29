import { red, blue } from '@mui/material/colors';

export const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  deleteButton: {
    color: red[400],
  },
  defaultButton: {
    color: blue[400],
  },
  emptyText: {
    padding: 32,
    width: '100%',
  },
});
