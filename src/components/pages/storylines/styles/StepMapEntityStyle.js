import { blue, red } from "@mui/material/colors";

export const styles = (theme) => ({
  typeSubheader: {
    color: blue[400],
  },
  blueText: {
    color: blue[400],
  },
  actions: {
    display: "flex",
  },
  descriptionWrapper: {
    display: "flex",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  descriptionElement: {
    padding: 16,
    cursor: "pointer",
    color: "#fff",
    width: "100%",
    fontSize: 14,
  },
  redButton: {
    color: "#fff",
    backgroundColor: red[500],
  },
});
