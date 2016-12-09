import {
  cyan700,
  grey600,
  pinkA100,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#282828',
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: '#ff611c',
    accent2Color: '#65b8ff',
    accent3Color: pinkA100,
    textColor: '#e7e7e7',
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#ffffff',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};
