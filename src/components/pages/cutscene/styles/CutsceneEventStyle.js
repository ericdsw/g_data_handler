import { grey } from "@material-ui/core/colors";

export const styles = (theme) => ({
  eventCard: {
    width: 300,
    border: `1px solid ${theme.palette.background.default}`,
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
    backgroundColor: theme.palette.primary.main,
  },
  avatarNonImportant: {
    backgroundColor: theme.palette.mode === "dark" ? grey[300] : grey[500],
    opacity: 0.7,
  },
});
