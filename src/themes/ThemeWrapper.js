import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";

import baseTheme from "./baseTheme";

const ThemeWrapper = ({ children }) => {
  const { darkMode } = useSelector(state => state.app);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={baseTheme(darkMode ? "dark" : "light")}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ThemeWrapper;
