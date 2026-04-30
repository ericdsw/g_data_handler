import { createTheme } from '@mui/material/styles';

const primaryColor = {
  main: '#b65672',
  light: '#e9ccd5',
  dark: '#9e3c55',
  contrastText: '#fff',
};

const secondaryColor = {
  main: '#ccaa74',
  light: '#f0e6d5',
  dark: '#b99057',
  contrastText: '#000',
};

const baseTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === 'dark' ? '#20171F' : '#fafafa',
        paper: mode === 'dark' ? '#2b202a' : '#fefefe',
      },
      primary: {
        ...primaryColor,
      },
      secondary: {
        ...secondaryColor,
      },
      messageBackground: mode === 'dark' ? '#222' : '#eee',
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'always',
        },
      },
    },
    overrides: {
      MuiTableRow: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          position: 'relative',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              mode === 'dark'
                ? 'rgba(255, 255, 255, 0.23)'
                : 'rgba(0,0,0,0.23)',
          },
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: '#bf9148',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderColor:
                mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.23)'
                  : 'rgba(0,0,0,0.23)',
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d50744',
            borderWidth: 1,
          },
        },
      },
      MuiFormLabel: {
        root: {
          '&.Mui-focused': {
            color: '#d50744',
          },
        },
      },
    },
  });

export default baseTheme;
