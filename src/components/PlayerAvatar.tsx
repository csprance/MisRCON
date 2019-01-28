import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
const ConnectionStatusCircle = styled.div`
  border-radius: 50%;
  margin-left: -10px;
  margin-top: 24px;
  height: 15px;
  border-width: 5px;
  border-color: transparent;
  border-style: double;
  width: 15px;
  z-index: 5;
  background: ${({ active }: { active: boolean }) =>
    active ? 'green' : 'red'};
`;

type Props = {
  src: string;
  alt: string;
  active: boolean;
};
const PlayerAvatar: React.FunctionComponent<Props> = ({ src, active, alt }) => {
  return (
    <Wrapper>
      <Avatar src={src} alt={alt} />
      <ConnectionStatusCircle active={active} />
    </Wrapper>
  );
};

export default PlayerAvatar;
