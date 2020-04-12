import { blue, red } from "@material-ui/core/colors";

export const styles = (theme) => ({
  defaultButton: {
    color: blue[500],
  },
  deleteButton: {
    color: red[500],
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});
