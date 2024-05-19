"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { logOut } from "@/app/auth/actions";
import { userStore } from "@/store/user";
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js"; 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function Header({user}) {
  const [user1, setUser] = useState([]);

  const fetchObatData = async () => {
    let supabaseQuery = supabase
      .from("users")
      .select("*")


    let { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setUser(data);
    }
  };

  useEffect(() => {
    fetchObatData();
  }, []);
  
  console.log(user1)
  console.log(window.location.origin)
  const pathName = usePathname();
  return (
    <Navbar isBlurred={false} maxWidth="xl" isBordered>
      <NavbarBrand>
        <p className="text-[#EE0037] font-bold text-inherit">ObatPedia</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathName === "/"}>
          <Link
            className={`${
              pathName === "/" ? "text-[#EE0037]" : " "
            } hover:scale-[1.13] hover:text-[#EE0037] hover:duration-100 hover:transition-transform transition-transform`}
            color="foreground"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/obat-a-z"}>
          <Link
            className={`${
              pathName === "/obat-a-z" ? "text-[#EE0037]" : " "
            } hover:text-[#EE0037] hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
            color="foreground"
            href="/obat-a-z"
          >
            Obat A-Z
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/tanya-apoteker"}>
          <Link
            className={`${
              pathName === "/tanya-apoteker" ? "text-[#EE0037]" : " "
            } hover:text-[#EE0037] hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
            color="foreground"
            href="/tanya-apoteker"
          >
            Tanya Apoteker
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/forum-kesehatan"}>
          <Link
            className={`${
              pathName === "/forum-kesehatan" ? "text-[#EE0037]" : " "
            } hover:text-[#EE0037] hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
            color="foreground"
            href="/forum-kesehatan"
          >
            Forum Kesehatan
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/artikel"}>
          <Link
            className={`${
              pathName === "/artikel" ? "text-[#EE0037]" : " "
            } hover:text-[#EE0037] hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
            color="foreground"
            href="/artikel"
          >
            Artikel
          </Link>
        </NavbarItem>
      </NavbarContent>
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
                    color="danger"
                    src="https://i.pravatar.cc/300"
                  />
                  <div className="sm:flex flex-col hidden">
                    <p className="text-xs font-medium">
                      {user.name || "handole"}
                    </p>
                    <p className="text-[0.7rem]">{user.email}</p>
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="a">
                <DropdownItem className=" pl-3" href="/profil" key="profil">
                  Profile
                </DropdownItem>
                <DropdownItem href="/login" key="logout">
                  <Button
                  onClick={() => {
                    location.reload();
                    logOut();
                  }}
                    size="sm"
                    className="bg-[#EE0037] text-white"
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
              className="bg-[#EE0037] text-white"
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
