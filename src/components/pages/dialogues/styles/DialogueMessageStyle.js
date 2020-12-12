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
    display: 'inline-block',
    position: 'relative',
    width: 310 * 2,
    height: 55 * 2,
    fontSize: 8 * 2,
    backgroundColor: "#C9C3B8",
    color: "black",
    borderRadius: 8,
    fontFamily: 'DogicaPixel',
    border: '2px solid #272523'
  },
  contentText: {
    marginLeft: 8 * 2,
    marginTop: 6 * 2,
    width: 242 * 2,
    height: 47 * 2,
    lineHeight: '30px',
  },
  contentTextNoImage: {
    width: 292 * 2,
  },
  contentSpeakerName: {
    width: 85 * 2,
    height: 16 * 2,
    left: 18 * 2,
    position: 'absolute',
    top: 0,
    marginTop: - (16 * 2) / 2,
    color: '#fff',
    borderRadius: 6 * 2,
    backgroundColor: '#4C4945',
    border: '1px solid #282624',
    lineHeight: `${16 * 2}px`,
    paddingLeft: 2 * 2
  },
  contentImage: {
    width: 55 * 2,
    height: 64 * 2,
    position: 'absolute',
    bottom: 0,
    right: 5 * 2
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
