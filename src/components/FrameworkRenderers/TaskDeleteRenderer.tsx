import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';
import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';
import { removeTaskThunk } from '../../redux/tasks/actions';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const TaskDeleteRenderer: React.FunctionComponent<ICellRendererParams> = ({
  data
}) => {
  const dispatch = (window as any).store.dispatch;
  const handleClick = () => {
    dispatch(removeTaskThunk(data.id));
  };
  return (
    <Wrapper onClick={handleClick}>
      <Tooltip placement={'left'} title={'Delete Task'}>
        {<TrashIcon />}
      </Tooltip>
    </Wrapper>
  );
};

export default TaskDeleteRenderer;
