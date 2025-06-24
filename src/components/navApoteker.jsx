"use client";
import { logOut } from "@/libs/actions";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from "@heroui/react";
import { UserIcon } from "lucide-react";
import Link from "next/link";
export default function NavApoteker({user}) {
  
  const handleLogout = () => {
    logOut();
  };
  console.log(user)
  return (
    <Navbar isBlurred={false} maxWidth="xl" isBordered>
          <NavbarBrand>
            <p className="text-[#EE0037] font-bold text-inherit">Medisigna</p>
          </NavbarBrand>            
          <NavbarContent justify="end">
            <NavbarItem>
              {user ? (
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center justify-center  gap-3">
                      <Avatar
                        className="transition-transform"
                        as="button"
                        size="sm"
                        isBordered
                        color="primary"
                        icon={<UserIcon />}
                        src={""}
                      />
                      <div className="sm:flex flex-col hidden">
                        <p className="text-xs font-medium">{user?.user_metadata?.name}</p>
                        <p className="text-[0.7rem]">{user.email}</p>
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="a">
                    <DropdownItem className=" pl-3" key="profil">
                      <Link href="/profil"> Profile</Link>
                    </DropdownItem>
                    <DropdownItem href="/login" key="logout">
                      <Button
                        onClick={handleLogout}
                        size="sm"
                        className="bg-blue-500 text-white"
                        variant="flat"
                      >
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  size="sm"
                  className="bg-blue-500 text-white"
                  as={Link}
                  color=""
                  href="/login"
                  variant="flat"
                >
                  Login
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
  );
}
