/**
 * Name: ExternalLink
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Handles sending a user to an external browser link
 */
import {log} from '../../utils/loggerUtils';
import React, {
  PropTypes,
} from 'react';
import styled from 'styled-components';

const ExternalLink = (props) => {
  const handleClick = () => {
    require('electron').shell.openExternal(props.to);
    log('info', `Navigating to External Link: ${props.to}`);
  };

  return (
    <Pointer onClick={handleClick}>
      {props.children}
    </Pointer>
  );
};

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired
};

const Pointer = styled.div`
  cursor: pointer;
`;
export default ExternalLink;
