"use client";

import EventCards from "@/components/Events/EventCards";
import Header from "@/components/Header";
import SignOutButton from "@/components/SignOutButton";
import { useLogin } from "@/components/loginContext";
import { fetchCurrentUserJoinedEvents } from "@/utils/api";
import { useEffect, useState } from "react";

export default function JoinedEvents() {
  const { isLoggedIn } = useLogin();
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    fetchCurrentUserJoinedEvents().then((res) => {
      setJoinedEvents(res);
    });
  }, []);

  return (
    <div>
      <div>
        <Header text="Welcome to all your events! &#127881;" />
      </div>
      <div className="flex flex-wrap justify-center gap-10 p-10">
        {joinedEvents.map((item) => (
          <EventCards
            item={item}
            showDelete={false}
            key={item.event_id}
          ></EventCards>
        ))}
      </div>
    </div>
  );
}
