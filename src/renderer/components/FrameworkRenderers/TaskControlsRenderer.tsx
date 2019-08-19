import Tooltip from '@material-ui/core/Tooltip';
import PausedIcon from '@material-ui/icons/PauseRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Dispatch } from '../../redux/redux-types';
import { toggleTaskThunk } from '../../redux/tasks/actions';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

type ReduxProps = {
  dispatch: Dispatch;
};
const TaskControlsRenderer: React.FunctionComponent<
  ICellRendererParams & ReduxProps
> = ({ value, dispatch, data }) => {
  const handleClick = () => {
    dispatch(toggleTaskThunk(data.id));
  };
  return (
    <Wrapper onClick={handleClick}>
      <Tooltip placement={'left'} title={value ? 'Pause Task' : 'Start Task'}>
        {!value ? <PlayIcon /> : <PausedIcon />}
      </Tooltip>
    </Wrapper>
  );
};
export default connect()(TaskControlsRenderer);
