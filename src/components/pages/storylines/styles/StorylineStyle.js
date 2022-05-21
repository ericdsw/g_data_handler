import { red } from "@mui/material/colors";

export const styles = (theme) => ({
  defaultButton: {
    color: theme.palette.primary.main,
  },
  deleteButton: {
    color: red[500],
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});
