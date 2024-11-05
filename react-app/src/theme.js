import { createTheme } from '@mui/material/styles';
import '@fontsource/dm-sans'; // Oto domyślnie waga 400

// Tworzenie motywu z niestandardowymi kolorami
const theme = createTheme({
  palette: {
    primary: {
      main: '#031017',
      lighter: '#092E42'
    },
    secondary: {
      main: '#ECDFCC', // Kolor dla secondary
    },
    third: {
      main: '#18B9A1', // Kolor dla secondary
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
});

export default theme;
