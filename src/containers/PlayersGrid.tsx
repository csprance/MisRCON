import * as AgGrid from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { gridOptions } from '../constants/grid-constants';
import Player from '../db/entities/Player';
import { debounce } from '../lib/debounce';
import { allPlayersOnActiveServerSelector } from '../redux/players/selectors';
import { playersColumnDefs } from '../redux/players/state';
import { RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
`;

type Props = {
  players: Player[];
};
type State = {};
class PlayersGrid extends React.Component<Props, State> {
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
            columnDefs={playersColumnDefs}
            rowData={this.props.players}
          />
        </div>
      </Wrapper>
    );
  }
}

export default connect((state: RootState) => ({
  players: allPlayersOnActiveServerSelector(state)
}))(PlayersGrid);
