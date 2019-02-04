import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 8px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ActiveIndicatorWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 10px;
  margin-left: -5px;
`;
const ActiveIndicator = styled.div`
  background: #fff;
  transition-duration: 0.3s;
  width: 10px;
  border-radius: 2pt;
  margin-left: -33px;
  margin-top: ${({ active }: { active: boolean }) => (active ? '15px' : '29px')};
  height: ${({ active }: { active: boolean }) => (active ? '35px' : '8px')};
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
      <ActiveIndicatorWrapper>
        <ActiveIndicator active={active} />
      </ActiveIndicatorWrapper>
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
