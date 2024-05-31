'use client'
import { logOut } from "@/libs/actions";
import { LogOutIcon } from "lucide-react";
export default function NavApoteker() {
    const handleLogout = () => {
        logOut();
      };
  return (
    <nav className="w-full h-14 bg-white flex justify-end items-center ">
        <div className="flex justify-center items-center p-3 rounded-full bg-slate-200 mr-4">
        <LogOutIcon size={20} className=" cursor-pointer hover:scale-125 transition-all" onClick={handleLogout}/>
        </div>
        {/* <Button color="danger" className="mr-4" onClick={handleLogout}>Logout</Button> */}
        </nav>
  )
}
