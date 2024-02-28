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

const menuItems = ["Meet", "Host Events", "Host Venues"];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [renderNavbar, setRenderNavbar] = useState(true);

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
          <div className="scale-75 md:scale-100">
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
    </div>
  );
};
