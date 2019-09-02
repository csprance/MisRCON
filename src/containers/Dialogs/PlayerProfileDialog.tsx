import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import VertIcon from '@material-ui/icons/MoreVert';
import 'chart.js';
import * as moment from 'moment';
import * as React from 'react';
import { LineChart } from 'react-chartkick';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ColorPicker from '../../components/ColorPicker';
import PlayerMenu from '../../components/Menus/PlayerMenu';
import PlayerAvatar from '../../components/PlayerAvatar';
import SubHeader from '../../components/SubHeader';
import { openExternally } from '../../lib/utils';
import { hidePlayerProfileDialog } from '../../redux/app/actions';
import {
  playerProfileDialogSelector,
  selectedPlayerIDSelector
} from '../../redux/app/selectors';
import { pingByPlayerSelector } from '../../redux/ping/selectors';
import {
  banPlayerThunk,
  kickPlayerThunk,
  setPlayerColor,
  setPlayerNote
} from '../../redux/players/actions';
import { playerByPartialSelector } from '../../redux/players/selectors';
import { defaultPlayer } from '../../redux/players/state';
import { RootState } from '../../redux/redux-types';
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
const TabWrapper = styled.div``;
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

interface Props {}
const PlayerProfileDialog: React.FunctionComponent<Props> = ({}) => {
  // * Redux State
  const dispatch = useDispatch();
  const open = useSelector(playerProfileDialogSelector);
  const selectedPlayerID = useSelector(selectedPlayerIDSelector);
  const possiblePlayer = useSelector((state: RootState) =>
    playerByPartialSelector(state, { steam: selectedPlayerID })
  );
  const player = possiblePlayer ? possiblePlayer : defaultPlayer;
  const ping = useSelector((state: RootState) =>
    pingByPlayerSelector(state, { steam: player.steam })
  );
  const chartPing = ping.reduce(
    (p, ret) => ({
      ...p,
      [moment(ret.date).format('YYYY-MM-DDThh:mm:ss')]: ret.ping
    }),
    {}
  );
  const closeDialog = () => dispatch(hidePlayerProfileDialog());
  const handleKickPlayerClicked = () => dispatch(kickPlayerThunk(player));
  const handleBanPlayerClicked = () => dispatch(banPlayerThunk(player));
  const handleColorButtonClick = (color: string) =>
    dispatch(setPlayerColor(player.steam, color));
  const updatePlayerNote = (steam: string, notes: string) =>
    dispatch(setPlayerNote(steam, notes));

  // * Component State
  const [navIndex, setNavIndex] = React.useState<number>(2);
  const [anchorEl, setAnchor] = React.useState<HTMLElement | null>(null);

  // * Functions
  const handleChange = (_: any, newValue: number) => {
    setNavIndex(newValue);
  };
  const handleNotesChange = (e: any) => {
    updatePlayerNote(player.steam, e.target.value);
  };
  const handleMoreVertClicked = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
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
          <Button variant={'contained'} onClick={handleKickPlayerClicked}>
            Kick
          </Button>
          <div style={{ width: 5 }} />
          <Button variant={'contained'} onClick={handleBanPlayerClicked}>
            Ban
          </Button>
          <div style={{ width: 5 }} />
          <IconButton onClick={handleMoreVertClicked}>
            <VertIcon />
          </IconButton>
          <PlayerMenu
            openSteamCommunity={() =>
              openExternally(
                'https://steamcommunity.com/profiles/' + player.steam
              )
            }
            openSteamRep={() =>
              openExternally('https://steamrep.com/search?q=' + player.steam)
            }
            viewPlayerProfile={() => {
              return;
            }}
            anchorEl={anchorEl}
            banPlayer={handleBanPlayerClicked}
            closePlayerMenu={() => setAnchor(null)}
            kickPlayer={handleKickPlayerClicked}
          />
        </InfoSection>
        <TabWrapper>
          <AppBar style={{ backgroundColor: bg1 }} position="static">
            <Tabs value={navIndex} onChange={handleChange}>
              <Tab label="Notes" />
              <Tab label="Color" />
              <Tab label="Ping History" />
            </Tabs>
          </AppBar>
          {navIndex === 0 && (
            <NoteSection>
              <SubHeader>Notes:</SubHeader>
              <TextField onChange={handleNotesChange} value={player.notes} />
            </NoteSection>
          )}
          {navIndex === 1 && (
            <NoteSection>
              <SubHeader>Color:</SubHeader>
              <ColorPicker onClick={handleColorButtonClick} />
            </NoteSection>
          )}
          {navIndex === 2 && (
            <NoteSection>
              <SubHeader>Ping History:</SubHeader>
              <LineChart data={chartPing} height={'175px'} />
            </NoteSection>
          )}
        </TabWrapper>
      </Wrapper>
    </Dialog>
  );
};

export default PlayerProfileDialog;
