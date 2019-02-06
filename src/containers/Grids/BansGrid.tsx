import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { playerSidebarOpenSelector } from '../../redux/app/selectors';
import { bannedPlayersOnActiveServer } from '../../redux/players/selectors';
import { playersColumnDefs } from '../../redux/players/state';
import { Player } from '../../redux/players/types';
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
  sideBarShowing: boolean;
  players: Player[];
};
type State = {
  filterValue: string;
};
class BansGrid extends React.Component<Props, State> {
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
    (window as any).bansGridApi = this.api;
    this.api.sizeColumnsToFit();
  };

  setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterValue: e.target.value
    });
  };

  handleAddClicked = () => {
    console.log('Add');
  };

  handleRefreshClicked = () => {
    console.log('Refresh Task');
  };

  render() {
    return (
      <Wrapper>
        <FilterGridSection
          refreshTooltipTitle={'Refresh Bans'}
          onClickRefresh={this.handleRefreshClicked}
          onClickAdd={this.handleAddClicked}
          addTooltipTitle={'Add Ban'}
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
  sideBarShowing: playerSidebarOpenSelector(state),
  players: bannedPlayersOnActiveServer(state)
}))(BansGrid);
