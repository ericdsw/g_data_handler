export const styles = (theme) => ({
  mockContainer: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  cutsceneRow: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  dragHandleElement: {
    width: 40,
    height: 40,
    color: theme.palette.getContrastText(theme.palette.messageBackground),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
