import {
  cyan700,
  grey600,
  pinkA100,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import {black, darkGrey, orange, white, offWhite} from './colors';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: black,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: orange,
    accent2Color: '#65b8ff',
    accent3Color: pinkA100,
    textColor: white,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#ffffff',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};
