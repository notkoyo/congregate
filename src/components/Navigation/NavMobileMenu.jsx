import { NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react"

export default function MobileMenu() {
  const menuItems = ["Meet", "Host Events", "Host Venues"];

  return (
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
  )
}