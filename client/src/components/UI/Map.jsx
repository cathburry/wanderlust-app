import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const Map = ({ mapHeight }) => {
  return (
    <div style={{ width: '100%', height: mapHeight }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_FIREBASE_API_KEY }}
          defaultCenter={{
            lat: 14.599512,
            lng: 120.984222,
          }}
          defaultZoom={11}
        >
          <Marker
            lat={14.599512}
            lng={120.984222}
            text="My Marker"
          />
        </GoogleMapReact>
    </div>
  );
}

export default Map;