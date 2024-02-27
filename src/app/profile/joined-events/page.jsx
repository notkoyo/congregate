"use client";

import EventCards from "@/components/Events/EventCards";
import Header from "@/components/Header";
import SignOutButton from "@/components/SignOutButton";
import { useLogin } from "@/components/loginContext";
import { useEffect } from "react";

export default function JoinedEvents() {
  const { isLoggedIn } = useLogin();

  useEffect(() => {
    async () => {
      if (isLoggedIn) {
        //fetch auth ID
        //fetch user ID
        //fetch events
      }
    };
  }, []);

  return (
    <div>
      <SignOutButton />
      <div>
        <Header text="Welcome to all your events! &#127881;" />
      </div>
      <div>
        <EventCards
          item={item}
          showDelete={false}
          key={item.event_id}
        ></EventCards>
      </div>
    </div>
  );
}
