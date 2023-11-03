import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: '#3B7BA4' },
    secondary: { main: '#E69705' },
    deepBlack: { main: '#545454' },
    lightGrey: { main: '#D9D9D9' },
    error: { main: '#FF495C'}
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    subtitle1: {
      fontSize: 14, 
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
    },
  },
});

