"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Image,
  Link,
  Spinner,
  Tooltip,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { UserCard } from "./UserCard";
import { supabaseAuth } from "@/utils/supabaseClient";
import GitHubIcon from "../Icons/GitHubIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import DiamondIcon from "../Icons/DiamondIcon";

export default function Hero() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    supabaseAuth
      .from("events")
      .select("*, venues(photos, city)")
      .order("start_date", { descending: true })
      .then(({ data }) => {
        const currentEvents = data.filter(
          (e) => new Date(e.start_date) >= Date.now(),
        );
        setEvents(currentEvents);
      });
  }, []);

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat font-satoshi text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="container mx-auto px-4 pt-20 md:pt-40 lg:pt-60">
          <h1 className="mb-8 text-6xl font-bold leading-tight lg:text-7xl xl:text-8xl">
            Organize unforgettable events with ease
          </h1>
          <p className="mb-4 text-2xl">
            Empower your event hosting journey with our intuitive platform.
          </p>
        </div>
      </div>
      <div className="grid min-h-96 place-items-center pb-12 font-satoshi">
        <h2 className="mt-16 text-5xl font-bold">About Us</h2>
        <Accordion variant="splitted" className="mx-20 mb-10 mt-16 max-w-xl">
          <AccordionItem
            className="font-bold"
            key="1"
            aria-label="Who we are section"
            title="Who we are"
          >
            <p className="font-medium">
              A dynamic event platform connecting hosts and attendees globally,
              dedicated to creating unforgettable experiences.
            </p>
          </AccordionItem>
          <AccordionItem
            className="font-bold"
            key="2"
            aria-label="What we do section"
            title="What we do"
          >
            <p className="font-medium">
              We provide comprehensive event management solutions, from planning
              to execution, ensuring seamless coordination and memorable
              outcomes.
            </p>
          </AccordionItem>
          <AccordionItem
            className="font-bold"
            key="3"
            aria-label="Get started section"
            title="Get started"
          >
            <p className="font-medium">
              Dive into our user-friendly platform to effortlessly host or join
              a diverse array of events, tailored to your preferences and
              interests.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-h-full bg-cyan-600">
        <h2 className="mb-12 pt-16 text-center font-satoshi text-5xl font-bold text-white">
          Current Events
        </h2>
        {events.length > 0 ? (
          <div className="font-satoshi flex justify-center items-center gap-[2rem] flex-col xl:flex-row">
            {[events[0], events[1], events[2]].map((event) => {
              console.log(event);
              return (
                <Card key={event.event_id} className="aspect-square max-w-sm">
                  <CardHeader>
                    <div className="flex w-full flex-col">
                      <h3 className="text-xl font-bold md:text-lg">
                        {event.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <h6 className="text-small font-semibold md:text-medium">
                          {event.venues.city}
                        </h6>
                        <h6 className="text-small font-semibold md:text-xs">{`${event.start_date.slice(0, 10)}`}</h6>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Image
                      className="aspect-video max-h-64 w-full"
                      src={event.venues.photos}
                      alt="venue image"
                    />
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-center w-full items-center">
                      <h3 className="text-lg font-semibold md:text-lg">
                        Entry Fee:{" "}
                        <span className="font-medium">
                          €{event.event_price}
                        </span>
                      </h3>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="grid min-h-96 place-items-center">
            <div className="text-center">
              <Spinner size="lg" color="default" className="text-white" />
              <h2 className="font-satoshi text-3xl font-bold text-white">
                Loading Current Events...
              </h2>
            </div>
          </div>
        )}
        {events.length > 0 ? (
          <div className="flex items-center justify-center py-20">
            <Button as={Link} href="/meet" size="lg" className="font-semibold">
              View these events and more!
            </Button>
          </div>
        ) : undefined}
      </div>
    </>
  );
}
