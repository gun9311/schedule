// src/pages/map/Map.jsx

import React, { useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const render = (status) => {
  if (status === Status.LOADING) return <h3>Loading...</h3>;
  if (status === Status.FAILURE) return <h3>Error loading maps</h3>;
  return null;
};

const MapComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  }, []);
  console.log("MapComponent")

  return <div ref={ref} className="map-container" />;
};

export const Map = () => {
  console.log("Google Maps API Key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  return (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
    <MapComponent />
  </Wrapper>
  );
};

// import React, {useState} from 'react';
// import "./Map.css"
// import {FirstFloor} from "./floors/FirstFloor";
// import {SecondFloor} from "./floors/SecondFloor";
// import {SwitchFloors} from "./floors/SwitchFloors";

// export const Map = () => {
//     const [isFirstFloor, setIsFirstFloor] = useState(true);
//     return (
//         <div className="map-par">
//             <h1 className="map-title">Карта зала</h1>
//             <SwitchFloors setIsFirstFloor = {setIsFirstFloor}/>
//             {isFirstFloor ? <FirstFloor/> : <SecondFloor/>}
//         </div>
//     );
// };

