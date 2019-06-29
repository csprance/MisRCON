import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type Props = { columnDefs: ColDef[]; rowData: any[] };
const Grid: React.FunctionComponent<Props> = ({ columnDefs, rowData }) => {
  return <AgGridReact columnDefs={columnDefs} rowData={rowData} />;
};

export default Grid;
