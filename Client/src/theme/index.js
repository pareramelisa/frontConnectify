import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: '#3B7BA4' },
    secondary: { main: '#56C7BA' },
    deepBlack: { main: '#24272B' },
    lightGrey: { main: '#545454' },
    error: { main: '#FF495C'}
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    subtitle1: {
      fontSize: 12, 
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
    },
  },
});

