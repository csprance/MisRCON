/**
 * Name: BansView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the banned players on the server
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
import * as misrcon from 'node-misrcon';

import Spacer from '../common/Spacer';
import {log} from '../../utils/loggerUtils';
import {white, darkGrey} from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';
import BanDialog from './BanDialog';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';

export default class BansView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      credentials: store.get('userCredentials'),
      players: [{
        name: 'Loading....',
        steam: 'Loading....'
      }],
      searchString: '',
      showBanDialog: false,
      banDialogSteamID: '',
      showSnackBar: false,
      snackBarMsg: ''
    };
  }


  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     players: nextProps.banListPlayers,
  //     loading: false
  //   });
  // }


  getPlayersAndAddToState = () => {
    this.setState({
      loading: true,
    });
    misrcon.sendRCONCommandToServer({...this.state.credentials, command: 'mis_ban_status'})
      .then((res) => {
        if (res !== null) {
          this.setState({
            players: misrcon.parseBanListResponseToJs(res).map((p) => {
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


  addPlayerToBanList = () => {
    //comes from this.state.banDialogSteamID
    this.setState({
      loading: true,
    });
    misrcon.sendRCONCommandToServer({...this.state.credentials, command: `mis_ban_steamid ${this.state.banDialogSteamID}`})
      .then((res) => {
        log('silly', res);
        this.hideBanDialog();
        this.getPlayersAndAddToState()
      })
      .catch((err) => {
        log('error', err);
        this.snackBar('Something went wrong try again!');
      });
  };

  removePlayerFromBanList = (steam) => {
    this.setState({
      loading: true,
    });
    misrcon.sendRCONCommandToServer({...this.state.credentials, command: `mis_ban_remove ${steam}`})
      .then((res) => {
        log('silly', res);
        this.getPlayersAndAddToState()
      })
      .catch((err) => {
        log('error', err);
        this.snackBar('Something went wrong try again!');
      });
  };

  showBanDialog = () => {
    this.setState({
      showBanDialog: true
    })
  };

  hideBanDialog = () => {
    this.setState({
      showBanDialog: false
    })
  };

  updateBanDialogSteamID = (e) => {
    this.setState({
      banDialogSteamID: e.target.value,
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

  //TODO Add in a preloaded player to stop this from erroring
  render() {
    const fuzzyList = fuzzy.filter(this.state.searchString, this.state.players, {extract: (el) => el.steam}).map((el) => el.string);
    const filterList = this.state.players.filter((player) => fuzzyList.indexOf(player.steam) >= 0);
    return (
      <Container>

        <Actions>
          <Spacer />
          <FloatingActionButton onTouchTap={this.showBanDialog} secondary={true}>
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
              removePlayerFromBanList={this.removePlayerFromBanList}
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

        <BanDialog
          open={this.state.showBanDialog}
          actionCancel={this.hideBanDialog}
          actionSubmit={this.addPlayerToBanList}
          updateSteamID={this.updateBanDialogSteamID}
          steamID={this.state.banDialogSteamID}
        />
        <ProgressIndicator loading={this.state.loading}/>
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


