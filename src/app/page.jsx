"use client";

import { GoogleMap } from "@/components/Maps/GoogleMap";
import { GoogleMapAutocomplete } from "@/components/Maps/GoogleMapAutocomplete";
import { supabaseAuth } from "@/utils/supabaseClient";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const { motion } = require("framer-motion");

export default function Home() {
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
          radius: 13000,
          user_lat: selectedPos.center.lat,
          user_lng: selectedPos.center.lng,
        })
        .select(`lng,lat,photos,events(*)`)
        .then(( {data} ) => {
          setSelectedEvents(data.map((event) => {
            return {lng: event.lng, lat: event.lat,photo:event.photos, ...event.events[0]}
          }));
        });
    }
  }, [selectedPos]);

  return (
    <div className="z-0 m-4 mt-8 flex w-screen">
      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-2">
          <GoogleMap selectedPos={selectedPos} selectedEvents={selectedEvents}/>
          <GoogleMapAutocomplete setSelectedPos={setSelectedPos} />
        </section>
        <section>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
        </section>
      </div>
      <div className="flex flex-1 flex-wrap">
        {selectedEvents.length && selectedEvents.map((item) => {
          return (
            <div
              className="flex-grow-1 m-1 w-2/5 border-1 border-solid border-black"
              // layoutId={item.events.event_id}
              onClick={() => setSelectedId(item.event_id)}
              key={item.event_id}
            >
              <img src={item.photo} alt="" />
              <h2>{item.name}</h2>
              <h5>{item.description}</h5>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="absolute left-48 z-20 flex h-2/5 w-3/5 flex-col justify-center border-1 border-solid border-black bg-white"
          >
            <motion.h5>{testData[selectedId - 1].subtitle}</motion.h5>
            <motion.h2>{testData[selectedId - 1].title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)}>
              {" "}
              x
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
