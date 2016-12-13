/**
 * Name: WhitelistView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the whitelisted players on the server
 *              and the logic to add remove and filter them
 *              gets server data sent to it initially in Containers/HomePage
 */
import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import store from 'store';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import AddIcon from 'material-ui/svg-icons/content/add';
import fuzzy from 'fuzzy';
import Snackbar from 'material-ui/Snackbar';

import Spacer from '../common/Spacer';
import {sendCommandToServer} from '../../utils/sendCommandToServer';
import JSONifyWhiteList from '../../utils/JSONifyWhiteList';
import {log} from '../../utils/loggerUtils';
import {white, darkGrey} from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';
import WhitelistDialog from './WhitelistDialog';


export default class WhitelistView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      credentials: store.get('userCredentials'),
      players: [{
        name: 'Loading....',
        steam: 'Loading....'
      }],
      searchString: '',
      showWhitelistDialog: false,
      whitelistDialogSteamID: '',
      showSnackBar: false,
      snackBarMsg: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      players: nextProps.whiteListPlayers,
      loading: false
    });
  }

  getPlayersAndAddToState = () => {
    this.setState({
      loading: true,
    });
    sendCommandToServer('mis_whitelist_status', this.state.credentials)
      .then((res) => {
        if (res !== null) {
          this.setState({
            players: JSONifyWhiteList(res).map((p) => {
              return {steam: p}
            }),
            loading: false,
          });
        }
      })
      .catch((err) => {
        log('error', err);
        this.snackBar('Something went wrong try again!');
      });
  };

  snackBar = (msg) => {
    this.setState({
      showSnackBar: true,
      snackBarMsg: msg
    });
  };


  addPlayerToWhitelist = () => {
    //comes from this.state.whitelistDialogSteamID
    this.setState({
      loading: true,
    });
    sendCommandToServer(`mis_whitelist_add ${this.state.whitelistDialogSteamID}`, this.state.credentials)
      .then((res) => {
        log('silly', res);
        this.hideWhitelistDialog();
        this.getPlayersAndAddToState()
      })
      .catch((err) => {
        log('error', err);
        this.snackBar('Something went wrong try again!');
      });
  };


  removePlayerFromWhitelist = (steam) => {
    this.setState({
      loading: true,
    });
    sendCommandToServer(`mis_whitelist_remove ${steam}`, this.state.credentials)
      .then((res) => {
        log('silly', res);
        this.getPlayersAndAddToState()
      })
      .catch((err) => {
        log('error', err);
        this.snackBar('Something went wrong try again!');
      });
  };

  showWhitelistDialog = (steam) => {
    this.setState({
      showWhitelistDialog: true
    })
  };

  hideWhitelistDialog = () => {
    this.setState({
      showWhitelistDialog: false
    })
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

  closeSnackBar = () => {
    this.setState({
      showSnackBar: false
    });
  };


  render() {
    const fuzzyList = fuzzy.filter(this.state.searchString, this.state.players, {extract: (el) => el.steam}).map((el) => el.string);
    const filterList = this.state.players.filter((player) => fuzzyList.indexOf(player.steam) >= 0);
    return (
      <Container>
        <Actions>
          <Spacer />
          <FloatingActionButton onTouchTap={this.showWhitelistDialog} secondary={true}>
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
              removePlayerFromWhitelist={this.removePlayerFromWhitelist}
            />)}
        </PlayerList>
        <Snackbar
          bodyStyle={{background: darkGrey}}
          open={this.state.showSnackBar}
          message={this.state.snackBarMsg}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackBar}
          action="OK"
          onActionTouchTap={this.closeSnackBar}
        />
        <WhitelistDialog open={this.state.showWhitelistDialog}
                         actionSubmit={this.addPlayerToWhitelist}
                         actionCancel={this.hideWhitelistDialog}
                         steamID={this.state.whitelistDialogSteamID}
                         updateSteamID={this.updateWhitelistDialogSteamID}/>
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


