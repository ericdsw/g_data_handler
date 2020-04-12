import { red, blue } from "@material-ui/core/colors";

export const styles = (theme) => ({
  messageContainer: {
    width: "100%",
    backgroundColor: "#222",
    position: "relative",
    borderBottom: "1px solid #666",
  },
  details: {
    display: "flex",
  },
  avatar: {
    width: 70,
    height: 70,
  },
  title: {
    color: "white",
    marginRight: 30,
  },
  subTitle: {
    color: "#ccc",
  },
  targetObject: {
    color: blue[200],
  },
  content: {
    flex: 4,
    color: "white",
  },
  contentImage: {
    marginRight: 10,
  },
  button: {
    color: "white",
  },
  chipContainer: {
    borderTop: "1px solid #c5c5c5",
    marginTop: 12,
    paddingTop: 12,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  interruptDiv: {
    background: red[600],
    color: "white",
    padding: 6,
  },
});
