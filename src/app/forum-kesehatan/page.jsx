'use client';
import ForumItem from "@/components/forumItem";
import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Forum(){
  const [forum, setForum] = useState([]);
  const [loadMore , setLoadMore] = useState(14);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null)

  async function fetchForum(limit) {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("diskusi")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, limit);
      if (error) {
        console.log(error);
      }
      if(data){
        setForum(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUsers(){
      const user = await getUser()
      setUser(user)
    }
    getUsers();
    fetchForum(loadMore);
    
  }, [])

  const handleMore = () => {
    setLoadMore(loadMore + 14);
    fetchForum(loadMore+14);
  };

    return (
    <main className="">
      <div className="min-h-screen flex gap-2">
      <ForumKategori checkUser={user}/>
          <div className=" flex flex-col justify-center items-center gap-2 sm:w-4/6">
            {forum?.map((forum) => (
            <ForumItem id={forum?.id} key={forum?.id} date={forum?.created_at} jml_komentar={forum?.jml_komentar} penulis={forum?.penulis} judul={forum?.judul} deskripsi={forum?.deskripsi} image={"/images/obat-icon.svg"}/>
              ))}
            <Button isLoading={isLoading} onPress={handleMore} size="sm" className="mt-4" color="danger" variant="ghost">
              Load More
            </Button>
          </div>
      </div>
    </main>
    );
}
