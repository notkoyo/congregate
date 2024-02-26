"use client";

import EventCards from "@/components/Events/EventCards";
import { fetchCurrentUserID } from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function myEvents() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    fetchCurrentUserID()
      .then((id) => {
        return supabaseAuth.from("users").select("id").eq("auth_id", id);
      })
      .then(({ data }) => {
        console.log();
        return supabaseAuth
          .from("events")
          .select("*, venues(photos)")
          .eq(`founder_id`, data[0].id);
      })
      .then(({ data }) => {
        console.log();
        setUserEvents(
          data.map((event) => {
            console.log(event);
            return { ...event, ...event.venues };
          }),
        );
      });
  }, []);

  return (
    <>
      {userEvents.length > 0 && userEvents.map((item) => (
        <EventCards item={item} showDelete={true} key={item.event_id} />
      ))}
    </>
  );
}
