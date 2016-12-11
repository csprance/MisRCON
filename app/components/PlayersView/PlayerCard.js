/**
 * Name: PlayersCard
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Component used to display player information from the server as well as from the localStorage
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import styled from 'styled-components';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import store from 'store';
import axios from 'axios';

import Spacer from '../common/Spacer';
import {darkGrey, white} from '../../styles/colors';
import {log} from '../../utils/loggerUtils';
import ExternalLink from '../common/ExternalLink'


class PlayersCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      avatar: store.get(this.props.steam) !== undefined ? store.get(this.props.steam).avatar : 'http://placehold.it/42x42',
      notes: store.get(this.props.steam) !== undefined ? store.get(this.props.steam).notes : ''
    }
  }

  componentWillMount() {
    this.getAvatar();
  }

  getAvatar = () => {
    // If the avatar is the placeholder go and get it otherwise do nothing
    if (this.state.avatar === 'http://placehold.it/42x42' && this.props.steam != '0') {
      log('silly', 'calling gaben for avatars');
      axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
        params: {
          key: 'C4E62F89FF5D569A481850BCD3098D52',
          steamids: this.props.steam
        }
      }).then((res) => {
        // store the player data in local storage
        store.set(this.props.steam, {notes: this.state.notes, avatar: res.data.response.players[0].avatar});
        this.setState({
          avatar: res.data.response.players[0].avatar,
        });
      }).catch((err) => {
        log('error', err);
      });
    }
  };

  updateNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
    store.set(this.props.steam, {avatar: this.state.avatar, notes: e.target.value});
  };

  render() {
    const link = String('https://steamrep.com/profiles/' + this.props.steam);
    return (
      <PCard>
        <Card>
          <CardHeader
            avatar={this.state.avatar}
            style={{background: darkGrey}}
            title={this.props.name}
            subtitle={<ExternalLink to={link}>{this.props.steam}</ExternalLink>}
          />
          <CardText>
            <TextField onChange={this.updateNotes}
                       value={this.state.notes}
                       style={{width: '100%'}}
                       floatingLabelStyle={{color: white}}
                       floatingLabelText="Notes:"/>
          </CardText>
          <CardActions style={{display: 'flex'}}>
            <Spacer />

            {this.props.removePlayerFromBanList !== undefined && <FlatButton label="UNBan" onTouchTap={this.props.removePlayerFromBanList.bind(null, this.props.steam)}/> }


            {this.props.removePlayerFromWhitelist !== undefined && <FlatButton label="Remove" onTouchTap={this.props.removePlayerFromWhitelist.bind(null, this.props.steam)}/> }

            {this.props.kick !== undefined && <FlatButton label="Kick" onTouchTap={this.props.kick.bind(null, this.props.steam)}/> }
            {this.props.ban !== undefined && <FlatButton secondary={true} label="Ban" onTouchTap={this.props.ban.bind(null, this.props.steam)}/> }
          </CardActions>
        </Card>
      </PCard>
    );
  }
}

PlayersCard.propTypes = {};
PlayersCard.defaultProps = {};

const PCard = styled.div`
  flex-basis: 20%;
  margin: 5px;
`;


export default PlayersCard;
