import React from "react";
import  { ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";

import baseTheme from "./baseTheme";

const ThemeWrapper = ({ children }) => {
  const { darkMode } = useSelector(state => state.app);
  return (
    <ThemeProvider theme={baseTheme(darkMode ? "dark" : "light")}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;
