import * as AgGrid from 'ag-grid-community';
import BooleanRenderer from '../components/FrameworkRenderers/BooleanRenderer';
import FlagRenderer from '../components/FrameworkRenderers/FlagRenderer';

export const gridOptions: AgGrid.GridOptions = {
  deltaRowDataMode: true, // For redux
  frameworkComponents: {
    booleanRenderer: BooleanRenderer,
    flagRenderer: FlagRenderer
  },
  getRowNodeId: data => data.id, // for redux
  rowHeight: 50
};
