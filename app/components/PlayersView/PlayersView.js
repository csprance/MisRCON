/**
 * Name: PlayersView
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Contains the list of all the players currently on the server
 *              and the logic to get, kick, ban players
 *              gets server data sent to it initially in Containers/HomePage
 */
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import fuzzy from 'fuzzy';

import { connect } from 'react-redux';
import * as serverActions from '../../actions/serverActions';

import Spacer from '../common/Spacer';
import { white } from '../../styles/colors';
import PlayerCard from './PlayerCard';
import PlayersViewBanDialog from './PlayersViewBanDialog';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';

@connect((store) => {
  return {
    server: store.server,
    credentials: store.credentials
  };
})
export default class PlayersView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchString: '',
      showBanDialog: false,
      banDialogBanReason: '',
      banDialogSteamID: '',
    };
  }

  getPlayersAndAddToState = () => {
    this.props.dispatch(serverActions.getStatus());
  };

  banPlayerAndCloseDialog = () => {
  };

  kickPlayer = (steam) => {
  };

  showBanDialog = (steam) => {
    this.setState({
      showBanDialog: true,
      banDialogSteamID: steam
    });
  };

  hideBanDialog = () => {
    this.setState({
      showBanDialog: false
    });
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
    const fuzzyList = fuzzy.filter(this.state.searchString, this.props.server.status.playersArray, {extract: (el) => el.name}).map((el) => el.string);
    const filterList = this.props.server.status.playersArray.filter((player) => fuzzyList.indexOf(player.name) >= 0);
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

          <FloatingActionButton onTouchTap={this.getPlayersAndAddToState} secondary>
            { (this.props.server.loading === true ? <AnimatedRefresh /> : <RefreshIcon />) }
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
              dispatch={this.props.dispatch}
              kick={this.kickPlayer}
            />)}
        </PlayerList>

        <PlayersViewBanDialog
          actionCancel={this.hideBanDialog}
          updateBanReason={this.updateBanReason}
          banReason={this.state.banDialogBanReason}
          steamIDToBan={this.state.banDialogSteamID}
          open={this.state.showBanDialog}
          actionSubmit={this.banPlayerAndCloseDialog}
        />

        <ProgressIndicator
          loading={this.props.server.loading}
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
  min-height: 100px;
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
  overflow-y: auto;
  align-items: flex-start;
  justify-content: center;
`;
