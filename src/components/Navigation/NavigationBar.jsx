"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { CongregateLogo } from "./CongregateLogo";
import { ChevronDown, CalendarIcon, VenueIcon } from "./Icons";

const menuItems = ["Meet", "Host", "Events", "Venues", "SignIn/SignOut"];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
      className="bg-cyan-600 text-white shadow-lg"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand>
        <div className="scale-75 md:scale-100 cursor-default">
          <CongregateLogo />
        </div>
        <p className="font-pally ml-1 text-lg font-bold text-inherit md:text-2xl cursor-pointer">
          Congregate
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        <NavbarItem>
          <Link
            className="font-satoshi text-lg font-medium text-white"
            href="#"
          >
            Meet
          </Link>
        </NavbarItem>
        <Dropdown classNames={{
          content: "bg-cyan-700 shadow-2xl",
        }}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="font-satoshi bg-transparent p-0 text-lg font-medium text-white data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                endContent={
                  <ChevronDown fill={"#FFF"} size={16} rotation={rotation} />
                }
                onClick={() =>
                  rotation === 180 ? setRotation(0) : setRotation(180)
                }
              >
                Host
              </Button>
            </DropdownTrigger>
          </NavbarItem>
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-1">
          <Button
            className="text-md text-white"
            as={Link}
            color="foreground"
            href="#"
            variant="flat"
          >
            Login
          </Button>

          <Button
            className="text-md text-white"
            as={Link}
            color="default"
            href="#"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="scrollbar-hide">
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${item}-${i}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
