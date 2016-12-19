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
const {dialog} = require('electron').remote;
import store from 'store';

import EventsContainer from './EventsContainer';
import './eventsView.global.css';
import EmittersList from './EmittersList';
import {getChatLogFromFS} from '../../utils/chatLogUtils'
import {getAvatar} from '../../utils/steamUtils'
import EventsDrawer from './EventsDrawer';
import ProgressIndicator from '../common/ProgressIndicator/ProgressIndicator';
//initial State data TODO: Remove this at some point... probably
import {emitters, events} from '../../initialState'

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
      chatEvents: events.chatEvents,
      damageEvents: events.damageEvents,
      chatIdx: 50,
    }
  }

  componentDidMount() {
    // If we have log paths set parse them right at the start
    if (this.state.chatLogPath !== "") {
      this.parseChatLogs();
    }
    if (this.state.damageLogPath !== "") {
      this.parseDamageLogs();
    }
  }


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

  banPlayer = (steam) => {
    console.log('Banning player: ', steam)
  };
  kickPlayer = (steam) => {
    console.log('Kicking player: ', steam)
  };
  unWhiteListPlayer = (steam) => {
    console.log('unWhiteListingplayer: ', steam)
  };

  getEmitters = (data) => {
    return _.uniqBy(data, (e) => e.steam);
  };

  parseChatLogs = () => {
    //TODO: TypeError: Cannot read property 'steam' of undefined(…) need to promisfy this I think
    this.setState({
      loading: true,
    });
    getChatLogFromFS(this.state.chatLogPath)
      .then(data => {
        let sortedData = _.reverse(_.sortBy(data, ['time']));
        const emittersList = this.getEmitters(sortedData);
        this.setState({
          allChatEvents: sortedData,
          chatEvents: _.slice(sortedData, 0, this.state.chatIdx),
          emitters: emittersList,
          chatIdx: this.state.chatIdx + 50,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  parseDamageLogs = () => {
    console.log('Parsing Damage Logs')
  };

  parseAllLogs = () => {
    this.handleDrawerClose();
    this.parseChatLogs();
    this.parseDamageLogs();
  };


  onSelect = (steam) => {
    //TODO: Send user to top of page on Selected
    this.setState({
      selected: steam,
      chatEvents: _.slice(this.state.allChatEvents.filter((e) => steam === 'ALL' ? true : e.steam === steam), 0, 50),
      chatIdx: 50,
    });
    document.getElementsByClassName('events-list')[0].scrollTop = 0;
  };

  loadMore = (selected) => {
    console.log(selected);
    //TODO: This sucks improve this. It is really bad at the end of a list scrolling up and down.
    // Maybe replace this scroll lib
    return new Promise((resolve, reject) => {
      const isSelected = (e) => selected === 'ALL' ? true : e.steam === selected;
      let more = _.slice(this.state.allChatEvents.filter(isSelected), 0, this.state.chatIdx);
      this.setState({
        chatEvents: more,
        chatIdx: this.state.chatIdx + 50
      });
      resolve();
    });
  };

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
            loadMore={this.loadMore}
            kickPlayer={this.kickPlayer}
            banPlayer={this.banPlayer}
            unWhiteListPlayer={this.unWhiteListPlayer}
            selected={this.state.selected}
            chatEvents={this.state.chatEvents}
            damageEvents={this.state.damageEvents}
          />
        </Row>
        <EventsDrawer
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
