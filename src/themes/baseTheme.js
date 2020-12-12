import { createMuiTheme } from "@material-ui/core/styles";

const baseTheme = (mode) =>
  createMuiTheme({
    palette: {
      type: mode,
      background: {
        default: mode === "dark" ? "#20171F" : "#fff",
        paper: mode === "dark" ? "#2b202a" : "#fefefe",
      },
      primary: {
        main: "#d50744",
        light: "#ff546f",
        dark: "#9c001e",
        contrastText: "#fff"
      },
      secondary: {
        main: "#bf9148",
        light: "#f4c176",
        dark: "#8c641b",
        contrastText: "#000"
      }
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
            borderColor: "#bf9148",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              borderColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.23)"
                  : "rgba(0,0,0,0.23)",
            },
          },
          "&$focused $notchedOutline": {
            borderColor: "#d50744",
            borderWidth: 1,
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: "#d50744",
          },
        },
      },
    },
  });

export default baseTheme;
