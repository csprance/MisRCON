import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { toggleAddWhitelistDialog } from '../../redux/app/actions';
import { addWhitelistDialogShowingSelector } from '../../redux/app/selectors';
import { whitelistSteamIDThunk } from '../../redux/players/actions';
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
  addToWhitelist: (steamids: string[], reason: string) => void;
  closeDialog: () => void;
  server: Server;
  showing: boolean;
}
interface State {
  reason: string;
  steamid: string;
}
const AddWhitelistDialog: React.FunctionComponent<Props & ReduxProps> = ({
  closeDialog,
  showing,
  addToWhitelist
}) => {
  const [state, setState] = React.useState<State>({ reason: '', steamid: '' });

  const handleUpdateServerClicked = () => {
    addToWhitelist(state.steamid.split(' '), state.reason);
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
          <Typography variant={'h4'}>Add Player to Whitelist</Typography>
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
              label={'Whitelist Reason'}
            />
            <TextField
              value={state.steamid}
              onChange={e => {
                handleChange('steamid', e.target.value);
              }}
              fullWidth
              multiline
              rowsMax="5"
              rows={5}
              name={'steamid'}
              label={'SteamID(s) 64 - One per line'}
            />
          </CenterSection>
          <Button
            style={{ marginTop: 25 }}
            onClick={handleUpdateServerClicked}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Add To Whitelist
          </Button>
        </InnerWrapper>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  server: serversSelectors.activeServerSelector(state),
  showing: addWhitelistDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToWhitelist: (steamids: string[]) => {
    for (const steamid of steamids) {
      dispatch(whitelistSteamIDThunk(steamid));
    }
  },
  closeDialog: () => dispatch(toggleAddWhitelistDialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(AddWhitelistDialog);
