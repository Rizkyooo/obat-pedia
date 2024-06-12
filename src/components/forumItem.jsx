"use client";
import { Button, User } from "@nextui-org/react";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";

export default function ForumItem({ searchQuery, searchByKategori, radioKategori }) {
  const [forum, setForum] = useState([]);
  const [loadMore, setLoadMore] = useState(14);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchForum(limit, searchQuery = "", searchByKategori = "", radioKategori="") {
    setIsLoading(true);
    const user =  await getUser()
    const role = user?.user_metadata?.role || 'pengguna'
    const userIdField = role === 'apoteker' ? 'id_apoteker' : 'id_pengguna';
    const supabase = createClient();
    try {
      let supabaseQuery = supabase
        .from("diskusi")
        .select(`id, created_at, judul, deskripsi, penulis, kategori, jml_komentar, ${userIdField}(picture, nama, role)`)
        .order("created_at", { ascending: false })
        .range(0, limit);

      if (searchQuery) {
        supabaseQuery = supabaseQuery.ilike("judul", `%${searchQuery}%`);
      }

      if (searchByKategori) {
        supabaseQuery = supabaseQuery.ilike("kategori", `%${searchByKategori}%`);
      }
      if (radioKategori) {
        supabaseQuery = supabaseQuery.ilike("kategori", `%${radioKategori}%`);
      }

      let { data, error } = await supabaseQuery;

      if (error) {
        console.error(error);
      }

      if (data) {
        console.log(data);
        setForum(data);
        setIsLoading(false);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchForum(loadMore, searchQuery, searchByKategori, radioKategori);
  }, [searchQuery, searchByKategori, radioKategori]);

  const TimeAgo = ({ date }) => {
    return (
      <span>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: localeID,
        })}
      </span>
    );
  };

  const handleMore = () => {
    setLoadMore(loadMore + 14);
    fetchForum(loadMore + 14);
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + " ...";
    }
    return text;
  };

  return (
    <>
    {forum.length>0 ? (
      <>
        {forum?.map((forum) => {
        const encodedTitle = encodeURIComponent(forum?.judul).toLowerCase();
        return (
          <Link
            key={forum?.id}
            href={`/forum-kesehatan/${encodedTitle}?id=${forum?.id}`}
            className="flex p-4 flex-col gap-2 bg-white rounded-lg justify-start items-start sm:items-start shadow-sm w-full"
          >
            <User
              name={forum?.id_pengguna?.nama || forum?.id_apoteker?.nama}
              description= {`${forum?.id_pengguna !==null ? 'pengguna':'apoteker'}`}
              avatarProps={{
                src: `${forum?.id_pengguna?.picture || forum?.id_apoteker?.picture || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='}`,
                size: "sm",
              }}
            />
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm sm:text-lg font-semibold sm:mb-0">
                {truncateText(forum?.judul, 50)}
              </p>
              <p className="sm:block text-sm mb-1 hidden">
                {truncateText(forum?.deskripsi, 200)}
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex gap-1 ">
                  <MessageCircleMore
                    className="text-slate-600 opacity-75"
                    size={15}
                  />
                  <p className="text-xs opacity-75">{forum?.jml_komentar}</p>
                </div>
                <p className="text-[0.65rem] font-semibold opacity-55 px-2">
                  <TimeAgo date={forum?.created_at} />
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <Button
        isLoading={isLoading}
        onPress={handleMore}
        size="sm"
        className="mt-4"
        color="danger"
        variant="ghost"
      >
        Load More
      </Button>
      </>
    ): (<div className="flex min-h-screen justify-center items-center pb-48 sm:pb-0">Ooppss Data tidak ditemukan</div>)}
      
    </>
  );
}
