// Container that has all the player in the current active server
import * as React from 'react';
import { connect } from 'react-redux';

import ExternalLink from '../components/ExternalLink';
import { PlayersState } from '../redux/players';
import { hydratePlayersThunk } from '../redux/players/actions';
import { playersOnActiveServerSelector } from '../redux/players/selectors';
import { Dispatch, RootState } from '../redux/redux-types';

type Props = {
  players: PlayersState;
  hydratePlayersThunk: () => void;
};
type State = {};
class PlayersContainer extends React.Component<Props, State> {
  public static defaultProps = {
    players: []
  };
  public state = {};

  componentDidMount() {
    this.props.hydratePlayersThunk();
  }

  public render() {
    const { players } = this.props;
    return (
      <div>
        <ul>
          {players.map(player => (
            <li key={player.steam}>
              <img src={player.avatarUrl} alt={player.name} />
              <ExternalLink
                href={`https://steamcommunity.com/profiles/${player.steam}`}
              >
                {player.name}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  players: playersOnActiveServerSelector(state, ownProps)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  hydratePlayersThunk: () => dispatch(hydratePlayersThunk())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);
