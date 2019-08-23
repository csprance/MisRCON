import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { noop } from '../../lib/utils';
import { toggleAddBanDialog } from '../../redux/app/actions';
import { bannedPlayersOnActiveServer } from '../../redux/players/selectors';
import { playersColumnDefs } from '../../redux/players/state';
import { Player } from '../../redux/players/types';
import { bg3 } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  background: ${bg3};
`;

interface Props {
  sideBarShowing: boolean;
  banSteamID: (steamid: string) => void;
  showBanAddDialog: () => void;
  players: Player[];
}
const BansGrid: React.FunctionComponent<Props> = () => {
  // Redux
  const players = useSelector(bannedPlayersOnActiveServer);
  const dispatch = useDispatch();
  const handleAddClicked = () => dispatch(toggleAddBanDialog());

  // AG-Grid
  const api = React.useRef<AgGrid.GridApi>();
  const sizeColumns = () => api.current ? api.current.sizeColumnsToFit() : noop();

  // Component State
  const [filterValue, setFilterValue] = React.useState('');

  const setVal = (e: any) => {
    setFilterValue(e.target.value);
    api.current!.setQuickFilter(e.target.value);
  };

  const onGridReady = (params: any) => {
    api.current = params.api;
    sizeColumns();
  };

  const handleRefreshClicked = () => {
    console.log('Refresh Ban List');
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
        refreshTooltipTitle={'Refresh Bans'}
        onClickRefresh={handleRefreshClicked}
        onClickAdd={handleAddClicked}
        addTooltipTitle={'Add Ban'}
        filterValue={filterValue}
        setFilterValue={setVal}
      />
      <MyGrid
        onGridReady={onGridReady}
        columnDefs={playersColumnDefs}
        rowData={players}
      />
    </Wrapper>
  );
};

export default BansGrid;
