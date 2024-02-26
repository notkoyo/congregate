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
import NavLinks from "./NavLinks";
import NavProfileSection from "./NavProfileSection";

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
  }, []);
  
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
        <NavLinks />
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
