import * as AgGrid from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import styled from 'styled-components';

import { gridOptions } from '../constants/grid-constants';

const GridWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
`;

interface Props {
  onGridReady: (params: any) => void;
  columnDefs: AgGrid.ColDef[];
  rowData: any[];
}
const MyGrid: React.FunctionComponent<Props> = ({
  onGridReady,
  columnDefs,
  rowData
}) => {
  return (
    <GridWrapper className="ag-theme-misrcon">
      <div style={{ overflow: 'hidden', flexGrow: 1 }}>
        <AgGridReact
          {...gridOptions}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </GridWrapper>
  );
};

export default MyGrid;
