import { createGlobalStyle } from 'styled-components';
import { bg0, bg4, bg5 } from './colors';

export default createGlobalStyle`
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-button {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-thumb {
  background: ${bg4};
  border: 0px none;
  border-radius: 17px;
}
*::-webkit-scrollbar-thumb:hover {
  background: ${bg5};
}
*::-webkit-scrollbar-thumb:active {
  background: ${bg5};
}

*::-webkit-scrollbar-track {
  background: transparent;
  border: 69px none #ffffff;
  border-radius: 50px;
}
*::-webkit-scrollbar-track:hover {
  background: ${bg0};
}
*::-webkit-scrollbar-track:active {
  background: ${bg0};
}
*::-webkit-scrollbar-corner {
  background: transparent;
}
`;
