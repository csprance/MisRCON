/**
 * Name: Spacer
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Spacer Component
 */
import React from 'react';
import styled from 'styled-components';

const Spacer = () => {
  return (
    <SpacerDiv />
  );
};

const SpacerDiv = styled.div`
  flex-grow: 1;
`;

export default Spacer;
