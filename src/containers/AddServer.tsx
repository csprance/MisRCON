import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FloatingBackButton from '../components/FloatingBackButton';
import MisRCONLogo from '../components/images/MisRCONLogo';
import { Dispatch, RootState } from '../redux/redux-types';
import { IServer, ServersState } from '../redux/servers';
import { addToDbThunk } from '../redux/servers/actions';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled(Paper)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 500px;
  max-height: 500px;
  align-items: center;
  justify-content: flex-start;
`;
const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;
const defaultState = {
  id: '',
  name: '',
  ip: '',
  port: '',
  hash: '',
  active: false
};
type Props = {
  addServer: (server: IServer) => void;
  history: History;
  servers: ServersState;
};
type State = {};
class AddServer extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = { ...defaultState };

  public handleClick = () => {
    this.props.addServer({
      ...this.state,
      port: parseInt(this.state.port, 10),
      active: false,
      id: `${Date.now()}`
    });
    this.setState({
      ...defaultState
    });
    this.props.history.push('/');
  };

  public handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value
    });
  };

  public render() {
    return (
      <Wrapper>
        <FloatingBackButton to={'/'} />
        <InnerWrapper>
          <MisRCONLogo />
          <Typography variant={'h4'}>Add Server</Typography>
          <CenterSection>
            <TextField
              value={this.state.name}
              onChange={e => {
                this.handleChange('name', e.target.value);
              }}
              fullWidth
              name={'name'}
              label={'Server Name'}
            />
            <TextField
              value={this.state.ip}
              onChange={e => {
                this.handleChange('ip', e.target.value);
              }}
              fullWidth
              name={'ip'}
              label={'IP'}
            />
            <TextField
              value={this.state.port}
              onChange={e => {
                this.handleChange('port', e.target.value);
              }}
              fullWidth
              name={'port'}
              label={'Port'}
            />
            <TextField
              value={this.state.hash}
              onChange={e => {
                this.handleChange('hash', e.target.value);
              }}
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
            />
          </CenterSection>
          <Button
            style={{ marginTop: 25 }}
            onClick={this.handleClick}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Add Server
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
  addServer: (server: IServer) => dispatch(addToDbThunk(server))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddServer);
