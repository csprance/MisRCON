import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FloatingCloseButton from '../../components/FloatingCloseButton';
import { toggleSettingsDialog } from '../../redux/app/actions';
import { settingsDialogShowingSelector } from '../../redux/app/selectors';
import { Dispatch, RootState } from '../../redux/redux-types';
import {
  deleteAllTerminals,
  scanForTerminalsThunk
} from '../../redux/terminal/actions';
import { bg1, bg3 } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const LeftSide = styled.div`
  margin-top: 9px;
  display: flex;
  padding-top: 100px;
  background: ${bg1};
  flex-grow: 1;
  height: calc(100% - 9px);
`;
const RightSide = styled.div`
  display: flex;
  padding-top: 100px;
  background: ${bg3};
  flex-grow: 2;
  margin-top: 9px;
  height: calc(100% - 9px);
`;
const Spacer = styled.div`
  flex-grow: 1;
  height: 100%;
`;

interface ReduxProps {
  closeDialog: () => void;
  showing: boolean;
  _deleteAllTerminals: () => void;
}
interface Props {}
const SettingsDialog: React.FunctionComponent<Props & ReduxProps> = ({
  closeDialog,
  _deleteAllTerminals,
  showing
}) => {
  const [selected, setSelected] = React.useState('');
  return (
    <Dialog
      style={{ overflow: 'hidden', overflowY: 'hidden' }}
      fullWidth
      fullScreen
      onClose={() => closeDialog()}
      open={showing}
    >
      <FloatingCloseButton onClick={() => closeDialog()} />
      <Wrapper>
        <LeftSide>
          <Spacer />
          <List
            style={{
              width: 225,
              overflowY: 'auto'
            }}
          >
            <ListSubheader disableSticky>
              <ListItemText
                primary={<p style={{ fontWeight: 700 }}>User Settings</p>}
              />
            </ListSubheader>
            <ListItem
              selected={selected === 'user/credentials'}
              onClick={() => setSelected('user/credentials')}
              button
            >
              <ListItemText primary={'Credentials'} />
            </ListItem>
            <Divider
              style={{
                width: '80%',
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 5
              }}
            />
            <ListSubheader disableSticky>
              <ListItemText
                primary={<p style={{ fontWeight: 700 }}>App Settings</p>}
              />
            </ListSubheader>
            <ListItem
              selected={selected === 'app/database'}
              onClick={() => setSelected('app/database')}
              button
            >
              <ListItemText primary={'Database'} />
            </ListItem>
          </List>
        </LeftSide>
        <RightSide>
          <Button onClick={() => _deleteAllTerminals()}>Delete</Button>
        </RightSide>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  showing: settingsDialogShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  _deleteAllTerminals: () => {
    dispatch(deleteAllTerminals());
    dispatch(scanForTerminalsThunk());
  },
  closeDialog: () => {
    dispatch(toggleSettingsDialog());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
