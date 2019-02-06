/*
 Container that has all the player in the current active server
  */
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PlayerListItem from '../components/PlayerListItem';
import Player from '../db/entities/Player';
import {
  setPlayerActiveInPlayerProfile,
  togglePlayerProfileDialog
} from '../redux/app/actions';
import { playerListShowingSelector } from '../redux/app/selectors';
import { PlayersState } from '../redux/players';
import { banPlayerThunk, kickPlayerThunk } from '../redux/players/actions';
import {
  activePlayersOnActiveServerSelector,
  inactivePlayersOnActiveServerSelector
} from '../redux/players/selectors';
import { Dispatch, RootState } from '../redux/redux-types';
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
`;

type Props = {
  showing: boolean;
  viewPlayerProfile: (steam: string) => void;
  kickPlayer: (player: Player) => void;
  banPlayer: (player: Player) => void;
  activePlayers: PlayersState;
  inactivePlayers: PlayersState;
};
type State = {};
class PlayersSidebar extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    const { activePlayers, inactivePlayers, showing } = this.props;
    return (
      <Wrapper showing={showing}>
        <List
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
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
              kickPlayer={() => this.props.kickPlayer(player)}
              banPlayer={() => this.props.banPlayer(player)}
              viewPlayerProfile={() =>
                this.props.viewPlayerProfile(player.steam)
              }
              key={player.steam}
              {...player}
            />
          ))}
        </List>

        <List
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
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
              kickPlayer={() => this.props.kickPlayer(player)}
              banPlayer={() => this.props.banPlayer(player)}
              viewPlayerProfile={() =>
                this.props.viewPlayerProfile(player.steam)
              }
              key={player.steam}
              {...player}
            />
          ))}
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  activePlayers: activePlayersOnActiveServerSelector(state),
  inactivePlayers: inactivePlayersOnActiveServerSelector(state),
  showing: playerListShowingSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  viewPlayerProfile: (steam: string) => {
    dispatch(setPlayerActiveInPlayerProfile(steam));
    dispatch(togglePlayerProfileDialog());
  },
  kickPlayer: (player: Player) => {
    dispatch(kickPlayerThunk(player));
  },
  banPlayer: (player: Player) => {
    dispatch(banPlayerThunk(player));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersSidebar);
