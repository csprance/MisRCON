import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import Player from '../../db/entities/Player';
import { debounce } from '../../lib/debounce';
import { allPlayersOnActiveServerSelector } from '../../redux/players/selectors';
import { playersColumnDefs } from '../../redux/players/state';
import { RootState } from '../../redux/redux-types';
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
  players: Player[];
};
type State = {
  filterValue: string;
};
class PlayersGrid extends React.Component<Props, State> {
  public api!: AgGrid.GridApi;
  public columnApi!: AgGrid.ColumnApi;
  state: State = {
    filterValue: ''
  };
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

  setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterValue: e.target.value
    });
  };

  render() {
    return (
      <Wrapper>
        <FilterGridSection
          filterValue={this.state.filterValue}
          setFilterValue={this.setFilterValue}
        />
        <MyGrid
          onGridReady={this.onGridReady}
          columnDefs={playersColumnDefs}
          rowData={this.props.players}
        />
      </Wrapper>
    );
  }
}

export default connect((state: RootState) => ({
  players: allPlayersOnActiveServerSelector(state)
}))(PlayersGrid);
