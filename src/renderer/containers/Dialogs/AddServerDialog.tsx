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

import { Omit } from '../../@types/global';
import AvatarPicker from '../../components/AvatarPicker';
import NoHoverIconButton from '../../components/NoHoverIconButton';
import { toggleAddServerDialog } from '../../redux/app/actions';
import { addServerDialogShowingSelector } from '../../redux/app/selectors';
import { Dispatch, RootState } from '../../redux/redux-types';
import { Server, serversActions, serversSelectors } from '../../redux/servers';
import { testConnectionThunk } from '../../redux/servers/actions';

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

interface Props {
  closeDialog: () => void;
  addServer: (server: Server) => void;
  showing: boolean;
  testConnection: (server: Server) => Promise<boolean>;
}
interface State extends Omit<Server, 'id' | 'port'> {
  id: string;
  port: string;
}
interface SecondaryState {
  valid: boolean;
}
const AddServerDialog: React.FunctionComponent<Props> = ({
  addServer,
  closeDialog,
  showing,
  testConnection
}) => {
  const defaultState: State = {
    id: `${Date.now()}`,
    avatar: 'https://api.adorable.io/avatars/285/' + Date.now(),
    name: '',
    ip: '',
    port: '',
    password: '',
    active: false,
    selfHosted: false,
    rootPath: ''
  };
  const [state, setState] = React.useState<State>({
    ...defaultState
  });
  const [secondState, secondSetState] = React.useState<SecondaryState>({
    valid: false
  });

  const handleTestConnectionClick = async () => {
    const result = await testConnection({
      ...state,
      id: Number(state.id),
      port: Number(state.port)
    });
    secondSetState({ valid: result });
  };

  const handleClick = async () => {
    addServer({
      ...state,
      port: parseInt(state.port, 10),
      active: false,
      id: Date.now()
    });
    setState({
      ...defaultState
    });
    closeDialog();
  };

  const handleChange = (key: string, value: string | boolean) => {
    setState({
      ...state,
      [key]: value
    } as any);
  };

  const openDialog = () => {
    const rootPath = remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })[0];
    if (rootPath) {
      setState({ ...state, rootPath });
    }
  };

  return (
    <Dialog fullWidth onClose={() => closeDialog()} open={showing}>
      <Wrapper>
        <InnerWrapper>
          <AvatarPicker
            avatar={state.avatar}
            setAvatar={(avatar: string) => setState({ ...state, avatar })}
          />
          <Typography variant={'h4'}>Add Server</Typography>
          <CenterSection>
            <TextField
              value={state.name}
              onChange={e => {
                handleChange('name', e.target.value);
              }}
              fullWidth
              name={'name'}
              label={'Server Name'}
            />
            <TextField
              value={state.ip}
              onChange={e => {
                handleChange('ip', e.target.value);
              }}
              fullWidth
              name={'ip'}
              label={'IP'}
            />
            <TextField
              value={state.port}
              onChange={e => {
                handleChange('port', e.target.value);
              }}
              fullWidth
              name={'port'}
              label={'Port'}
            />
            <TextField
              value={state.password}
              onChange={e => {
                handleChange('password', e.target.value);
              }}
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.selfHosted}
                  onChange={() => handleChange('selfHosted', !state.selfHosted)}
                  color="secondary"
                />
              }
              label="Self Hosted Server?"
            />
            {state.selfHosted && (
              <TextField
                label="Server Root"
                value={state.rootPath}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NoHoverIconButton onClick={openDialog} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          </CenterSection>
          <Button
            style={{
              marginTop: 25,
              backgroundColor: secondState.valid ? '#007640' : '#832f2b'
            }}
            onClick={handleTestConnectionClick}
            variant={'contained'}
            color={'secondary'}
            fullWidth
          >
            Test Connection
          </Button>
          <Button
            style={{ marginTop: 25 }}
            onClick={handleClick}
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
};

const mapStateToProps = (state: RootState) => ({
  servers: serversSelectors.serversSelector(state),
  showing: addServerDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addServer: (server: Server) =>
    dispatch(serversActions.addServerThunk(server)),
  closeDialog: () => dispatch(toggleAddServerDialog()),
  testConnection: (server: Server) => dispatch(testConnectionThunk(server))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddServerDialog);
