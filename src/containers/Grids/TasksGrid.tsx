import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { noop } from '../../lib/utils';
import { toggleAddTaskDialog } from '../../redux/app/actions';
import { allTasksOnActiveServer } from '../../redux/tasks/selectors';
import { tasksColumnDefs } from '../../redux/tasks/state';
import { bg3 } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  background: ${bg3};
`;

interface Props {}
const TasksGrid: React.FunctionComponent<Props> = () => {
  // Redux
  const dispatch = useDispatch();
  const tasks = useSelector(allTasksOnActiveServer);
  const showAddTaskDialog = () => dispatch(toggleAddTaskDialog());

  // Component
  const [filterValue, setFilterValue] = React.useState('');
  const api = React.useRef<AgGrid.GridApi>();
  const sizeColumns = () =>
    api.current ? api.current.sizeColumnsToFit() : noop();
  const setVal = (e: any) => {
    setFilterValue(e.target.value);
    api.current!.setQuickFilter(e.target.value);
  };
  const onGridReady = (params: any) => {
    // in onGridReady, store the api for later use
    api.current = params.api;
    sizeColumns();
  };

  // mount
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      debounce(() => {
        sizeColumns();
      }, 250)
    );
    // unmount
    return () => {
      window.removeEventListener(
        'resize',
        debounce(() => {
          sizeColumns();
        }, 250)
      );
    };
  }, []);

  return (
    <Wrapper>
      <FilterGridSection
        refreshTooltipTitle={''}
        onClickRefresh={noop}
        addTooltipTitle={'Add Task'}
        onClickAdd={showAddTaskDialog}
        filterValue={filterValue}
        setFilterValue={setVal}
      />
      <MyGrid
        onGridReady={onGridReady}
        columnDefs={tasksColumnDefs}
        rowData={tasks}
      />
    </Wrapper>
  );
};

export default TasksGrid;
