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
