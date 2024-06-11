import ForumItem from "@/components/forumItem";
import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
// import { useEffect, useState } from "react";

export default async function Forum(){
  const user  = await getUser();

    return (
    <main className="">
      <div className="min-h-screen sm:flex gap-2">
      <ForumKategori checkUser={user}/>
          {/* <div className=" flex flex-col justify-center items-center gap-2 sm:w-4/6">
          </div> */}
      </div>
    </main>
    );
}
