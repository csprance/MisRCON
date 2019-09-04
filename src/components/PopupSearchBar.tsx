import { TextField } from '@material-ui/core';
import {remote} from 'electron';
import searchInPage from 'electron-in-page-search';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';

import { bg0 } from '../styles/colors';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 250px;
  height: 45px;
  background: ${bg0};
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

interface Props {}
const PopupSearchBar: React.FunctionComponent<Props> = () => {




  return searchOpen ? (
    <Wrapper>
      <TextField
        inputRef={inputRef}
        placeholder={'Find On Page'}
        fullWidth
        name={'search-term'}
      />
    </Wrapper>
  ) : (
    <></>
  );
};

export default PopupSearchBar;
