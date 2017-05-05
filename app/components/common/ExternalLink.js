/**
 * Name: ExternalLink
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Handles sending a user to an external browser link
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shell } from 'electron';
import { log } from '../../utils/loggerUtils';

const ExternalLink = (props) => {
  const handleClick = () => {
    shell.openExternal(props.to);
    log('info', `Navigating to External Link: ${props.to}`);
  };


  return (
    <Pointer onClick={handleClick} >
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
