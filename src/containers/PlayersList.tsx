/*
 Container that has all the player in the current active server
  */
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import PlayerListItem from '../components/PlayerListItem';
import {
  setPlayerActiveInPlayerProfile,
  togglePlayerProfileDialog
} from '../redux/app/actions';
import { PlayersState } from '../redux/players';
import { hydratePlayersThunk } from '../redux/players/actions';
import {
  activePlayersOnActiveServerSelector,
  inactivePlayersOnActiveServerSelector
} from '../redux/players/selectors';
import { Dispatch, RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

type Props = {
  hydratePlayers: () => void;
  viewPlayerProfile: (steam: string) => void;
  activePlayers: PlayersState;
  inactivePlayers: PlayersState;
};
type State = {};
class PlayersContainer extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  componentDidMount() {
    this.props.hydratePlayers();
  }

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
          <ListItemText
            style={{paddingLeft: 10}}
            primaryTypographyProps={{
              variant: 'subheading',
              color: 'textSecondary'
            }}
            primary={`ONLINE - ${activePlayers.length}`}
          />
          {activePlayers.map(player => (
            <PlayerListItem
              onClick={() => this.props.viewPlayerProfile(player.steam)}
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
            style={{paddingLeft: 10}}
            primaryTypographyProps={{
              variant: 'subheading',
              color: 'textSecondary'
            }}
            primary={`OFFLINE - ${inactivePlayers.length}`}
          />
          {inactivePlayers.map(player => (
            <PlayerListItem
              onClick={() => this.props.viewPlayerProfile(player.steam)}
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
  inactivePlayers: inactivePlayersOnActiveServerSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  hydratePlayers: () => dispatch(hydratePlayersThunk()),
  viewPlayerProfile: (steam: string) => {
    dispatch(togglePlayerProfileDialog());
    dispatch(setPlayerActiveInPlayerProfile(steam));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);
