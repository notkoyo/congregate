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
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

export const GoogleMap = ({
  selectedPos = {},
  selectedEvents,
}) => {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [cameraProps, setCameraProps] = useState({
    zoom: 1,
    center: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    setCameraProps({
      zoom: 13,
      center: { lat: selectedPos.center.lat, lng: selectedPos.center.lng },
    });
  }, [selectedPos]);

  const handleCameraChange = useCallback((MapCameraChangedEvent) =>
    setCameraProps({ ...cameraProps, zoom: MapCameraChangedEvent.detail.zoom }),
  );

  return (
    <APIProvider apiKey={mapApiKey}>
      <Map
        className="h-80 w-80"
        {...cameraProps}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        onCameraChanged={handleCameraChange}
      >
        <AdvancedMarker position={selectedPos.center}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
        </AdvancedMarker>
        {selectedEvents.length && selectedEvents.map((event) => {
          return (
            <AdvancedMarker
              position={{ lat: event.lat, lng: event.lng }}
              key={event.event_id}
            ></AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
};
