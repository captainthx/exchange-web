"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/AcmeLogo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const mainMenu = [
    {
      name: "market",
      path: "/market",
    },
    {
      name: "buy crypto",
      path: "/market/buyCrypto",
    },
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">HOME</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        {mainMenu.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathName === item.path}
          >
            <Link
              color={pathName === item.path ? "foreground" : "primary"}
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {status === "authenticated" ? (
          <NavbarItem className="hidden lg:flex">
            <TbLogout onClick={() => signOut()} />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
        {status === "authenticated" ? (
          <NavbarItem>
            <Link href="/profile">Profile</Link>
          </NavbarItem>
        ) : (
          ""
        )}
      </NavbarContent>
    </Navbar>
  );
}
