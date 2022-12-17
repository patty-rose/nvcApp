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
  }
});

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
  shadows: Array(25).fill('none')
};

export default theme;