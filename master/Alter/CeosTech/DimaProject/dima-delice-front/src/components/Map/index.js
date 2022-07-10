import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './styles.css';


const Marker = props => {
  return (
    <div>
      <div className="pin"></div>
      <div className="pulse"></div>
    </div>
  );
}


class MapDisplay extends Component {
  static defaultProps = {
    center: {
      lat: 48.70654724089437, 
      lng: 2.361346584654999,
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className ="googlemap__container">
        <GoogleMapReact
          bootstrapURLKeys={{key: this.props.mapKey}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={48.70654724089437}
            lng={2.361346584654999}
          />

        </GoogleMapReact>
      </div>
    );
  }
}
export default MapDisplay;
