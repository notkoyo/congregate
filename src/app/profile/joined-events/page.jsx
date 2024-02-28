"use client";

import EventCards from "@/components/Events/EventCards";
import Heading from "@/components/Header";
import { useLogin } from "@/components/loginContext";
import { fetchCurrentUserJoinedEvents } from "@/utils/api";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JoinedEvents() {
  const { isLoggedIn } = useLogin();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    fetchCurrentUserJoinedEvents().then((res) => {
      if (res.length === 0) {
        setNoEvents(true);
      }
      setJoinedEvents(res);
    });
  }, []);

  return (
    <div>
      <div>
        <Heading heading="Welcome to all your events! &#127881;" />
      </div>
      {noEvents ? (
        <div className="flex flex-col items-center gap-8">
          <p>You are not currently going to any events</p>
          <Link href="/meet">
            <Button color="default">Find events near you</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 p-10">
          {joinedEvents.map((item) => (
            <EventCards
              item={item}
              showDelete={false}
              key={item.event_id}
            ></EventCards>
          ))}
        </div>
      )}
    </div>
  );
}
