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

export default function NavProfileSection({ signedInUser }) {
  const [user, setUser] = useState(signedInUser);

  useEffect(() => {
    setUser(signedInUser);
  },[signedInUser])

  return (
    <NavbarItem>
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
            src={user ? user.avatar_url : "#"}
          />
        </DropdownTrigger>
        {user ? (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              textValue="is signed in?"
              key="details"
              className="h-14 gap-2"
            >
              <p className="font-semibold">Hello, {user.full_name}</p>
              <p className="font-semibold text-white/35">
                {user ? user.email : "Not signed in"}
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
            <DropdownItem
              className="text-white"
              key="logout"
              color="danger"
              textValue="logout button"
            >
              <form action="/auth/signout" method="post">
                <Button
                  onPress={() => setUser(null)}
                  fullWidth
                  type="submit"
                  color="danger"
                >
                  Logout
                </Button>
              </form>
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
