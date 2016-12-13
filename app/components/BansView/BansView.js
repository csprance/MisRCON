/**
 * Name: BansView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the banned players on the server
 *              and the logic to add remove and filter them
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
import JSONifyBanList from '../../utils/JSONifyBanList';

import {log} from '../../utils/loggerUtils';
import {white, darkGrey, black} from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';


export default class BansView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      credentials: store.get('userCredentials'),
      players: [{name: 'MenisHead Johnson', steam: '324754783294234'}, {
        name: 'ClickMouth Frankhead',
        steam: '34234546435345'
      }],
      searchString: '',
      showBanDialog: false,
      banDialogSteamID: '',
      showSnackBar: false,
      snackBarMsg: ''
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      players: nextProps.banListPlayers,
      loading: false
    });
  }


  getPlayersAndAddToState = () => {
    this.setState({
      loading: true,
    });

    sendCommandToServer('mis_ban_status', this.state.credentials)
      .then((res) => {
        if (res !== null) {
          this.setState({
            players: JSONifyBanList(res),
            loading: false,
          });
        }
      })
      .catch((err) => {
        log('error', err);
      });
  };

  snackBar = (msg) => {
    this.setState({
      showSnackBar: true,
      snackBarMsg: msg
    });
  };


  addPlayerToBanList = () => {
    //this.state.whitelistDialogSteamID

  };

  removePlayerFromBanList = (steam) => {
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
          <FloatingActionButton onTouchTap={this.addPlayerToBanList} secondary={true}>
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


