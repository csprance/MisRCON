import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 75px;
  min-height: 75px;
  max-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spacer = styled.div`
  width: 40px;
`;

interface Props {
  filterValue: string;
  setFilterValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FilterGridSection: React.FunctionComponent<Props> = ({
  filterValue,
  setFilterValue
}) => {
  return (
    <Wrapper>
      <Spacer />
      <Tooltip title={'Refresh Tasks'}>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <Spacer />
      <TextField
        onChange={setFilterValue}
        value={filterValue}
        label="Filter"
        fullWidth
      />
      <Spacer />
      <Tooltip title={'Add new  Task'}>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Spacer />
    </Wrapper>
  );
};

export default FilterGridSection;
