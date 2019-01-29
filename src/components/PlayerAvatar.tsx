import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
type StatusCirclrProps = {
  mini: boolean;
  active: boolean;
};
const ConnectionStatusCircle = styled.div`
  border-radius: 50%;
  margin-left: ${({ mini }: StatusCirclrProps) => (mini ? ' -23%' : '-10px')};
  margin-top: ${({ mini }: StatusCirclrProps) => (mini ? '75%' : '24px')};
  height: 15px;
  width: 15px;
  border-color: transparent;
  border-style: double;
  z-index: 5;
  background: ${({ active }: StatusCirclrProps) => (active ? 'green' : 'red')};
`;

type Props = {
  src: string;
  alt: string;
  active: boolean;
  mini: boolean;
};
const PlayerAvatar: React.FunctionComponent<Props> = ({
  src,
  active,
  alt,
  mini
}) => {
  const size = mini ? { width: 125, height: 125 } : { width: 42, height: 42 };
  return (
    <Wrapper>
      <Avatar style={size} src={src} alt={alt} />
      <ConnectionStatusCircle mini={mini} active={active} />
    </Wrapper>
  );
};

export default PlayerAvatar;
