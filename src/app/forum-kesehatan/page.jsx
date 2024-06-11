import ForumItem from "@/components/forumItem";
import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
// import { useEffect, useState } from "react";

export default async function Forum(){
  const user  = await getUser();
  // const [forum, setForum] = useState([]);
  // const [loadMore , setLoadMore] = useState(14);
  // const [isLoading, setIsLoading] = useState(false);
  // const [user, setUser] = useState(null)

  // async function fetchForum(limit) {
  //   setIsLoading(true);
  //   const supabase = createClient();
  //   try {
  //     const { data, error } = await supabase
  //       .from("diskusi")
  //       .select("*")
  //       .order("created_at", { ascending: false })
  //       .range(0, limit);
  //     if (error) {
  //       console.log(error);
  //     }
  //     if(data){
  //       setForum(data);
  //       setIsLoading(false);
  //       return data
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   async function getUsers(){
  //     const user = await getUser()
  //     setUser(user)
  //   }
  //   getUsers();
  //   fetchForum(loadMore);
    
  // }, [])

  // const handleMore = () => {
  //   setLoadMore(loadMore + 14);
  //   fetchForum(loadMore+14);
  // };

    return (
    <main className="">
      <div className="min-h-screen sm:flex gap-2">
      <ForumKategori checkUser={user}/>
          <div className=" flex flex-col justify-center items-center gap-2 sm:w-4/6">
            <ForumItem />
          </div>
      </div>
    </main>
    );
}
