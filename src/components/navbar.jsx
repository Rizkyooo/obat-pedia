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
        <Navbar className="bg-[#92C0FF]" isBlurred={false} maxWidth="xl" >
          <Link href="/" className=" h-14 flex items-center justify-center cursor-pointer" >
            <img className="hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform" src="/images/medisigna.png" alt="logo" width={180} height={180} />
          </Link>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive={pathName === "/"}>
              <Link
                className={`${
                  pathName === "/" ? "text-blue-900" : "text-blue-800 "
                } hover:scale-[1.13] hover:text hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
              <DropdownTrigger>
        <p className="capitalize cursor-pointer text-blue-800" >
          Layanan kami
        </p>
      </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Variants" color="primary" variant="light">
        <DropdownItem href="/obat-a-z" key="new">Obat A-Z</DropdownItem>
        <DropdownItem href="/tanya-apoteker" key="copy">Tanya Apoteker</DropdownItem>
        <DropdownItem href="/forum-kesehatan" key="edit">Forum Kesehatan</DropdownItem>
        <DropdownItem href="/home-care" key="delete" >
          Home Care
        </DropdownItem>
        </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem isActive={pathName.includes("/obat-a-z")}>
              <Link
                className={`${
                  pathName.includes("/obat-a-z") ? "text-blue-900" : "text-blue-800"
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/obat-a-z"
              >
                Tentang Kami
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.includes("/tanya-apoteker")}>
              <Link
                className={`${
                  pathName.includes("/tanya-apoteker") ? "text-blue-900" : "text-blue-800 "
                } hover:text hover:scale-[1.13] hover:duration-100 hover:transition-transform transition-transform`}
                color="foreground"
                href="/tanya-apoteker"
              >
                Kontak Kami
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
