import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const inputTheme = parentTheme => createMuiTheme({
    ...parentTheme,
    palette: {
        ...parentTheme.palette,
        primary: {
            main: blue[600]
        }
    }
});

export default inputTheme;