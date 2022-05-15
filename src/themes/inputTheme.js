import { createTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const inputTheme = (parentTheme) =>
  createTheme({
    ...parentTheme,
    palette: {
      ...parentTheme.palette,
      primary: {
        main: blue[600],
      },
    },
  });

export default inputTheme;
