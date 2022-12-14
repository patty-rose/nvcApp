import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    primary: {
      light: 'FFFFFF',
      main: '#d2f5fa',
      dark: '#a0ebf3',
      darkest: '#050a30',
    },
    secondary:{
      light: '#e8a5ba',
      main: '#f32768',
      dark: '#c22154',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});

const fontHeader = {
  color: customTheme.palette.text.primary,
  fontWeight: customTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...customTheme,
  palette: {
    ...customTheme.palette,
    background: {
      ...customTheme.palette.background,
      default: customTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...customTheme.typography,
    fontHeader,
    h1: {
      ...customTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...customTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...customTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...customTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...customTheme.typography.h5,
      fontSize: 20,
      fontWeight: customTheme.typography.fontWeightLight,
    },
    h6: {
      ...customTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...customTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...customTheme.typography.body2,
      fontWeight: customTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...customTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;