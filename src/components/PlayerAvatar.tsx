import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-right: 10px;
`;

const ConnectionStatusCircle = styled.div<{
  mini: boolean;
  active: boolean;
}>`
  border-radius: 50%;
  margin-left: ${({ mini }) => (!mini ? ' -23%' : '-10px')};
  margin-top: ${({ mini }) => (!mini ? '75%' : '24px')};
  height: 15px;
  width: 15px;
  border-color: transparent;
  border-style: double;
  z-index: 5;
  background: ${({ active }) => (active ? 'green' : 'red')};
`;

interface Props {
  src: string;
  alt: string;
  active: boolean;
  mini?: boolean;
}
const PlayerAvatar: React.FunctionComponent<Props> = ({
  src,
  active,
  alt,
  mini = true
}) => {
  const ds = {
    filter: !active ? 'grayscale(100%) brightness(30%)' : ''
  };
  const style = mini
    ? { ...ds, width: 42, height: 42 }
    : { width: 125, height: 125 };
  return (
    <Wrapper>
      <Avatar style={style} src={src} alt={alt} />
      <ConnectionStatusCircle mini={mini} active={active} />
    </Wrapper>
  );
};

export default PlayerAvatar;
