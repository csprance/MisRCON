import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { MemoryHistory } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

// import FloatingBackButton from '../components/FloatingBackButton';
import { Dispatch, RootState } from '../redux/redux-types';
import { ServersState } from '../redux/servers';
import { markActiveThunk, removeFromDbThunk } from '../redux/servers/actions';
import { MyPaper } from '../styles/MyStyledComponents';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled(MyPaper)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 500px;
  max-height: 500px;
  align-items: center;
  justify-content: flex-start;
`;

type Props = {
  servers: ServersState;
  markServerActive: (id: number) => void;
  deleteServer: (id: number) => void;
  history: MemoryHistory;
};
type State = {
  open: boolean;
};
class ServerSelect extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {
    open: true
  };

  public handleClick = (id: number) => {
    this.props.markServerActive(id);
    this.props.history.push('/admin');
  };

  public handleMenuClick = (id: number) => {
    this.props.deleteServer(id);
  };

  public render() {
    const { servers } = this.props;
    return (
      <Wrapper>
        {/*<FloatingBackButton to={'/'} />*/}
        <InnerWrapper>
          <Typography variant={'h4'}>Server Select</Typography>
          <List
            style={{
              minHeight: 380,
              maxHeight: 380,
              overflow: 'hidden',
              overflowY: 'auto',
              width: '100%'
            }}
            component={'nav'}
          >
            {servers.map(item => (
              <ListItem
                button
                onClick={() => this.handleClick(item.id)}
                key={item.id}
                dense
              >
                <Avatar alt={'R'} src={'http://placehold.it/42x42'} />
                <ListItemText
                  inset
                  primary={item.name}
                  secondary={`${item.ip}:${item.port}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title={'Delete Server'} placement={'right'}>
                    <IconButton
                      aria-label={'Menu'}
                      onClick={() => this.handleMenuClick(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            to={'/add'}
            // @ts-ignore
            component={DOMLink}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Add Account
          </Button>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export const mapStateToProps = (state: RootState) => ({
  servers: state.servers
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  markServerActive: (id: number) => dispatch(markActiveThunk(id)),
  deleteServer: (id: number) => dispatch(removeFromDbThunk({ id }))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerSelect);
