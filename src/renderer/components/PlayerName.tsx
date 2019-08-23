import * as React from 'react';

interface Props {
  color: string;
  active: boolean;
}
const PlayerName: React.FunctionComponent<Props> = ({
  children,
  color,
  active
}) => {
  return (
    <span style={{ color, filter: !active ? 'brightness(70%)' : '' }}>
      {children}
    </span>
  );
};

export default PlayerName;
