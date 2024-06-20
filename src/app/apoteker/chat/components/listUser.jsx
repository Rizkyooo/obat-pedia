"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ListApoteker from "./listApoteker";
import { createClient } from "@/utils/supabase/client";

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

  const [apoteker, setApoteker] = useState([]);

    useEffect(() => {
        async function getApoteker() {
            const supabase = createClient();
            const { data, error } = await supabase
              .from("apoteker")
              .select("*")
              .order("id", { ascending: true });
            if (error) {
              throw new Error(error.message);
            }
            setApoteker(data);
            return data;
        }
        getApoteker();
    },[])
    console.log(apoteker)
    
    // Conditional rendering based on path and screen size
    const isChatPath = pathname === "/apoteker/chat";

  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker apoteker={apoteker}/>;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker apoteker={apoteker} />;
  }
  return null;
}

