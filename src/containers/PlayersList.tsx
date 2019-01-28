/*
 Container that has all the player in the current active server
  */
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import PlayerListItem from '../components/PlayerListItem';
import PlayerProfile from '../components/PlayerProfile';
import { PlayersState } from '../redux/players';
import {
  activePlayersOnActiveServerSelector,
  inactivePlayersOnActiveServerSelector
} from '../redux/players/selectors';
import { defaultPlayer } from '../redux/players/state';
import { Dispatch, RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
`;

type Props = {
  activePlayers: PlayersState;
  inactivePlayers: PlayersState;
};
type State = {};
class PlayersContainer extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    const { activePlayers, inactivePlayers } = this.props;
    return (
      <Wrapper>
        <List
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
            width: '100%'
          }}
          component={'nav'}
        >
          <ListItemText primary={'Online Players'} />
          {activePlayers.map(player => (
            <PlayerListItem key={player.steam} {...player} />
          ))}
          <ListItemText primary={'Offline Players'} />
          {inactivePlayers.map(player => (
            <PlayerListItem key={player.steam} {...player} />
          ))}
        </List>
        <PlayerProfile
          player={inactivePlayers[0] ? inactivePlayers[0] : defaultPlayer}
          open={true}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  activePlayers: activePlayersOnActiveServerSelector(state),
  inactivePlayers: inactivePlayersOnActiveServerSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);
