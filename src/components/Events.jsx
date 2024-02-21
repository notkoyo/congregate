import { GoogleMap } from "../components/Maps/GoogleMap";
import { GoogleMapAutocomplete } from "../components/Maps/GoogleMapAutocomplete";
import { supabaseAuth } from "../utils/supabaseClient";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const { motion } = require("framer-motion");

export const Events = () => {
  const [selectedPos, setSelectedPos] = useState({
    zoom: 10,
    center: { lat: 0, lng: 0 },
  });
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!selectedPos.center.lat && !selectedPos.center.lng) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSelectedPos({
          ...selectedPos,
          center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
      });
    } else {
      supabaseAuth
        .rpc("get_venues_radius", {
          radius: 130000,
          user_lat: selectedPos.center.lat,
          user_lng: selectedPos.center.lng,
        })
        .select(`lng,lat,photos,events(*)`)
        .order("name", { referencedTable: "events", descending: true })
        .then(({ data }) => {
          console.log(data);
          setSelectedEvents(
            data
              .map((event) => {
                console.log(event.events[0].event_id);
                return {
                  lng: event.lng,
                  lat: event.lat,
                  photo: event.photos,
                  ...event.events[0],
                };
              })
              .sort((eventA, eventB) => {
                const dateA = eventA.start_date;
                const dateB = eventB.start_date;
                if (dateA < dateB) {
                  return -1;
                }
                if (dateA > dateB) {
                  return 1;
                }

                return 0;
              }),
          );
        });
    }
  }, [selectedPos]);

  const sort = () => {
    setSelectedEvents((selectedEvents) => selectedEvents.reverse());
  };

  return (
    <div className="z-0 m-4 mt-8 flex w-screen">
      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-2">
          <GoogleMap
            selectedPos={selectedPos}
            selectedEvents={selectedEvents}
          />
          <GoogleMapAutocomplete setSelectedPos={setSelectedPos} />
        </section>
        <section>
          <button onClick={sort}>fill</button>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
        </section>
      </div>
      <div className="flex flex-1 flex-wrap">
        {selectedEvents.length > 1 &&
          selectedEvents.map((item) => {
            return (
              <div
                className="flex-grow-1 m-1 w-2/5 border-1 border-solid border-black rounded-lg"
                // layoutId={item.events.event_id}
                onClick={() => setSelectedId(item.event_id)}
                key={item.event_id}
              >
                <img className="w-full h-2/4 object-cover" src={item.photo} alt="" />
                <h2>{item.name}</h2>
                <h5 className="line-clamp-2">{item.description}</h5>
                <h6>{item.start_date}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
};
