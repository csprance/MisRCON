import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import styled from 'styled-components';
import { bg3 } from '../styles/colors';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 18px;
  border: 1.5px dashed ${bg3};
  border-radius: 50%;
`;

type Props = {
  showAddServerDialog: ()=> void;
};
const AddServerButton: React.FunctionComponent<Props> = ({showAddServerDialog}) => {
  return (
    <Wrapper>
      <Tooltip title={'Add Server'} placement={'right'}>
        <IconButton onClick={()=> showAddServerDialog()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default AddServerButton;
