import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { toggleAddTaskDialog } from '../../redux/app/actions';
import { playerSidebarOpenSelector } from '../../redux/app/selectors';
import { RootState } from '../../redux/redux-types';
import { TasksState } from '../../redux/tasks';
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

type Props = {
  sideBarShowing: boolean;
  tasks: TasksState;
  showAddTaskDialog: () => void;
};
type State = {
  filterValue: string;
};
class TasksGrid extends React.Component<Props, State> {
  public api!: AgGrid.GridApi;
  public columnApi!: AgGrid.ColumnApi;
  state: State = {
    filterValue: ''
  };

  componentDidUpdate(nextProps: Props) {
    if (nextProps.sideBarShowing !== this.props.sideBarShowing) {
      this.api.sizeColumnsToFit();
    }
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.api.sizeColumnsToFit();
      }, 250)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      debounce(() => {
        this.api.sizeColumnsToFit();
      }, 250)
    );
  }

  onGridReady = (params: any) => {
    // in onGridReady, store the api for later use
    this.api = params.api;
    this.columnApi = params.columnApi;
    (window as any).tasksGridApi = this.api;
    this.api.sizeColumnsToFit();
  };

  setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterValue: e.target.value
    });
  };

  handleAddTaskClicked = () => {
    this.props.showAddTaskDialog();
  };

  handleRefreshTasksClicked = () => {
    console.log('Refresh Task');
  };

  render() {
    const { tasks } = this.props;
    return (
      <Wrapper>
        <FilterGridSection
          refreshTooltipTitle={'Refresh Tasks'}
          onClickRefresh={this.handleRefreshTasksClicked}
          addTooltipTitle={'Add Task'}
          onClickAdd={this.handleAddTaskClicked}
          filterValue={this.state.filterValue}
          setFilterValue={this.setFilterValue}
        />
        <MyGrid
          onGridReady={this.onGridReady}
          columnDefs={tasksColumnDefs}
          rowData={tasks}
        />
      </Wrapper>
    );
  }
}

export default connect(
  (state: RootState) => ({
    sideBarShowing: playerSidebarOpenSelector(state),
    tasks: allTasksOnActiveServer(state)
  }),
  dispatch => ({
    showAddTaskDialog: () => dispatch(toggleAddTaskDialog())
  })
)(TasksGrid);
