"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CongregateLogo } from "./CongregateLogo";
import { useRouter } from "next/navigation";
import { supabaseAuth } from "../../utils/supabaseClient";
import NavLinks from "./NavLinks";
import NavProfileSection from "./NavProfileSection";
import MobileMenu from "./NavMobileMenu";

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const router = useRouter();

  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
      className="bg-cyan-600 font-satoshi text-white shadow-lg"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand onClick={() => router.push("/")}>
        <div className="scale-75 cursor-default md:scale-100">
          <CongregateLogo />
        </div>
        <p className="ml-1 cursor-pointer text-lg font-bold text-inherit md:text-2xl">
          Congregate
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        <NavLinks rotation={rotation} setRotation={setRotation} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavProfileSection />
      </NavbarContent>
      <MobileMenu />
    </Navbar>
  );
};
