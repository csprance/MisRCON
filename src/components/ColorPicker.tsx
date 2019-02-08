import * as React from 'react';
import styled from 'styled-components';
import ColorButton from './ColorButton';

const Wrapper = styled.div``;

interface Props {
  onClick: (color: string) => void;
}
const ColorPicker: React.FunctionComponent<Props> = ({onClick}) => {
  const colors = [
    '#ffb53a',
    '#6fff50',
    '#807cff',
    '#ff3ccf',
    '#47ffda',
    '#ff171d',
    '#f1ff20',
    '#2f4b6e',
    '#6e2c49',
    '#196e53',
    '#566e0e',
    '#636e62',
    '#d0d0da'
  ];
  const handleClick = (color: string) => {
    onClick(color);
  };

  return (
    <Wrapper>
      {colors.map(color => (
        <ColorButton
          key={color}
          onClick={() => handleClick(color)}
          color={color}
        />
      ))}
    </Wrapper>
  );
};

export default ColorPicker;
