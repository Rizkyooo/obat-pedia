'use client'
import DetailForum from "@/components/detailForum"
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
export default function page({ searchParams }) {
  const forumId = searchParams.id
  console.log(forumId)

  const [forum, setForum] = useState();
  const [date , setDate] = useState();
    const timeAgos = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: localeID })
  };
// console.log(timeAgos(new Date('2024-06-10T17:35:52.935299+00:00')))
  useEffect(() => {
    async function fetchForum() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("diskusi")
          .select("*")
          .eq("id", forumId)
          .single();
        if (error) {
          console.log(error);
        }
        if (data) {
          const date = formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: localeID })
          console.log(date);
          setDate(date);
          setForum(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (forumId) {
      fetchForum();
    }
  }, [forumId]);
  return (
    <main className="min-h-screen">
        <div className="flex flex-col gap-2">
        <DetailForum id={forum?.id} date={date} jml_komentar={forum?.jml_komentar} penulis={forum?.penulis} judul={forum?.judul} deskripsi={forum?.deskripsi} image={"/images/obat-icon.svg"}/>
        </div>

    </main>
  )
}
