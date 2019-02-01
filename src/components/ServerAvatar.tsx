import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 8px;
  cursor: pointer;
`;
type Props = {
  active: boolean;
  avatarURL: string;
  id: number;
  name: string;
  selectServer: (id: number) => void;
};
const ServerAvatar: React.FunctionComponent<Props> = ({
  avatarURL,
  id,
  name,
  selectServer,
  active
}) => {
  const [borderRadius, setBorderRadius] = React.useState('50%');

  const handleServerClick = () => {
    selectServer(id);
  };

  const handleMouseLeave = () => {
    setBorderRadius('50%');
  };

  const handleMouseEnter = () => {
    setBorderRadius('15px');
  };

  return (
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleServerClick}
    >
      <Tooltip placement={'right'} title={name}>
        <Avatar
          style={{
            width: 50,
            height: 50,
            marginTop: 8,
            borderRadius: active ? '15px' : borderRadius,
            transitionDuration: '0.3s'
          }}
          src={avatarURL}
        />
      </Tooltip>
    </Wrapper>
  );
};

export default ServerAvatar;
