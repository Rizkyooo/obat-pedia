'use client';
import ForumItem from "@/components/forumItem";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function Forum(){
  const [forum, setForum] = useState([]);

  async function fetchForum() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("diskusi")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error);
      }
      if(data){
        setForum(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchForum();
  }, [])

    return (
      <main className="min-h-screen bg-gray-100">
          <div className=" flex flex-col justify-center items-center gap-2">
            {forum?.map((forum) => (
            <ForumItem key={forum?.id} date={forum?.created_at} jml_komentar={forum?.jml_komentar} penulis={forum?.penulis} judul={forum?.judul} deskripsi={forum?.deskripsi} image={"/images/obat-icon.svg"}/>
              ))}
            <Button size="sm" className="mt-4" color="danger" variant="ghost">
              Load More
            </Button>
          </div>
      </main>
    );
}
