/**
 * Name: SteamAvatar
 * Author: Chrissprance
 * Creation Date: 12/19/2016
 * Description: get the image for the steam avatar
 */
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';

import { getAvatar } from '../../utils/steamUtils';

class SteamAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://placehold.it/42x42'
    };
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }


  componentDidMount() {
    getAvatar(this.props.steam, this.source.token).then((url) => {
      this.setState({
        url
      });
    }).catch(e => {
      console.log(e);
    });
  }


  componentWillUnmount() {
    this.source.cancel('Component unMounted');
  }


  render() {
    return (
      <Avatar style={this.props.style} size={this.props.size} src={this.state.url} />
    );
  }
}

export default SteamAvatar;
