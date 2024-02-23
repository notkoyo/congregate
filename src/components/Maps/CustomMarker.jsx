import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

export const CustomMarker = ({ event }) => {
  const [open, setOpen] = useState(false);
  // console.log(open, event.event_id);
  return (
    <>
      <AdvancedMarker position={{ lat: event.lat, lng: event.lng }} onClick={() => setOpen(true)}/>
      {/* {open && (
        <InfoWindow onCloseClick={() => setOpen(false)} position={{ lat: event.lat, lng: event.lng } }>
          <p>{event.name}</p>
        </InfoWindow>
      )} */}
    </>
  );
};
