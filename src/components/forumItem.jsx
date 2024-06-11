"use client";
import { Button, User } from "@nextui-org/react";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForumItem({ searchQuery, searchByKategori }) {
  const [forum, setForum] = useState([]);
  const [loadMore, setLoadMore] = useState(14);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchForum(limit, searchQuery = "", searchByKategori = "") {
    setIsLoading(true);
    const supabase = createClient();
    try {
      let supabaseQuery = supabase
        .from("diskusi")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, limit);

      if (searchQuery) {
        supabaseQuery = supabaseQuery.ilike("judul", `%${searchQuery}%`);
      }

      if (searchByKategori) {
        supabaseQuery = supabaseQuery.ilike("kategori", `%${searchByKategori}%`);
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
    fetchForum(loadMore, searchQuery, searchByKategori);
  }, [searchQuery, searchByKategori]);

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
      {forum?.map((forum) => {
        const encodedTitle = encodeURIComponent(forum?.judul).toLowerCase();
        return (
          <Link
            key={forum?.id}
            href={`/forum-kesehatan/${encodedTitle}?id=${forum?.id}`}
            className="flex p-4 flex-col gap-2 bg-white rounded-lg justify-start items-start sm:items-start shadow-sm w-full"
          >
            <User
              name={forum?.penulis}
              description="pengguna"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
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
  );
}
