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
import { bg3 } from '../../styles/colors';
import {activeServerSelector} from "../../redux/servers/selectors";
import {getServerDataThunk} from "../../redux/servers/actions";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  background: ${bg3};
`;

interface Props {}
const BansGrid: React.FunctionComponent<Props> = () => {
  // Redux
  const players = useSelector(bannedPlayersOnActiveServer);
  const dispatch = useDispatch();
  const handleAddClicked = () => dispatch(toggleAddBanDialog());
  const activeServer = useSelector(activeServerSelector);
  const handleRefreshClicked = () => dispatch(getServerDataThunk(activeServer));

  // AG-Grid
  const api = React.useRef<AgGrid.GridApi>();
  const sizeColumns = () =>
    api.current ? api.current.sizeColumnsToFit() : noop();

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
