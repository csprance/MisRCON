import * as AgGrid from 'ag-grid-community';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FilterGridSection from '../../components/FilterGridSection';
import MyGrid from '../../components/MyGrid';
import { debounce } from '../../lib/debounce';
import { toggleAddWhitelistDialog } from '../../redux/app/actions';
import { whitelistedPlayersOnActiveServer } from '../../redux/players/selectors';
import { playersColumnDefs } from '../../redux/players/state';
import { bg3 } from '../../styles/colors';
import { noop } from '../../lib/utils';
import { activeServerSelector } from '../../redux/servers/selectors';
import { getServerDataThunk } from '../../redux/servers/actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  background: ${bg3};
`;

interface Props {}
const WhitelistGrid: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const activeServer = useSelector(activeServerSelector);
  const showAddWhitelistDialog = () => dispatch(toggleAddWhitelistDialog());
  const whitelistedPlayers = useSelector(whitelistedPlayersOnActiveServer);
  const handleRefreshClicked = () => dispatch(getServerDataThunk(activeServer));

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
        refreshTooltipTitle={'Refresh Whitelist'}
        onClickRefresh={handleRefreshClicked}
        onClickAdd={showAddWhitelistDialog}
        addTooltipTitle={'Add To Whitelist'}
        filterValue={filterValue}
        setFilterValue={setVal}
      />
      <MyGrid
        onGridReady={onGridReady}
        columnDefs={playersColumnDefs}
        rowData={whitelistedPlayers}
      />
    </Wrapper>
  );
};

export default WhitelistGrid;
