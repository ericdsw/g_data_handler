import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const inputTheme = (parentTheme) =>
  createTheme(adaptV4Theme({
    ...parentTheme,
    palette: {
      ...parentTheme.palette,
      primary: {
        main: blue[600],
      },
    },
  }));

export default inputTheme;
