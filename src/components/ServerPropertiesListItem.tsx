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

type Props = {
  refreshServerData: () => void;
  activeServer: Server;
  deleteServer: () => void;
} & RouteComponentProps;
type State = {
  readonly anchorEl: null | any;
};
class ServerPropertiesListItem extends React.Component<Props, State> {
  public static defaultProps = {};
  public state: State = {
    anchorEl: null
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  public render() {
    const { activeServer, deleteServer, refreshServerData } = this.props;
    const { anchorEl } = this.state;
    return (
      <Wrapper>
        <ListItem
          onClick={this.handleClick}
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
          refreshServerData={refreshServerData}
          anchorEl={anchorEl}
          deleteServer={deleteServer}
          handleClose={this.handleClose}
        />
      </Wrapper>
    );
  }
}

export default withRouter(ServerPropertiesListItem);
