// src/pages/map/Map.jsx

import React, { useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import "./Map.css"

const render = (status) => {
  if (status === Status.LOADING) return <h3>Loading...</h3>;
  if (status === Status.FAILURE) return <h3>Error loading maps</h3>;
  return null;
};

const MapComponent = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: 37.5665, lng: 126.9780 }, // 서울, 한국의 위도와 경도
        zoom: 8,
        mapId : '4937e255366d8f81'
      });

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // 검색 후 확대 레벨
        }
      });
    }
  }, []);
  console.log("MapComponent")

  return (
    <div ref={ref} className="map-container">
      <input ref={inputRef} type="text" placeholder="장소를 검색하세요" className="map-search-input" />
    </div>
  );
};

export const Map = () => {
  // console.log("Google Maps API Key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  return (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]}>
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

