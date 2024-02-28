"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CongregateLogo } from "./CongregateLogo";
import { usePathname, useRouter } from "next/navigation";
import NavLinks from "./NavLinks";
import NavProfileSection from "./NavProfileSection";
import toast, { Toaster } from "react-hot-toast";

const menuItems = [
  {
    itemName: "Meet",
    href: "/meet"
  },
  {
    itemName: "Host Events",
    href: "/host/event",
  },
  {
    itemName: "Host Venues",
    href: "/host/venue",
  },
];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const currentPath = usePathname();
  const router = useRouter();

  const notify = () => toast("Here is your toast.");

  useEffect(() => {
    if (currentPath !== "/host/event" && currentPath !== "/venues") {
      localStorage.clear();
    }
  }, []);

  return (
    <div>
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
          <NavLinks rotation={rotation} setRotation={setRotation} />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavProfileSection />
        </NavbarContent>
        <NavbarMenu className="scrollbar-hide">
          {menuItems.map((item, i) => (
            <NavbarMenuItem key={`${i} - ${item} - MobileMenu`} className="scrollbar-hide">
              <Link
                color="foreground"
                className="rounded-full w-[9rem] bg-white/40 px-5 py-3 hover:bg-white/70 transition-all duration-300"
                href={item.href}
                size="lg"
              >
                {item.itemName}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};
