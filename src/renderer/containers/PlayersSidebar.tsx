/*
 Container that has all the player in the current active server
  */
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import PlayerListItem from '../components/PlayerListItem';
import {
  setPlayerActiveInPlayerProfile,
  togglePlayerProfileDialog
} from '../redux/app/actions';
import { playerListShowingSelector } from '../redux/app/selectors';
import { banPlayerThunk, kickPlayerThunk } from '../redux/players/actions';
import {
  activePlayersOnActiveServerSelector,
  inactivePlayersOnActiveServerSelector
} from '../redux/players/selectors';
import { Player } from '../redux/players/types';
import { bg1 } from '../styles/colors';

const getWidth = ({ showing }: { showing: boolean }) =>
  showing ? '250px' : '0';

const Wrapper = styled.div`
  background: ${bg1};
  width: ${getWidth};
  min-width: ${getWidth};
  max-width: ${getWidth};
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
`;

interface Props {}
const PlayersSidebar: React.FunctionComponent<Props> = ({}) => {
  const dispatch = useDispatch();
  const viewPlayerProfile = (steam: string) => {
    dispatch(setPlayerActiveInPlayerProfile(steam));
    dispatch(togglePlayerProfileDialog());
  };
  const kickPlayer = (player: Player) => dispatch(kickPlayerThunk(player));
  const banPlayer = (player: Player) => dispatch(banPlayerThunk(player));
  const activePlayers = useSelector(activePlayersOnActiveServerSelector);
  const inactivePlayers = useSelector(inactivePlayersOnActiveServerSelector);
  const showing = useSelector(playerListShowingSelector);

  return (
    <Wrapper showing={showing}>
      <List
        style={{
          width: '100%'
        }}
        component={'nav'}
      >
        <ListItemText
          style={{ paddingLeft: 10 }}
          primaryTypographyProps={{
            color: 'textSecondary',
            variant: 'subtitle1'
          }}
          primary={`ONLINE - ${activePlayers.length}`}
        />
        {activePlayers.map(player => (
          <PlayerListItem
            kickPlayer={() => kickPlayer(player)}
            banPlayer={() => banPlayer(player)}
            viewPlayerProfile={() => viewPlayerProfile(player.steam)}
            key={player.steam}
            {...player}
          />
        ))}
      </List>

      <List
        style={{
          width: '100%'
        }}
        component={'nav'}
      >
        <ListItemText
          style={{ paddingLeft: 10 }}
          primaryTypographyProps={{
            color: 'textSecondary',
            variant: 'subtitle1'
          }}
          primary={`OFFLINE - ${inactivePlayers.length}`}
        />
        {inactivePlayers.map(player => (
          <PlayerListItem
            kickPlayer={() => kickPlayer(player)}
            banPlayer={() => banPlayer(player)}
            viewPlayerProfile={() => viewPlayerProfile(player.steam)}
            key={player.steam}
            {...player}
          />
        ))}
      </List>
    </Wrapper>
  );
};

export default PlayersSidebar;
