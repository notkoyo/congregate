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
import { useEffect, useState } from "react";
import { CongregateLogo } from "./CongregateLogo";
import { ChevronDown, CalendarIcon, VenueIcon } from "../Icons/Icons";
import { usePathname, useRouter } from "next/navigation";
import { supabaseAuth } from "../../utils/supabaseClient";
import { revalidatePath } from "next/cache";

const menuItems = ["Meet", "Host Events", "Host Venues"];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const currentPath = usePathname();
  
  const router = useRouter();
  
  useEffect(() => {
    if (currentPath !== "/host/event" && currentPath !== "/venues") {
      localStorage.clear();
    }
    const fetchSignedInUser = async () => {
      try {
        const { data, error } = await supabaseAuth.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data && data.user) {
          return data.user.id;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    const fetchUserData = async (id) => {
      try {
        const { data, error } = await supabaseAuth
        .from("users")
        .select()
        .eq("auth_id", id);
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setSignedInUser(data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchSignedInUser().then((res) => {
      fetchUserData(res);
    });
  }, [signedInUser]);
  
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
        <NavProfileSection />
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
