export const styles = theme => ({
    conversationContainer: {
        width: '100%',
        borderBottom: '1px solid #666',
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
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsContainer: {
        width: '100%',
        minHeight: 50
    },
    buttonContainer: {
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});