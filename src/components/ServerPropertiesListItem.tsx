import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { Server } from '../redux/servers';
import { bg0 } from '../styles/colors';
import ServerPropertiesMenu from './Menus/ServerPropertiesMenu';

const Wrapper = styled.div`
  -webkit-app-region: no-drag;
`;

interface Props extends RouteComponentProps {
  toggleEditServerDialog: () => void;
  refreshServerData: () => void;
  activeServer: Server;
  deleteServer: () => void;
}
const ServerPropertiesListItem: React.FunctionComponent<Props> = ({
  activeServer,
  deleteServer,
  refreshServerData,
  toggleEditServerDialog
}) => {
  const [anchorEl, setAnchor] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Wrapper>
      <ListItem
        component="a"
        onClick={handleClick}
        style={{
          height: 48,
          borderBottom: 'solid 1px ' + bg0,
          borderRadius: '5px 0 0 0'
        }}
        button
      >
        <ListItemText primary={activeServer.name} />
        <ListItemIcon>
          <KeyboardArrowDownIcon color={'secondary'} />
        </ListItemIcon>
      </ListItem>
      <ServerPropertiesMenu
        toggleEditServerDialog={toggleEditServerDialog}
        refreshServerData={refreshServerData}
        anchorEl={anchorEl}
        deleteServer={deleteServer}
        handleClose={handleClose}
      />
    </Wrapper>
  );
};

export default withRouter(ServerPropertiesListItem);
