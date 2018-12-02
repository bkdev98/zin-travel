import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';

class MapComponent extends Component {
  state = { lat: 10.8471758, lng: 106.6447029 }

  componentDidMount = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: this.props.address }, (results, status) => {
      if (status === 'OK') {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        console.log('Geocode was not successful for the following reason:', status);
      }
    });
  }

  render() {
    const { lat, lng } = this.state;

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat, lng }}
        center={{ lat, lng }}
      >
        {this.props.isMarkerShown && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    isMarkerShown: true,
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGjf9PEag69kVcGkWpDzGo0kUQgM4aiAE',
    loadingElement: (<div style={{ height: '100%' }} />),
    containerElement: (<div style={{ height: '400px' }} />),
    mapElement: (<div style={{ height: '100%' }} />),
  }),
  withScriptjs,
  withGoogleMap)(MapComponent);

