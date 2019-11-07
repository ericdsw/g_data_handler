import { red, blue } from '@material-ui/core/colors';

export const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    deleteButton: {
        color: red[500],
    },
    defaultButton: {
        color: blue[500]
    },
    mergeFab: {
        position: 'fixed',
        right: 16,
        bottom: 16,
        margin: theme.spacing.unit,
        transition: 'transform 0.2s ease'
    }
});