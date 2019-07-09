import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { toggleAddBanDialog } from '../../redux/app/actions';
import { addBanDialogShowingSelector } from '../../redux/app/selectors';
import { banSteamIDThunk } from '../../redux/players/actions';
import { Dispatch, RootState } from '../../redux/redux-types';
import { Server, serversSelectors } from '../../redux/servers';

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
  height: 400px;
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

interface Props {}
interface ReduxProps {
  addSteamIDToBanList: (steamid: string) => void;
  closeDialog: () => void;
  showing: boolean;
  server: Server;
}
interface State {
  reason: string;
  steamid: string;
}
const AddBanDialog: React.FunctionComponent<Props & ReduxProps> = ({
  addSteamIDToBanList,
  closeDialog,
  showing
}) => {
  const [state, setState] = React.useState<State>({
    reason: '',
    steamid: ''
  });

  const handleBanPlayerClicked = () => {
    addSteamIDToBanList(state.steamid);
    closeDialog();
  };

  const handleChange = (key: string, value: string | boolean) => {
    setState({
      ...state,
      [key]: value
    } as any);
  };

  return (
    <Dialog fullWidth onClose={() => closeDialog()} open={showing}>
      <Wrapper>
        <InnerWrapper>
          <Typography variant={'h4'}>Add Ban</Typography>
          <CenterSection>
            <TextField
              value={state.reason}
              onChange={e => {
                handleChange('reason', e.target.value);
              }}
              fullWidth
              multiline
              rows={5}
              rowsMax="5"
              name={'reason'}
              label={'Reason For Ban'}
            />
            <TextField
              value={state.steamid}
              onChange={e => {
                handleChange('steamid', e.target.value);
              }}
              fullWidth
              multiline
              rows={5}
              rowsMax="5"
              name={'steamid'}
              label={'SteamID(s) 64 - One per line'}
            />
          </CenterSection>
          <Button
            style={{ marginTop: 25 }}
            onClick={handleBanPlayerClicked}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Ban Player(s)
          </Button>
        </InnerWrapper>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  server: serversSelectors.activeServerSelector(state),
  showing: addBanDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSteamIDToBanList: (steamid: string) => dispatch(banSteamIDThunk(steamid)),
  closeDialog: () => dispatch(toggleAddBanDialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(AddBanDialog);
