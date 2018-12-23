import { purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { darkDarkBlack, darkishBlue } from './colors';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    background: { default: darkDarkBlack, paper: '#202225' },
    primary: { main: darkishBlue }, // Purple and green play nicely together.
    secondary: { main: purple[500] } // This is just green.A700 as hex.
  }
});
