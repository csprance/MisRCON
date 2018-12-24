import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { remote } from 'electron';
import * as React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  -webkit-app-region: no-drag;
`;
const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

type Props = {
  history: any; // Router
  location: any; // Router
  match: any;
};
type State = {
  readonly anchorEl: null | any;
};
class TitleBarMenu extends React.Component<Props, State> {
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

  exitApp = () => {
    const focusedWindow = remote.BrowserWindow.getFocusedWindow()!;
    focusedWindow.close();
  };

  public render() {
    const { anchorEl } = this.state;
    return (
      <Wrapper>
        <IconButton
          onClick={this.handleClick}
          style={{
            margin: 0,
            padding: 5,
            marginBottom: 5
          }}
        >
          <MenuIcon fontSize="small" style={{ fill: 'orange' }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.props.history.push('/')}>
            <Link href={'#'}>Switch Server</Link>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push('/add')}>
            Add Server
          </MenuItem>
          <MenuItem onClick={this.exitApp}>Exit</MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}

export default withRouter(TitleBarMenu);
