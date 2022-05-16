import { red, blue } from "@material-ui/core/colors";

export const styles = (theme) => ({
  messageContainer: {
    width: "100%",
    backgroundColor: theme.palette.messageBackground,
    position: "relative",
    borderBottom: "1px solid #666",
    padding: theme.spacing(2),
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
    color: theme.palette.getContrastText(theme.palette.messageBackground),
  },
  targetObject: {
    color: blue[200],
  },
  /**
   * Dimensions, colors and fonts mimics how the dialogues are being displayed in-game
   */
  content: {
    display: "inline-block",
    position: "relative",
    width: 310 * 2,
    height: 55 * 2,
    fontSize: 12 * 2,
    backgroundColor: "#C9C3B8",
    color: "black",
    borderRadius: 6 * 2,
    fontFamily: "'JF Dot Ayu Gothic 18'",
    border: "2px solid #272523",
  },
  contentText: {
    marginLeft: 8 * 2,
    marginTop: 6 * 2,
    width: 242 * 2,
    height: 47 * 2,
    lineHeight: "30px",
  },
  contentTextNoImage: {
    width: 282 * 2,
  },

  contentSpeakerName: {
    width: 100 * 2,
    height: 20 * 2,
    left: 18 * 2,
    position: "absolute",
    top: 0,
    marginTop: -(30 * 2) / 2,
    color: "#fff",
    borderRadius: 4 * 2,
    backgroundColor: "#4C4945",
    border: "4px solid #282624",
    lineHeight: `${16 * 2}px`,
    paddingLeft: 2 * 2,
  },
  contentImage: {
    width: "auto",
    height: 64 * 2,
    position: "absolute",
    bottom: 0,
    right: 1,
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
