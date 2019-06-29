import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { toggleAddWhitelistDialog } from '../../redux/app/actions';
import { playerSidebarOpenSelector } from '../../redux/app/selectors';
import { whitelistedPlayersOnActiveServer } from '../../redux/players/selectors';
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
  whitelistedPlayers: Player[];
  toggleAddWhitelistDialog: () => void;
};
type State = {
  filterValue: string;
};
class WhitelistGrid extends React.Component<Props, State> {
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
    (window as any).whitelistGridApi = this.api;
    this.api.sizeColumnsToFit();
  };

  setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterValue: e.target.value
    });
    this.api.setQuickFilter(e.target.value);
  };

  handleAddClicked = () => {
    this.props.toggleAddWhitelistDialog();
  };

  handleRefreshClicked = () => {
    console.log('Refresh Task');
  };

  render() {
    return (
      <Wrapper>
        <FilterGridSection
          refreshTooltipTitle={'Refresh Whitelist'}
          onClickRefresh={this.handleRefreshClicked}
          onClickAdd={this.handleAddClicked}
          addTooltipTitle={'Add To Whitelist'}
          filterValue={this.state.filterValue}
          setFilterValue={this.setFilterValue}
        />

        <MyGrid
          onGridReady={this.onGridReady}
          columnDefs={playersColumnDefs}
          rowData={this.props.whitelistedPlayers}
        />
      </Wrapper>
    );
  }
}

export default connect(
  (state: RootState) => ({
    sideBarShowing: playerSidebarOpenSelector(state),
    whitelistedPlayers: whitelistedPlayersOnActiveServer(state)
  }),
  dispatch => ({
    showAddWhitelistDialog: dispatch(toggleAddWhitelistDialog())
  })
)(WhitelistGrid);
