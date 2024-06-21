"use client";
import { useSearchParams } from "next/navigation";
import ListUser from "./components/listUser";
import { useEffect, useState } from "react";
import Chat from "./components/chat";
import { getUser } from "@/libs/actions";

export default function page() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Is Mobile:", isMobile);
  }, [isMobile]);

  const params = useSearchParams();
  const id_receiver = params.get("id");
  console.log(params.get("id"));

  const[user, setUser] = useState()
  useEffect(() => {
    async function getUsers() {
      const user = await getUser();
      console.log(user);
      setUser(user);
    }

    getUsers();
  },[]);
  

  if (isMobile) {
    return (
      <div className=" sm:flex  maxS-h-screen gap-1">
        {!id_receiver ? (
          <div className="shadow-md bg-white">
            <ListUser />
          </div>
        ) : (
          <div className="sm:w-3/4 shadow-md bg-white">
            <Chat id={id_receiver} userId={user?.id}/>
          </div>
        )}
      </div>
    );
  }
  if(!isMobile){
      return (
        <div className=" sm:flex  maxS-h-screen gap-1">

            <div className="shadow-md h-screen bg-white">
              <ListUser />
            </div>
            <div className="sm:w-3/4 shadow-md bg-white">
              {id_receiver ? (
                
                <Chat id={id_receiver} userId={user?.id}/>
              ): (
                <div className="h-screen flex justify-center items-center">Silahkan klik salah satu pesan</div>
              )}

            </div>
        </div>
      );
  }
}
