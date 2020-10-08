import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

function MapView(props) {
  return (
    <div>
      <LeafletMap
        center={props.center}
        zoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={props.center}>
          <Popup>
            Your advertisement will be marked here.
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
}

export default MapView;