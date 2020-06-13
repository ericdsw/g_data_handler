import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, blueGrey, blue } from "@material-ui/core/colors";

const baseTheme = (mode) =>
  createMuiTheme({
    palette: {
      type: mode,
      primary: mode === "dark" ? indigo : blue,
      secondary: blueGrey,
    },
    overrides: {
      MuiOutlinedInput: {
        root: {
          position: "relative",
          "& $notchedOutline": {
            borderColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.23)"
                : "rgba(0,0,0,0.23)",
          },
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: blue[600],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              borderColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.23)"
                  : "rgba(0,0,0,0.23)",
            },
          },
          "&$focused $notchedOutline": {
            borderColor: blue[600],
            borderWidth: 1,
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: blue[600],
          },
        },
      },
    },
  });

export default baseTheme;
