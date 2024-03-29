export const styles = (theme) => ({
  conversationContainer: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    flexBasis: '33.3%',
    flexShrink: 0,
  },
  subHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
  },
  messageContainer: {
    flexGrow: 1,
  },
  messageElement: {
    width: '100%',
  },
  dragHandleElement: {
    width: 50,
    height: 40,
    color: theme.palette.getContrastText(theme.palette.messageBackground),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    width: '100%',
    minHeight: 50,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
