import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import * as React from 'react';
import styled from 'styled-components';

const FloatingBackButon = styled(IconButton as any)`
  position: absolute !important;
  top: 35px;
  right: 20px;
`;

interface Props {
  onClick: () => void;
}
const FloatingCloseButton: React.FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Tooltip title={'Close'}>
      <FloatingBackButon onClick={onClick}>
        <CloseIcon />
      </FloatingBackButon>
    </Tooltip>
  );
};

export default FloatingCloseButton;
