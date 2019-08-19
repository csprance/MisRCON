import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

const Wrapper = styled.div`
  cursor: pointer;
  transition-duration: 0.2s;
  & img {
    transition-duration: 0.2s;
  }
  &:hover {
    transition-duration: 0.2s;
    & img {
      transition-duration: 0.2s;
      -webkit-filter: grayscale(100%);
      border: solid 4px #404040;
    }
  }
`;

interface Props {
  avatar: string;
  setAvatar: (avatar: string) => void;
}
const AvatarPicker: React.FunctionComponent<Props> = ({
  avatar,
  setAvatar
}) => {
  const handleClick = () => {
    const rootPath = remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    })[0];
    if (rootPath) {
      setAvatar(rootPath);
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      <Tooltip title={'Change Avatar'} placement={'right'}>
        <img
          style={{ borderRadius: '50%', width: 200, height: 200 }}
          src={avatar}
          alt=""
        />
      </Tooltip>
    </Wrapper>
  );
};

export default AvatarPicker;
