// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5dd95d', // Green color
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;