import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: { main: green[500] }, // Purple and green play nicely together.
    secondary: { main: purple[500] } // This is just green.A700 as hex.
  }
});
