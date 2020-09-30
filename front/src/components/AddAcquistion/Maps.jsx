import React from 'react';
import MapView from '../MapView';


function Maps(props){
  return(
      <div style={{   borderRadius: '18px',}}>
            <MapView  
              style={{
                borderRadius: '18px',
               }}
              zoom={8}
              center={props.location}
            />    
      </div>
  );
}

export default Maps;