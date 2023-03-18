import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Rubik"',
  },
  palette: {
    primary: {
      main: '#e6a234',
    },
    secondary: {
      main: '#58cbcd',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
