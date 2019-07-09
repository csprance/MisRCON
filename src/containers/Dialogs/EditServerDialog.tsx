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

import NoHoverIconButton from '../../components/NoHoverIconButton';
import { toggleUpdateServerDialog } from '../../redux/app/actions';
import { updateServerDialogShowingSelector } from '../../redux/app/selectors';
import { Dispatch, RootState } from '../../redux/redux-types';
import { Server, serversActions, serversSelectors } from '../../redux/servers';
import AvatarPicker from '../../components/AvatarPicker';

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
  updateServer: (server: Server) => void;
  closeDialog: () => void;
  server: Server;
  showing: boolean;
}
interface State extends Server {}
const EditServerDialog: React.FunctionComponent<Props> = ({
  server,
  closeDialog,
  showing,
  updateServer
}) => {
  const [state, setState] = React.useState<State>({ ...server });

  const handleUpdateServerClicked = () => {
    updateServer(state);
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
    <Dialog
      fullWidth
      onClose={() => closeDialog()}
      onEnter={() => setState(server)}
      open={showing}
    >
      <Wrapper>
        <InnerWrapper>
          <AvatarPicker
            avatar={state.avatar}
            setAvatar={(avatar: string) => setState({ ...state, avatar })}
          />
          <Typography variant={'h4'}>Edit Server</Typography>
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
            style={{ marginTop: 25 }}
            onClick={handleUpdateServerClicked}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Update Server Data
          </Button>
        </InnerWrapper>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  server: serversSelectors.activeServerSelector(state),
  showing: updateServerDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateServer: (server: Server) =>
    dispatch(serversActions.updateServerThunk(server)),
  closeDialog: () => dispatch(toggleUpdateServerDialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(EditServerDialog);
