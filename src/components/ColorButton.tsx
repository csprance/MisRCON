import IconButton from '@material-ui/core/IconButton';
import SquareIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';

interface Props {
  onClick: () => void;
  color: string;
}
const ColorButton: React.FunctionComponent<Props> = ({ color, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <SquareIcon fontSize="large" nativeColor={color} />
    </IconButton>
  );
};

export default ColorButton;
