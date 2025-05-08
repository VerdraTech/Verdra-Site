import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import MarketingPage from './marketing-page/MarketingPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkGreen = '#006400'; 

const theme = createTheme({
  palette: {
    primary: {
      main: darkGreen,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MarketingPage />
    </ThemeProvider>
  );
}

export default App;