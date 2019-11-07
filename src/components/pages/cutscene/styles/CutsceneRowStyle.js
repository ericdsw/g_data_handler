export const styles = theme => ({
    cutsceneRow: {
        margin: `${theme.spacing.unit}px auto`,
        padding: 8,
        [theme.breakpoints.up('sm')] : {
            padding: 16,
        },
        paddingBottom: 24,
    }
});