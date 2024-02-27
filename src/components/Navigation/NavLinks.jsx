"use client";

import {
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Link,
} from "@nextui-org/react";
import { ChevronDown, CalendarIcon, VenueIcon } from "../Icons/Icons";
import { useLogin } from "../loginContext";
import { useEffect, useState } from "react";
import { fetchIfUserExist } from "../../utils/api";

export default function NavLinks({ rotation, setRotation }) {
  // const [isUserCreatedProfile, setIsUserCreatedProfile] = useState(false);
  const { isLoggedIn } = useLogin();
  // useEffect(() => {
  //   fetchIfUserExist().then((res) => {
  //     if (res?.id) {
  //       setIsUserCreatedProfile(true);
  //     } else {
  //       return "Profile have not been created";
  //     }
  //   });
  // }, [isLoggedIn]);
  return (
    <>
      <NavbarItem>
        <Link
          className="font-satoshi text-lg font-medium text-white"
          href="/meet"
        >
          Meet
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Dropdown
          classNames={{
            content: "bg-cyan-700 shadow-2xl scrollbar-hide",
          }}
          onOpenChange={(isOpen) =>
            isOpen ? setRotation(180) : setRotation(0)
          }
        >
          <DropdownTrigger>
            <Button
              disableRipple
              className="bg-transparent p-0 font-satoshi text-lg font-medium text-white data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              endContent={
                <ChevronDown fill={"#FFF"} size={16} rotation={rotation} />
              }
            >
              Host
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Congregate Hosting"
            className="w-[190px]"
            itemClasses={{
              base: "gap-4 text-gray-300",
              description: "text-white",
              title: "font-bold text-md",
            }}
          >
            <DropdownItem
              key="event"
              description="Host an event."
              className="font-satoshi font-medium"
              startContent={<CalendarIcon />}
              href="/host/event"
            >
              Event
            </DropdownItem>
            <DropdownItem
              key="venue"
              description="Host a venue."
              className="font-satoshi font-medium"
              startContent={<VenueIcon />}
              href="/host/venue"
            >
              Venue
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </>
  );
}
