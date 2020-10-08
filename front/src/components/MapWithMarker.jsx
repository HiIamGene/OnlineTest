import React, { useState } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";

function AdMarker(props) {
  function initMarker(ref) {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  }
  return <Marker ref={initMarker} {...props} />;
}

function MapWithMarker(props) {
  const [pos, setPos] = useState({ currentPos: props.center });

  function handleClick(e) {
    setPos({ currentPos: e.latlng });
    props.handleValue(e.latlng);
  }

  return (
    <div>
      <Map center={props.center} zoom={props.zoom} onClick={handleClick}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {pos && (
          <AdMarker position={pos.currentPos}>
            <Popup position={pos.currentPos}>
              Current location:{" "}
              <pre>{JSON.stringify(pos.currentPos, null, 2)}</pre>
            </Popup>
          </AdMarker>
        )}
      </Map>
    </div>
  );
}

export default MapWithMarker;
