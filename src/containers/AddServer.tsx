import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { remote } from 'electron';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FloatingBackButton from '../components/FloatingBackButton';
import MisRCONLogo from '../components/images/MisRCONLogo';
import NoHoverIconButton from '../components/NoHoverIconButton';
import Server from '../db/entities/Server';
import { Dispatch, RootState } from '../redux/redux-types';
import { ServersState } from '../redux/servers';
import { addToDbThunk } from '../redux/servers/actions';
import { serversSelector } from '../redux/servers/selectors';
import { MyPaper } from '../styles/MyStyledComponents';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled(MyPaper)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 600px;
  max-height: 600px;
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
  password: '',
  active: false,
  selfHosted: false,
  rootPath: ''
};
type Props = {
  addServer: (server: Server) => void;
  history: History;
  servers: ServersState;
};
type State = {
  id: string;
  name: string;
  ip: string;
  port: string;
  password: string;
  active: boolean;
  selfHosted: boolean;
  rootPath: string;
};
class AddServer extends React.Component<Props, State> {
  public static defaultProps = {};
  public state: State = { ...defaultState };

  public handleClick = () => {
    this.props.addServer({
      ...this.state,
      port: parseInt(this.state.port, 10),
      active: false,
      id: -1
    });
    this.setState({
      ...defaultState
    });
    this.props.history.push('/');
  };

  public handleChange = (key: string, value: string | boolean) => {
    this.setState({
      [key]: value
    } as any);
  };

  public openDialog = () => {
    const rootPath = remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })[0];
    this.setState({ rootPath });
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
              value={this.state.password}
              onChange={e => {
                this.handleChange('password', e.target.value);
              }}
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.selfHosted}
                  onChange={() =>
                    this.handleChange('selfHosted', !this.state.selfHosted)
                  }
                  color="secondary"
                />
              }
              label="Self Hosted Server?"
            />
            {this.state.selfHosted ? (
              <TextField
                label="Server Root"
                value={this.state.rootPath}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NoHoverIconButton onClick={this.openDialog} />
                    </InputAdornment>
                  )
                }}
              />
            ) : (
              ''
            )}
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
  servers: serversSelector(state)
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addServer: (server: Server) => dispatch(addToDbThunk(server))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServer);
