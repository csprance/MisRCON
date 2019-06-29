import * as AgGrid from 'ag-grid-community';
import BooleanRenderer from '../components/FrameworkRenderers/BooleanRenderer';
import FlagRenderer from '../components/FrameworkRenderers/FlagRenderer';
import NameRenderer from '../components/FrameworkRenderers/NameRenderer';
import TaskControlsRenderer from '../components/FrameworkRenderers/TaskControlsRenderer';
import TaskDeleteRenderer from '../components/FrameworkRenderers/TaskDeleteRenderer';

export const gridOptions: AgGrid.GridOptions = {
  deltaRowDataMode: true, // For redux
  frameworkComponents: {
    BooleanRenderer,
    FlagRenderer,
    NameRenderer,
    TaskControlsRenderer,
    TaskDeleteRenderer
  },
  getRowNodeId: data => {
    if (data.steam) {
      return data.steam;
    }
    return data.id;
  }, // for redux
  rowHeight: 50
};
