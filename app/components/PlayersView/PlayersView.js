/**
 * Name: PlayersView
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Contains the list of all the players currently on the server
 *              and the logic to get, kick, ban players
 */
import React, {Component} from 'react';

import styled, {keyframes} from 'styled-components';
import store from 'store';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import fuzzy from 'fuzzy';

import Spacer from '../common/Spacer';
import {JSONifyStatus} from '../../utils/JSONifyStatus';
import {sendCommandToServer} from '../../utils/sendCommandToServer';
import {log} from '../../utils/loggerUtils';
import {white} from '../../styles/colors';
import PlayerCard from './PlayerCard';
import BanDialog from './BanDialog';

export default class PlayersView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      credentials: store.get('userCredentials'),
      players: [],
      searchString: '',
      showBanDialog: false,
      banDialogBanReason: '',
      banDialogSteamID: ''
    };
  }

  componentWillMount() {
    // Go and grab the player list from the server.
    this.getPlayersAndAddToState();
  }

  getPlayersAndAddToState = () => {
    this.setState({
      loading: true,
    });

    sendCommandToServer('status', this.state.credentials)
      .then((res) => {
        if (res !== null) {
          this.setState({
            players: JSONifyStatus(res).players,
            loading: false,
          });
        }
      })
      .catch((err) => {
        log('error', err);
      });
  };

  banPlayerAndCloseDialog = () => {
    log('info', `Banning Player: ${this.state.banDialogSteamID} for reason: ${this.state.banDialogBanReason}`);
    this.setState({
      showBanDialog: false,
      banDialogBanReason: ''
    });
  };

  kickPlayer = (steam) => {
    log('info', 'Kicking player from server: ' + steam);
  };

  showBanDialog = (steam) => {
    this.setState({
      showBanDialog: true,
      banDialogSteamID: steam
    })
  };

  hideBanDialog = () => {
    this.setState({
      showBanDialog: false
    })
  };

  updateSearchString = (e) => {
    this.setState({
      searchString: e.target.value
    });
  };

  updateBanReason = (e) => {
    this.setState({
      banDialogBanReason: e.target.value
    });
  };


  render() {
    const fuzzyList = fuzzy.filter(this.state.searchString, this.state.players, {extract: (el) => el.name}).map((el) => el.string);
    const filterList = this.state.players.filter((player) => fuzzyList.indexOf(player.name) >= 0);
    return (
      <Container>
        <Actions>
          <Spacer />
          <SearchBar
            value={this.state.searchString}
            onChange={this.updateSearchString}
            style={{flex: 4}}
            floatingLabelStyle={{color: white}}
            floatingLabelText="Search...."
          />
          <Spacer />
          <FloatingActionButton onTouchTap={this.getPlayersAndAddToState} secondary={true}>
            { (this.state.loading === true ? <AnimatedRefresh /> : <RefreshIcon />) }
          </FloatingActionButton>
          <Spacer />
        </Actions>
        <PlayerList>
          {filterList.map((player) =>
            <PlayerCard
              key={player.steam + player.name}
              steam={player.steam}
              name={player.name}
              ban={this.showBanDialog}
              kick={this.kickPlayer}
            />)}
        </PlayerList>
        <BanDialog
          actionCancel={this.hideBanDialog}
          updateBanReason={this.updateBanReason}
          banReason={this.state.banDialogBanReason}
          steamIDToBan={this.state.banDialogSteamID}
          open={this.state.showBanDialog}
          actionSubmit={this.banPlayerAndCloseDialog}
        />
      </Container>
    );
  }
}


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedRefresh = styled(RefreshIcon)`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
`;

const SearchBar = styled(TextField)`
  width: 40%;
`;

const Actions = styled.div`
  height: 100px;
  width: 100%;
  display: flex; 
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
  flex-shrink: 1;
`;


const PlayerList = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  overflow-y: auto;
  align-items: flex-start;
  justify-content: center;
`;


