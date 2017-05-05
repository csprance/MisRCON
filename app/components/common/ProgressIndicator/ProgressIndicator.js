/**
 * Name: ProgressIndicator
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description:
 */
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';

import { orange } from '../../../styles/colors';

const ProgressIndicator = (props) => (
  <Container loading={props.loading} >
    <CircularProgress color={orange} size={200} />
  </Container>
);

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: ${props => (props.loading ? 'flex' : 'none')};
  align-items:center;
  justify-content: center;
`;

export default ProgressIndicator;
