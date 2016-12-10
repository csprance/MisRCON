/**
 * Name: Spacer
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Spacer Component
 */
import React, {
  PropTypes,
} from 'react';
import styled from 'styled-components';

const Spacer = (props) => {
  return (
    <SpacerDiv>

    </SpacerDiv>
  );
};


Spacer.propTypes = {};
Spacer.defaultProps = {};
const SpacerDiv = styled.div`
  flex-grow: 1;
`;

export default Spacer;

