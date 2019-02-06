import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import VertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PlayerAvatar from '../../components/PlayerAvatar';
import SubHeader from '../../components/SubHeader';
import { hidePlayerProfileDialog } from '../../redux/app/actions';
import { setPlayerNote } from '../../redux/players/actions';
import { makePlayerByPartialSelector } from '../../redux/players/selectors';
import { defaultPlayer } from '../../redux/players/state';
import { Player } from '../../redux/players/types';
import { Dispatch, RootState } from '../../redux/redux-types';
import { bg1, bg3, text } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  min-height: 350px;
  flex-direction: column;
`;
const InfoSection = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 20px;
  background: ${bg1};
  min-height: 200px;
`;
const NoteSection = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  background: ${bg3};
  min-height: 200px;
`;
const ColoredText = styled.div`
  color: ${({ color }) => color};
`;
const SteamText = styled.div`
  color: ${text.primary};
`;
const LeftSide = styled.div``;
const RightSide = styled.div``;
const Spacer = styled.div`
  flex-grow: 1;
  height: 10px;
`;
const TabWrapper = styled.div``;
interface Props {}
type ReduxProps = {
  player: Player;
  open: boolean;
  closeDialog: () => void;
  updatePlayerNote: (note: string, steam: string) => void;
};
const PlayerProfileDialog: React.FunctionComponent<Props & ReduxProps> = ({
  player,
  open,
  updatePlayerNote,
  closeDialog
}) => {
  const [navIndex, setNavIndex] = React.useState(0);
  const [notes, setNotes] = React.useState(player.notes);
  const handleChange = (_: any, newValue: number) => {
    setNavIndex(newValue);
  };

  const handleNotesChange = (e: any) => {
    setNotes(e.target.value);
    updatePlayerNote(e.target.value, player.steam);
  };

  return (
    <Dialog fullWidth onClose={() => closeDialog()} open={open}>
      <Wrapper>
        <InfoSection>
          <LeftSide>
            <PlayerAvatar
              mini={false}
              src={player.avatarUrl}
              active={player.active}
              alt={player.name}
            />
          </LeftSide>
          <RightSide>
            <ColoredText color={player.color}>{player.name}</ColoredText>
            <SteamText>{player.steam}</SteamText>
          </RightSide>
          <Spacer />
          <Button variant={'contained'}>Kick</Button>
          <div style={{ width: 5 }} />
          <Button variant={'contained'}>Ban</Button>
          <div style={{ width: 5 }} />
          <IconButton>
            <VertIcon />
          </IconButton>
        </InfoSection>
        <TabWrapper>
          <AppBar style={{ backgroundColor: bg1 }} position="static">
            <Tabs value={navIndex} onChange={handleChange}>
              <Tab label="Notes" />
              <Tab label="Color" />
              <Tab label="Mutual Servers" />
            </Tabs>
          </AppBar>
          {navIndex === 0 && (
            <NoteSection>
              <SubHeader>Notes:</SubHeader>
              <TextField onChange={handleNotesChange} value={notes} />
            </NoteSection>
          )}
          {navIndex === 1 && (
            <NoteSection>
              <SubHeader>Color:</SubHeader>
              Change Color Here
            </NoteSection>
          )}
          {navIndex === 2 && (
            <NoteSection>
              <SubHeader>Mutual Servers:</SubHeader>
              Server 1
            </NoteSection>
          )}
        </TabWrapper>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => {
  const getPlayerBySteam = makePlayerByPartialSelector({
    steam: state.app.selectedPlayerID
  });
  const open = state.app.playerProfileDialogOpen;
  const player = getPlayerBySteam(state);
  return {
    open,
    player: player ? player : defaultPlayer
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDialog: () => dispatch(hidePlayerProfileDialog()),
  updatePlayerNote: (notes: string, steam: string) =>
    dispatch(setPlayerNote(steam, notes))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerProfileDialog);
