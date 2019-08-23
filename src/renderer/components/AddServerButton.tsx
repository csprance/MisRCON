import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import styled from 'styled-components';
import { bg3, green } from '../styles/colors';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 18px;
  border: 1.5px dashed ${bg3};
  border-radius: 50%;
  transition-duration: 0.3s;
  &:hover {
    transition-duration: 0.3s;
    background: ${green};
  }
`;

type Props = {
  showAddServerDialog: () => void;
};
const AddServerButton: React.FunctionComponent<Props> = ({
  showAddServerDialog
}) => {
  const [hover, setHover] = React.useState(true);
  return (
    <Wrapper
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
    >
      <Tooltip title={'Add Server'} placement={'right'}>
        <IconButton href={'#'} onClick={() => showAddServerDialog()}>
          <AddIcon
            style={
              hover
                ? {  color: green }
                : { color: 'inherit' }
            }
          />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default AddServerButton;
