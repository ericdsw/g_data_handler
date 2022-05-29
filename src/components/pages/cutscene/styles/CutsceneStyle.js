import { red, blue } from '@mui/material/colors';

export const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  deleteButton: {
    color: red[500],
  },
  defaultButton: {
    color: blue[500],
  },
  emptyText: {
    padding: 32,
    width: '100%',
  },
});
