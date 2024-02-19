"use client";

/* Example

  const [selectedPos, setSelectedPos] = useState({})
  return (
    <>
      <GoogleMapAutocomplete setSelectedPos={setSelectedPos}/>
      <GoogleMap selectedPos={selectedPos} locations={locations} />
    </>

*/

import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

export const GoogleMap = ({ LocationInfo = [], selectedPos = {} }) => {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [cameraProps, setCameraProps] = useState({
    center: { lat: 0, lng: 0 },
    zoom: 15,
  });

  useEffect(() => {
    Object.keys(selectedPos).length
      ? setCameraProps({...cameraProps, center:{ lat: selectedPos.lat, lng: selectedPos.lng }})
      : navigator.geolocation.getCurrentPosition((pos) => {
          setCameraProps({
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            zoom: 15,
          });
        });
  }, [selectedPos]);

  const handleCameraChange = useCallback((MapCameraChangedEvent) =>
    setCameraProps({...cameraProps, zoom: MapCameraChangedEvent.detail.zoom}),
  );

  return (
    <APIProvider apiKey={mapApiKey}>
      <Map
        className="h-80 w-80"
        {...cameraProps}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        onCameraChanged={handleCameraChange}
      ></Map>
    </APIProvider>
  );
};
