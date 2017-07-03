/**
 * Name: BansView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the banned players on the server
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
import * as serverActions from '../../actions/serverActions';

import Spacer from '../common/Spacer';
import { white } from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';
import BanDialog from './BanDialog';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';

@connect(store => {
  return {
    server: store.server,
    credentials: store.credentials
  };
})
export default class BansView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchString: '',
      showBanDialog: false,
      banDialogSteamID: ''
    };
  }

  getBanList = () => {
    this.props.dispatch(serverActions.getBanList());
  };

  addPlayerToBanList = () => {
    this.props.dispatch(serverActions.banPlayer(this.state.banDialogSteamID));
    this.hideBanDialog();
  };

  removePlayerFromBanList = () => {
    this.props.dispatch(serverActions.unBanPlayer(this.state.banDialogSteamID));
  };

  showBanDialog = () => {
    this.setState({
      showBanDialog: true
    });
  };

  hideBanDialog = () => {
    this.setState({
      showBanDialog: false
    });
  };

  updateBanDialogSteamID = e => {
    this.setState({
      banDialogSteamID: e.target.value
    });
  };

  updateSearchString = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  render() {
    const fuzzyList = fuzzy.filter(
      this.state.searchString,
      _.uniq(this.props.server.banlist).filter(i => i !== '0')
    );
    return (
      <Container>
        <Actions>
          <Spacer />
          <FloatingActionButton onTouchTap={this.showBanDialog} secondary>
            <AddIcon />
          </FloatingActionButton>
          <Spacer />
          <SearchBar
            value={this.state.searchString}
            onChange={this.updateSearchString}
            style={{ flex: 4 }}
            floatingLabelStyle={{ color: white }}
            floatingLabelText="Search...."
          />
          <Spacer />
          <FloatingActionButton onTouchTap={this.getBanList} secondary>
            {this.props.server.loading === true
              ? <AnimatedRefresh />
              : <RefreshIcon />}
          </FloatingActionButton>
          <Spacer />
        </Actions>
        <PlayerList>
          {fuzzyList.map(player => (
            <PlayerCard
              key={player.string}
              steam={player.string}
              name={player.string}
              dispatch={this.props.dispatch}
              removePlayerFromBanList
            />
          ))}
        </PlayerList>
        <BanDialog
          open={this.state.showBanDialog}
          actionCancel={this.hideBanDialog}
          actionSubmit={this.addPlayerToBanList}
          updateSteamID={this.updateBanDialogSteamID}
          steamID={this.state.banDialogSteamID}
        />
        <ProgressIndicator loading={this.props.server.loading} />
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
  min-height: 100px;
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
