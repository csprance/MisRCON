/**
 * Name: WhitelistView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the whitelisted players on the server
 *              and the logic to add remove and filter them
 *              gets server data sent to it initially in Containers/HomePage
 */
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import AddIcon from 'material-ui/svg-icons/content/add';
import fuzzy from 'fuzzy';
import _ from 'lodash';

import { connect } from 'react-redux';

import Spacer from '../common/Spacer';
import { white } from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';
import WhitelistDialog from './WhitelistDialog';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';


@connect((store) => {
  return {
    server: store.server,
    credentials: store.credentials
  };
})
export default class WhitelistView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      searchString: '',
      showWhitelistDialog: false,
      whitelistDialogSteamID: '',
    };
  }

  getPlayersAndAddToState = () => {

  };

  addPlayerToWhitelist = () => {

  };


  removePlayerFromWhitelist = (steam) => {

  };

  showWhitelistDialog = () => {
    this.setState({
      showWhitelistDialog: true
    });
  };

  hideWhitelistDialog = () => {
    this.setState({
      showWhitelistDialog: false
    });
  };

  updateWhitelistDialogSteamID = (e) => {
    this.setState({
      whitelistDialogSteamID: e.target.value,
    });
  };

  updateSearchString = (e) => {
    this.setState({
      searchString: e.target.value
    });
  };

  render() {
    const fuzzyList = fuzzy.filter(this.state.searchString, _.uniq(this.props.server.whitelist).filter(i => i !== '0'));
    return (
      <Container loading={this.state.loading}>
        <Actions>
          <Spacer />

          <FloatingActionButton onTouchTap={this.showWhitelistDialog} secondary>
            <AddIcon />
          </FloatingActionButton>

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
            { (this.state.loading === true ? <AnimatedRefresh /> : <RefreshIcon />) }
          </FloatingActionButton>

          <Spacer />

        </Actions>

        <PlayerList>
          {fuzzyList.map((player) =>
            <PlayerCard
              key={player.string}
              steam={player.string}
              name={player.string}
              removePlayerFromWhitelist={this.removePlayerFromWhitelist}
            />)}
        </PlayerList>

        <WhitelistDialog
          open={this.state.showWhitelistDialog}
          actionSubmit={this.addPlayerToWhitelist}
          actionCancel={this.hideWhitelistDialog}
          steamID={this.state.whitelistDialogSteamID}
          updateSteamID={this.updateWhitelistDialogSteamID}
        />

        <ProgressIndicator
          loading={this.state.loading}
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
