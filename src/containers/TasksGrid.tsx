import * as AgGrid from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { gridOptions } from '../constants/grid-constants';
import { debounce } from '../lib/debounce';
import { RootState } from '../redux/redux-types';
import { TasksState } from '../redux/tasks';
import { allTasksOnActiveServer } from '../redux/tasks/selectors';
import { tasksColumnDefs } from '../redux/tasks/state';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
`;

type Props = {
  tasks: TasksState;
};
type State = {};
class TasksGrid extends React.Component<Props, State> {
  public api!: AgGrid.GridApi;
  public columnApi!: AgGrid.ColumnApi;

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
    this.api.sizeColumnsToFit();
  };

  render() {
    return (
      <Wrapper className="ag-theme-misrcon">
        <div style={{ overflow: 'hidden', flexGrow: 1 }}>
          <AgGridReact
            {...gridOptions}
            onGridReady={this.onGridReady}
            columnDefs={tasksColumnDefs}
            rowData={this.props.tasks}
          />
        </div>
      </Wrapper>
    );
  }
}

export default connect((state: RootState) => ({
  tasks: allTasksOnActiveServer(state)
}))(TasksGrid);
