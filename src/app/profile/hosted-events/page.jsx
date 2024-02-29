"use client";

import EventCards from "@/components/Events/EventCards";
import Heading from "@/components/Header";
import { fetchCurrentUserID } from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function myEvents() {
  const [userEvents, setUserEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    fetchCurrentUserID()
      .then((id) => {
        return supabaseAuth.from("users").select("id").eq("auth_id", id);
      })
      .then(({ data }) => {
        return supabaseAuth
          .from("events")
          .select("*, venues(photos), event_attendees(count)")
          .eq(`founder_id`, data[0].id);
      })
      .then(({ data }) => {
        if (data.length === 0) {
          setNoEvents(true);
        }
        setUserEvents(
          data.map((event) => {
            return {
              ...event,
              ...event.venues,
              attendees: event.event_attendees[0].count,
            };
          }),
        );
      });
  }, []);

  return (
    <>
      <div>
        <Heading heading="Your Hosted Events &#127880;" />
      </div>
      {noEvents ? (
        <div className="flex flex-col items-center gap-8 p-4">
          <p>
            You not currently hosting any events. To host an event click below!
          </p>
          <Link href="/host/event">
            <Button color="default">Host Event</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
          {userEvents.length > 0 &&
            userEvents.map((item) => (
              <EventCards item={item} showDelete={true} key={item.event_id} />
            ))}
        </div>
      )}
    </>
  );
}
