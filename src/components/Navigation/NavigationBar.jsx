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
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import { CongregateLogo } from "./CongregateLogo";
import { ChevronDown, CalendarIcon, VenueIcon } from "../Icons/Icons";
import { useRouter } from "next/navigation";
import { supabaseAuth } from "../../utils/supabaseClient";

const getCurrentUser = async () => {
  try {
    const { data: session, error } = await supabaseAuth.auth.getSession();
    if (error || !session || session.user === undefined)
      return console.error("Error getting current session or user.", error);

    return session.user.email;
  } catch (error) {
    console.error(error);
  }
};

let signedInUser = getCurrentUser();

const menuItems = ["Meet", "Host Events", "Host Venues"];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const router = useRouter();

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
      <NavbarBrand onClick={() => router.push("/")}>
        <div className="scale-75 cursor-default md:scale-100">
          <CongregateLogo />
        </div>
        <p className="ml-1 cursor-pointer font-satoshi text-lg font-bold text-inherit md:text-2xl">
          Congregate
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        <NavbarItem>
          <Link
            className="font-satoshi text-lg font-medium text-white"
            href="/"
          >
            Meet
          </Link>
        </NavbarItem>
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
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown
          placement="bottom-end"
          classNames={{ content: "bg-cyan-700 shadow-2xl text-white" }}
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              radius="full"
              className="transition-transform"
              color="default"
              size="sm"
              src="#"
            />
          </DropdownTrigger>
          {signedInUser !== typeof "string" ? (
            <DropdownMenu aria-label="Login Menu" variant="flat">
              <DropdownItem
                as={Link}
                href="/login"
                key="login-signup"
                color="default"
                size="sm"
                className="text-white hover:text-black"
              >
                Login / Signup
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="details" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-white/35">{signedInUser === typeof "string" ? signedInUser : "Not signed in"}</p>
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/profile"
                className="text-white"
                key="profile"
              >
                Profile
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/profile/joined-events"
                className="text-white"
                key="joined_events"
              >
                Joined Events
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/profile/hosted-events"
                className="text-white"
                key="hosted_events"
              >
                Hosted Events
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/profile/hosted-venues"
                className="text-white"
                key="hosted_venues"
              >
                Hosted Venues
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/profile/settings"
                className="text-white"
                key="settings"
              >
                Settings
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/auth/signout"
                className="text-white"
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
      <NavbarMenu className="scrollbar-hide">
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${item}-${i}`} className="scrollbar-hide">
            <Link
              color="foreground"
              className="w-full hover:bg-white/40"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
