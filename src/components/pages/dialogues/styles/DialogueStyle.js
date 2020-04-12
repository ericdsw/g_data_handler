import { red, blue } from "@material-ui/core/colors";

export const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("xs")]: {
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
  mergeFab: {
    position: "fixed",
    right: 16,
    bottom: 16 + 60,
    margin: theme.spacing(1),
    transition: "transform 0.2s ease",
    width: 200,
  },
  deleteFab: {
    position: "fixed",
    right: 16,
    bottom: 16,
    margin: theme.spacing(1),
    transition: "transform 0.2s ease",
    backgroundColor: red[500],
    color: theme.palette.getContrastText(red[500]),
    width: 200,
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  selectAllFab: {
    position: "fixed",
    right: 16,
    bottom: 16 + 120,
    margin: theme.spacing(1),
    transition: "transform 0.2s ease",
    width: 200,
  },
});
