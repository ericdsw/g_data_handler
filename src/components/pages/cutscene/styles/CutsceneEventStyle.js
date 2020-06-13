import { blue, grey } from "@material-ui/core/colors";

export const styles = (theme) => ({
  eventCard: {
    width: 300,
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[500],
  },
  avatarNonImportant: {
    backgroundColor: grey[300],
    opacity: 0.7,
  },
});
