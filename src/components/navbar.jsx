"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logOut } from "@/libs/actions";
import { UserIcon } from "lucide-react";
export default function Header(props) {
  const { user, name, avatar_url } = props;
  const handleLogout = () => {
    logOut();
  };
  const header = ["/apoteker", "/admin", "/login", "/signup"];

  const pathName = usePathname();
  const showHeader = header.some((path) => pathName.includes(path));
  return (
    <>
      {!showHeader && (
        <Navbar isBlurred={false} maxWidth="xl" isBordered>
          <Link href="/" className=" h-14 flex items-center justify-center cursor-pointer" >
            <img className="hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform" src="/images/medisigna.png" alt="logo" width={180} height={180} />
          </Link>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive={pathName === "/"}>
              <Link
                className={`${
                  pathName === "/" ? "text-blue-500" : " "
                } hover:scale-[1.13] hover:text hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.includes("/obat-a-z")}>
              <Link
                className={`${
                  pathName.includes("/obat-a-z") ? "text-blue-500" : " "
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/obat-a-z"
              >
                Obat A-Z
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.includes("/tanya-apoteker")}>
              <Link
                className={`${
                  pathName.includes("/tanya-apoteker") ? "text" : " "
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/tanya-apoteker"
              >
                Tanya Apoteker
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.includes("/forum-kesehatan")}>
              <Link
                className={`${
                  pathName.includes("/forum-kesehatan") ? "text-blue-500" : " "
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/forum-kesehatan"
              >
                Forum Kesehatan
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName === "/artikel"}>
              <Link
                className={`${
                  pathName === "/artikel" ? "text-blue-500" : " "
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
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
                        color="primary"
                        icon={<UserIcon />}
                        src={
                          avatar_url
                        }
                      />
                      <div className="sm:flex flex-col hidden">
                        <p className="text-xs font-medium">{name}</p>
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
                  radius="full"
                >
                   Masuk 
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
}
