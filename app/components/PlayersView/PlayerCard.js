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
      avatar: 'http://placehold.it/42x42',
      notes: store.get(this.props.steam) !== undefined ? store.get(this.props.steam).notes : ''
    }
  }

  componentWillMount() {
    this.getAvatar();
  }

  getAvatar = () => {
    axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
      params: {
        key: 'C4E62F89FF5D569A481850BCD3098D52',
        steamids: this.props.steam
      }
    }).then((res) => {
      this.setState({
        avatar: res.data.response.players[0].avatar,
      });
    }).catch((err) => {
      log('error', err);
    });
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
      <PCard key={this.props.steam + this.props.name}>
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
            <FlatButton label="Kick" onTouchTap={this.kickPlayer}/>
            <FlatButton secondary={true} label="Ban" onTouchTap={this.openBanDialog}/>
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
