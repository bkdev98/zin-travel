import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap(({ location, ...props }) =>
  (<GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: location.lat, lng: location.lng }}
    {...props}
  >
    {props.isMarkerShown && <Marker position={{ lat: location.lat, lng: location.lng }} />}
  </GoogleMap>)
));

class Map extends Component {
  render() {
    const { location = { lat: 10.8471758, lng: 106.6447029 } } = this.props;
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGjf9PEag69kVcGkWpDzGo0kUQgM4aiAE&callback=initMap"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        location={location}
      />
    );
  }
}

export default Map;
