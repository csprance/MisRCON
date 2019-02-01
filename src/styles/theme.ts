import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { bg0, bg4, darkDarkBlack, text } from './colors';

export const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway',
    useNextVariants: true
  },
  overrides: {
    MuiTooltip: {
      tooltip: { backgroundColor: darkDarkBlack, fontSize: 15 }
    },
    MuiListItemText: {
      primary: { color: text.secondary }
    }
  },
  palette: {
    text: { primary: '#ffffff', secondary: '#7e8186' },
    type: 'dark',
    background: { default: bg0, paper: bg0 },
    primary: { main: '#7e8186' }, // Purple and green play nicely together.
    secondary: { main: bg4 } // This is just green.A700 as hex.
  }
});
