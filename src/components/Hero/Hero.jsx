"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Image,
  CardHeader,
  CardFooter,
  Spinner,
} from "@nextui-org/react";
import { supabaseAuth } from "@/utils/supabaseClient";
import GitHubIcon from "../Icons/GitHubIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/XbrandIcon";
import DiamondIcon from "../Icons/DiamondIcon";

export default function Hero() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    supabaseAuth
      .from("events")
      .select("*, venues(photos, city)")
      .then(({ data }) => setEvents(data));
  }, []);

  const defaultContent =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem voluptates molestias vero magnam in velit, adipisci distinctio quod eaque! Eum temporibus quaerat praesentium harum quis odio fuga enim veniam.";

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
      <div className="grid min-h-96 place-items-center">
        <h2 className="mt-16 font-satoshi text-5xl font-bold ">About</h2>
        <Accordion variant="splitted" className="mx-20 mb-10 mt-16 max-w-xl">
          <AccordionItem
            key="1"
            aria-label="Who we are section"
            title="Who we are"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="What we do section"
            title="What we do"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Get started section"
            title="Get started"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-h-screen bg-cyan-600">
        <h2 className="mb-12 mt-12 pt-16 text-center font-satoshi text-5xl font-bold text-white">
          Current Events
        </h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 px-20 py-10 pb-24 sm:px-40 md:grid-cols-2 md:px-40 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.event_id} className="aspect-square max-w-sm">
                <CardBody>
                  <Image
                    className="aspect-video max-h-64 w-full"
                    src={event.venues.photos}
                    alt="venue image"
                  />
                  <div className="mx-auto my-auto text-center font-satoshi text-lg font-bold lg:text-xl xl:text-2xl">
                    <h3>{event.name}</h3>
                    <h3>{event.venues.city}</h3>
                    <h4>{`€ ${event.event_price}`}</h4>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid place-items-center min-h-96">
            <div className="text-center">
              <Spinner size="lg" color="default" className="text-white" />
              <h2 className="text-3xl font-bold font-satoshi text-white">Loading Current Events...</h2>
            </div>
          </div>
        )}
      </div>
      <div className="min-h-36 flex justify-between items-center px-20">
        <span className="font-satoshi font-semibold">© 2024 Congregate Ltd. All rights reserved.</span>
        <div>
          <ul className="flex gap-10">
            <li>
              <GitHubIcon />
            </li>
            <li>
              <FacebookIcon />
            </li>
            <li>
              <TwitterIcon />
            </li>
            <li>
              <DiamondIcon />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
