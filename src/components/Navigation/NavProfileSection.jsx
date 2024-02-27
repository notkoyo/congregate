"use client";

import { supabaseAuth } from "@/utils/supabaseClient";
import {
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Link,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLogin } from "../loginContext";
import { fetchUserData } from "@/utils/api";

export default function NavProfileSection() {
  const [signedInUser, setSignedInUser] = useState(null);

  const { isLoggedIn, setIsLoggedIn } = useLogin();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabaseAuth.auth.getSession();
      if (session) {
        const userData = await fetchUserData(session.user.id);
        setSignedInUser(userData);
      } else {
        setSignedInUser(null);
      }
    };

    getSession();
  }, [isLoggedIn]);

  return (
    <NavbarItem key={signedInUser ? signedInUser.id : null}>
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
            src={signedInUser ? signedInUser.avatar_url : "#"}
          />
        </DropdownTrigger>
        {signedInUser ? (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              textValue="is signed in?"
              key="details"
              className="h-14 gap-2"
            >
              <p className="font-semibold">Hello, {signedInUser.given_names}</p>
              <p className="font-semibold text-white/35">
                {signedInUser ? signedInUser.email : "Not signed in"}
              </p>
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
              showDivider
              as={Link}
              href="/profile/settings"
              className="text-white"
              key="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem>
              <Link
                as={Button}
                fullWidth
                href="/"
                onClick={() => {
                  supabaseAuth.auth.signOut();
                  setIsLoggedIn(false);
                  setSignedInUser(null);
                }}
                className="bg-red-500 bg-opacity-90 text-center text-white hover:bg-red-600"
                key="logout"
                color="danger"
              >
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        ) : (
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
        )}
      </Dropdown>
    </NavbarItem>
  );
}
