/**
 * Name: EventsView
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Contains EmittersList and EventsContainer
 * EmittersList is a list of Emitters sorted by steamid
 * EventsContainer contains a list of events passed to it based on the Emitter.steamid
 * Emitters are players that are emitting Events on the server
 * Events are any action that causes a log line to be created.
 *
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';
import _ from 'lodash'
import store from 'store';

import EventsContainer from './EventsContainer';
import './eventsView.global.css';
import EmittersList from './EmittersList';
import EventsDrawer from './EventsDrawer';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';
import {emitters, events} from '../../initialState'
const {dialog} = require('electron').remote;
const {ipcRenderer} = require('electron');

export default class EventsView extends Component {
  constructor(props, context) {
    super(props, context);
    const chatLogPath = store.get('chatLogPath');
    const damageLogPath = store.get('damageLogPath');
    this.state = {
      chatLogPath: chatLogPath !== undefined ? chatLogPath : "",
      damageLogPath: damageLogPath !== undefined ? damageLogPath : "",
      selected: 'ALL',
      drawerOpen: false,
      emitters: emitters,
      events: events.chatEvents.concat(events.damageEvents),
      allEvents: events.chatEvents.concat(events.damageEvents),
      eventsIdx: 15,
      incAmt: 15,
      killOnlyToggle: false
    }
  }

  //////////////////////////////////////////////////////////////
  //LifeCycle Hooks
  //////////////////////////////////////////////////////////////
  componentDidMount() {
    ipcRenderer.on('receiveChatLog', (event, arg) => {
      console.log('Recieved Chat Log');
      this.setState({
        loading: false,
        emitters: arg.emitters,
        allEvents: arg.allEvents,
        events: _.slice(arg.allEvents, 0, this.state.eventsIdx),
        eventsIdx: this.state.eventsIdx + this.state.incAmt,
      });
    });

    ipcRenderer.on('receiveDamageLog', (event, arg) => {
      console.log('Recieved Damage Log');
      this.setState({
        loading: false,
        emitters: arg.emitters,
        allEvents: arg.allEvents,
        events: _.slice(arg.allEvents, 0, this.state.eventsIdx),
        eventsIdx: this.state.eventsIdx + this.state.incAmt,
      });
    });
  }


  //////////////////////////////////////////////////////////////
  // Handlers
  //////////////////////////////////////////////////////////////

  pickChatLogPath = () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{name: 'Chat Logs', extensions: ['txt']}]
    }, (files) => {
      if (files) this.setState({chatLogPath: files[0]});
      if (files) store.set('chatLogPath', files[0]);
    })
  };

  pickDamageLogPath = () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{name: 'Chat Logs', extensions: ['txt']}]
    }, (files) => {
      if (files) this.setState({damageLogPath: files[0]});
      if (files) store.set('damageLogPath', files[0]);
    })
  };

  handleChatLogPathChange = (e) => {
    console.log(e);
    this.setState({
      chatLogPath: e.target.value,
    });
    store.set('chatLogPath', e.target.value);
  };

  handleDamageLogPathChange = (e) => {
    this.setState({
      damageLogPath: e.target.value,
    });
    store.set('damageLogPath', e.target.value);
  };

  handleDrawerOpen = (open) => {
    this.setState({
      drawerOpen: typeof open === "boolean" ? open : true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  };

  startLoad = () => {
    this.handleDrawerClose();
    this.setState({
      loading: true,
    });
  };

  stopLoad = () => {
    this.setState({
      loading: false,
    });
  };

  resetEvents = () => {
    this.setState({
      allDamageEvents: [],
      damageEvents: [],
      emitters: [],
      eventsIdx: this.state.incAmt,
    });
  };
  //////////////////////////////////////////////////////////////
  // Custom Methods
  //////////////////////////////////////////////////////////////



  banPlayer = (steam) => {
    console.log('Banning player: ', steam)
  };

  kickPlayer = (steam) => {
    console.log('Kicking player: ', steam)
  };

  unWhiteListPlayer = (steam) => {
    console.log('unWhiteListingplayer: ', steam)
  };


  parseChatLogs = () => {
    this.startLoad();
    this.resetEvents();
    ipcRenderer.send('getChatLog', this.state.chatLogPath);
  };


  parseDamageLogs = () => {
    this.startLoad();
    this.resetEvents();
    ipcRenderer.send('getDamageLog', this.state.damageLogPath);
  };

  sendData = () => {

  };


  onSelect = (steam) => {
    this.setState({
      selected: steam,
      events: _.slice(this.state.allEvents.filter((e) => steam === 'ALL' ? true : e.steam === steam), 0, this.state.incAmt),
      eventsIdx: 50,
    });
    document.getElementsByClassName('events-list')[0].scrollTop = 0;
  };

  loadMore = (selected) => {
    //TODO: This sucks improve this. It is really bad at the end of a list scrolling up and down.
    // Maybe replace this scroll lib
    return new Promise((resolve, reject) => {
      const isSelected = (e) => selected === 'ALL' ? true : e.steam === selected;
      let more = _.slice(this.state.allEvents.filter(isSelected), 0, this.state.eventsIdx);
      this.setState({
        events: more,
        eventsIdx: this.state.eventsIdx + this.state.incAmt
      });
      resolve();
    });
  };

  //TODO: Move this to a different folder
  // Filter data and set the state of allEvents with the new data
  filterData = (data) => {

    const filters = {
      isChat: (e) => e.type === 'chat',
      isSelected: (steam) => (e) => steam === 'ALL' ? true : e.steam === steam,
      isDamage: (e) => e.type === 'chat',
      isAKill: (e) => e.kill === '1',
    };


    // if (!this.state.killOnlyToggle) {
    //   console.log('Showing ONLY KILL EVENTS');
    //   this.setState({
    //     events: this.state.events.filter(isAKillOrChat),
    //     filterKillRule: (e) => e.kill === '1' || e.msg !== undefined
    //   });
    // }
    //
    // if (this.state.killOnlyToggle) {
    //   console.log('Showing all Events');
    //   this.setState({
    //     events: this.state.events,
    //     filterKillRule: (e) => true,
    //   });
    // }

  };


  toggleKills = () => {
    this.setState({
      killOnlyToggle: !this.state.killOnlyToggle,
    });
    if (this.state.killOnlyToggle) this.filterData(data);
    if (!this.state.killOnlyToggle) this.filterData(data);
    this.filterData();
  };


  render() {
    return (
      <Container>
        <Row split="vertical" minSize={250} defaultSize={350} maxSize={500}>
          <EmittersList
            handleDrawerOpen={this.handleDrawerOpen}
            kickPlayer={this.kickPlayer}
            banPlayer={this.banPlayer}
            unWhiteListPlayer={this.unWhiteListPlayer}
            emitters={this.state.emitters}
            onSelect={this.onSelect}
            parseAllLogs={this.parseAllLogs}
          />
          <EventsContainer
            allEvents={this.state.allEvents}
            toggleKills={this.toggleKills}
            loadMore={this.loadMore}
            kickPlayer={this.kickPlayer}
            banPlayer={this.banPlayer}
            unWhiteListPlayer={this.unWhiteListPlayer}
            selected={this.state.selected}
            events={this.state.events}
          />
        </Row>
        <EventsDrawer
          parseDamageLogs={this.parseDamageLogs}
          parseChatLogs={this.parseChatLogs}
          parseAllLogs={this.parseAllLogs}
          chatLogPath={this.state.chatLogPath}
          damageLogPath={this.state.damageLogPath}
          pickDamageLogPath={this.pickDamageLogPath}
          pickChatLogPath={this.pickChatLogPath}
          handleChatLogPathChange={this.handleChatLogPathChange}
          handleDamageLogPathChange={this.handleDamageLogPathChange}
          drawerOpen={this.state.drawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <ProgressIndicator loading={this.state.loading}/>
      </Container>
    );
  }
}

//////////////////////////////////////////////////////////////
// Styles
//////////////////////////////////////////////////////////////
const Container = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex !important;
  height: auto !important;
  flex-grow: 1;
`;

const Row = styled(SplitPane)`
  flex-direction: row;
  width: 100%;
  display: flex;
  position: relative !important;
  flex-grow: 1;
`;
