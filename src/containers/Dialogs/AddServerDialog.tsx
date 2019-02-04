import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { remote } from 'electron';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MisRCONLogo from '../../components/images/MisRCONLogo';
import NoHoverIconButton from '../../components/NoHoverIconButton';
import Server from '../../db/entities/Server';
import { toggleAddServerDialog } from '../../redux/app/actions';
import { addServerDialogShowingSelector } from '../../redux/app/selectors';
import { Dispatch, RootState } from '../../redux/redux-types';
import { addServerToDbThunk } from '../../redux/servers/actions';
import { serversSelector } from '../../redux/servers/selectors';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled.div`
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
  avatar: '',
  name: '',
  ip: '',
  port: '',
  password: '',
  active: false,
  selfHosted: false,
  rootPath: ''
};
type Props = {
  closeDialog: () => void;
  addServer: (server: Server) => void;
  showing: boolean;
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
  avatar: string;
};
class AddServerDialog extends React.Component<Props, State> {
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
    this.props.closeDialog();
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
      <Dialog
        fullWidth
        onClose={() => this.props.closeDialog()}
        open={this.props.showing}
      >
        <Wrapper>
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
              {this.state.selfHosted && (
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
      </Dialog>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  servers: serversSelector(state),
  showing: addServerDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addServer: (server: Server) => dispatch(addServerToDbThunk(server)),
  closeDialog: () => dispatch(toggleAddServerDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServerDialog);
