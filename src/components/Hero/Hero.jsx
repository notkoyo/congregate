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
      .then(({ data }) => setEvents(data));
  }, []);

  const defaultBio =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, quod.";

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
            {
              "A dynamic event platform connecting hosts and attendees globally, dedicated to creating unforgettable experiences."
            }
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="What we do section"
            title="What we do"
          >
            {
              "We provide comprehensive event management solutions, from planning to execution, ensuring seamless coordination and memorable outcomes."
            }
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Get started section"
            title="Get started"
          >
            {
              "Dive into our user-friendly platform to effortlessly host or join a diverse array of events, tailored to your preferences and interests."
            }
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-h-full bg-cyan-600">
        <h2 className="mb-12 mt-12 pt-16 text-center font-satoshi text-5xl font-bold text-white">
          Current Events
        </h2>
        {events.length > 0 ? (
          <div className="font-satoshi grid grid-cols-1 gap-4 px-20 py-10 pb-24 sm:px-40 md:grid-cols-3 md:px-2 lg:grid-cols-3 lg:px-30 xl:px-[8rem]">
            {[events[0], events[1], events[2]].map((event) => {console.log(event); return (
              <Card key={event.event_id} className="aspect-square max-w-sm">
                <CardBody>
                  <Image
                    className="aspect-video max-h-64 w-full"
                    src={event.venues.photos}
                    alt="venue image"
                  />
                  <div className="flex justify-between items-center pt-2 px-1">
                    <h3 className="text-xl md:text-lg font-bold">{event.name}</h3>
                    <h6 className="text-small md:text-xs font-semibold">{`${event.start_date.slice(0,10)}`}</h6>
                  </div>
                  <div className="pt-1 md:pt-0 px-1 flex flex-col md:flex-row md:justify-between">
                    <h3 className="text-lg md:text-medium font-semibold">{event.venues.city}</h3>
                    <h3 className="text-lg md:text-medium font-semibold">Entry Fee: <span className="font-medium">€{event.event_price}</span></h3>
                  </div>
                </CardBody>
              </Card>
            )})}
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
        {events.length > 0 ? (<div className="flex justify-center items-center py-5">
            <Button as={Link} href="/meet" size="lg" className="font-semibold">
                      View these events and more!
                    </Button>
            </div>) : undefined}
      </div>
      <footer>
        <div className="flex min-h-36 flex-col items-center justify-center px-20 md:flex-row md:justify-between">
          <span className="hidden font-satoshi text-gray-400/40 font-semibold md:block">
            © 2024 Congregate Ltd. All rights reserved.
          </span>
          <div>
            <ul className="flex gap-x-10">
              <li>
                <Popover>
                  <PopoverTrigger>
                    <Link
                      as="button"
                      className="text-black transition duration-300 hover:text-black/40"
                    >
                      <DiamondIcon />
                    </Link>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-5 font-satoshi font-semibold">
                      <h3 className="cursor-default text-xl text-black">
                        Check out the developers!
                      </h3>
                      <Divider className="my-4" />
                      <ul className="flex flex-col gap-2">
                        <li>
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                isFocusable
                                as="button"
                                name="Kaiden Riley"
                                description="Junior Fullstack Developer"
                                className="transition-transform"
                                avatarProps={{
                                  src: "https://media.licdn.com/dms/image/D4E03AQFGntLsoNhW4Q/profile-displayphoto-shrink_200_200/0/1708263153007?e=1714003200&v=beta&t=M6PS1qWGGQ5pmEr1NPfm68hco8DUwqGC4XpX1wj_-cA",
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserCard
                                name={"Kaiden Riley"}
                                emoji={"🚀"}
                                linkedInHref="https://linkedin.com/in/kaiden-riley"
                                gitHubHref="https://github.com/notkoyo"
                                bio={defaultBio}
                                imageSrc={
                                  "https://media.licdn.com/dms/image/D4E03AQFGntLsoNhW4Q/profile-displayphoto-shrink_200_200/0/1708263153007?e=1714003200&v=beta&t=M6PS1qWGGQ5pmEr1NPfm68hco8DUwqGC4XpX1wj_-cA"
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </li>
                        <li>
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                as="button"
                                name="Joe Man"
                                description="Junior Fullstack Developer"
                                className="transition-transform"
                                avatarProps={{
                                  src: "https://media.licdn.com/dms/image/D4E35AQHTq_8idxygmQ/profile-framedphoto-shrink_200_200/0/1705660145251?e=1709222400&v=beta&t=359Yh0ZgQfaK0zxAFrWHxCU-XTEWIHyIsxqQsk0PUlw",
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserCard
                                name={"Joe Man"}
                                emoji={"🧠"}
                                linkedInHref="https://linkedin.com/in/joe-man-60b792194/"
                                gitHubHref="https://github.com/joe-man"
                                bio={defaultBio}
                                imageSrc={
                                  "https://media.licdn.com/dms/image/D4E35AQHTq_8idxygmQ/profile-framedphoto-shrink_200_200/0/1705660145251?e=1709222400&v=beta&t=359Yh0ZgQfaK0zxAFrWHxCU-XTEWIHyIsxqQsk0PUlw"
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </li>
                        <li>
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                as="button"
                                name="Anthony Moran"
                                description="Junior Fullstack Developer"
                                className="transition-transform"
                                avatarProps={{
                                  src: "https://avatars.githubusercontent.com/u/117123909?v=4",
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserCard
                                name={"Anthony Moran"}
                                emoji={"🐛"}
                                linkedInHref="https://linkedin.com/in/anthonymmoran/"
                                gitHubHref="https://github.com/tonymm55"
                                bio={defaultBio}
                                imageSrc={
                                  "https://avatars.githubusercontent.com/u/117123909?v=4"
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </li>
                        <li>
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                as="button"
                                name="Joe Adams"
                                description="Junior Fullstack Developer"
                                className="transition-transform"
                                avatarProps={{
                                  src: "",
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserCard
                                name={"Joe Adams"}
                                emoji={"🌍"}
                                linkedInHref="https://linkedin.com/in/joe-adams-7592621b5/"
                                gitHubHref="https://github.com/JoeAAdams"
                                bio={defaultBio}
                                imageSrc={""}
                              />
                            </PopoverContent>
                          </Popover>
                        </li>
                        <li>
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                as="button"
                                name="Dmytro Pen"
                                description="Junior Fullstack Developer"
                                className="transition-transform"
                                avatarProps={{
                                  src: "https://avatars.githubusercontent.com/u/102535430?v=4",
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserCard
                                name={"Dmytro Pen"}
                                emoji={"🎧"}
                                linkedInHref="https://www.linkedin.com/in/dmytro-pen-a79988257/"
                                gitHubHref="https://github.com/PENbDM"
                                bio={defaultBio}
                                imageSrc={
                                  "https://avatars.githubusercontent.com/u/102535430?v=4"
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </li>
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
              <li>
                <Link
                  className="text-black transition duration-300 hover:text-black/40"
                  showAnchorIcon
                  anchorIcon={<GitHubIcon />}
                  href="https://github.com/notkoyo/congregate-app"
                  target="_blank"
                />
              </li>
              <li>
                <Link
                  className="text-black transition duration-300 hover:text-black/40"
                  showAnchorIcon
                  anchorIcon={<FacebookIcon />}
                  href="https://facebook.com"
                  target="_blank"
                />
              </li>
              <li>
                <Link
                  className="text-black transition duration-300 hover:text-black/40"
                  showAnchorIcon
                  anchorIcon={<TwitterIcon />}
                  href="https://x.com"
                  target="_blank"
                />
              </li>
            </ul>
          </div>
        </div>
        <span className="flex pb-10 text-gray-400/40 font-satoshi font-semibold justify-center items-center md:hidden">
          © 2024 Congregate Ltd. All rights reserved.
        </span>
      </footer>
    </>
  );
}
