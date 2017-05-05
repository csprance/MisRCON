/**
 * Name: WeatherView
 * Created by chris on 5/5/2017.
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((store) => ({
  server: store.server
}))
class WeatherView extends Component {
  render() {
    return (
      <div>
        The weather settings for {this.props.server.status.name}
      </div>
    );
  }
}

WeatherView.propTypes = {};
WeatherView.defaultProps = {};

export default WeatherView;
