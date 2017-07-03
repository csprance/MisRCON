//TODO Fix CardActions if statements to do be more explicit in what we want to show
/**
 * Name: PlayersCard
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: Component used to display player information from the server as well as from the localStorage
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import store from 'store';

import * as serverActions from '../../actions/serverActions';

import Spacer from '../common/Spacer';
import { darkGrey, white } from '../../styles/colors';
import ExternalLink from '../common/ExternalLink';
import SteamAvatar from '../common/SteamAvatar';

class PlayersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: store.get(this.props.steam) !== undefined
        ? store.get(this.props.steam).notes
        : ''
    };
  }

  updateNotes = e => {
    this.setState({
      notes: e.target.value
    });
    store.set(this.props.steam, {
      ...store.get(this.props.steam),
      notes: e.target.value
    });
  };

  render() {
    const link = String(`https://steamrep.com/profiles/${this.props.steam}`);
    return (
      <PCard>
        <Card>
          <CardHeader
            avatar={<SteamAvatar steam={this.props.steam} />}
            style={{ background: darkGrey }}
            title={this.props.name}
            subtitle={
              <div>
                <ExternalLink to={link}>{this.props.steam}</ExternalLink>
                {this.props.ping !== undefined
                  ? `Ping: ${this.props.ping}`
                  : ''}
              </div>
            }
          />
          <CardText>
            <TextField
              name={'playerNote'}
              onChange={this.updateNotes}
              value={this.state.notes}
              style={{ width: '100%' }}
              floatingLabelStyle={{ color: white }}
              floatingLabelText="Notes:"
            />
          </CardText>
          <CardActions style={{ display: 'flex' }}>
            <Spacer />

            {this.props.removePlayerFromBanList !== undefined &&
              <FlatButton
                label="UNBan"
                onTouchTap={() =>
                  this.props.dispatch(
                    serverActions.unBanPlayer(this.props.steam)
                  )}
              />}

            {this.props.removePlayerFromWhitelist !== undefined &&
              <FlatButton
                label="Remove"
                onTouchTap={() =>
                  this.props.dispatch(
                    serverActions.unWhitelistPlayer(this.props.steam)
                  )}
              />}

            {this.props.kick !== undefined &&
              <FlatButton
                label="Kick"
                onTouchTap={() =>
                  this.props.dispatch(
                    serverActions.kickPlayer(this.props.steam)
                  )}
              />}

            {this.props.ban !== undefined &&
              <FlatButton
                secondary
                label="Ban"
                onTouchTap={() =>
                  this.props.dispatch(
                    serverActions.banPlayer(this.props.steam)
                  )}
              />}

          </CardActions>
        </Card>
      </PCard>
    );
  }
}

const PCard = styled.div`
  flex-basis: 20%;
  margin: 5px;
`;

export default PlayersCard;
