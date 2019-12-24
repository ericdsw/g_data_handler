import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, teal, blue } from '@material-ui/core/colors';

const baseTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: indigo,
        secondary: teal
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: blue[600],
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: blue[600],
                    borderWidth: 1,
                },
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: blue[600]
                }
            }
        }
    }
});

export default baseTheme;
