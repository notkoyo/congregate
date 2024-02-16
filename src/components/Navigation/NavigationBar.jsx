import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { CongregateLogo } from "./CongregateLogo";

const navbarItems = ["Meet", "Events"];

export const NavigationBar = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <CongregateLogo />
        <p className="font-bold font-pally text-inherit">Congregate</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navbarItems.map((item, i) => (
          <NavbarItem key={i}>
            <Link color="foreground" href="#">
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
