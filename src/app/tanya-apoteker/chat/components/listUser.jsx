"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Chip, Input, User } from "@nextui-org/react";
import { Search } from "lucide-react";
import Link from "next/link";
import ListApoteker from "./listApoteker";

export default function ListUser() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on initial render and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Tailwind's sm breakpoint is 640px
    };

    // Check initial screen size
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logging for debugging purposes
  useEffect(() => {
    console.log("Current Path:", pathname);
    console.log("Is Mobile:", isMobile);
  }, [pathname, isMobile]);

  // Conditional rendering based on path and screen size
  const isChatPath = pathname === "/tanya-apoteker/chat";

  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker />;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker />;
  }
  return null;
}

