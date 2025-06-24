'use client'
import { Button, User } from "@heroui/react";
import Link from "next/link";
import { BadgeCheck, MessageCircleMore } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { usePathname } from "next/navigation";

export  default function ForumItem({
  handleMore,
  forum,
  isLoading
}) {
  
  const pathName = usePathname();
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
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + " ...";
    }
    return text;
  };

  // Show not found if forum is empty or not an array
  if (!forum || forum.length === 0) {
    return (
      <div className="flex min-h-screen justify-center items-center pb-48 sm:pb-0 w-full">
        <div className="text-gray-500 text-center">Ooppss, Data tidak ditemukan</div>
      </div>
    );
  }

  return (
    <>
      {forum.map((forum) => {
        const encodedTitle = encodeURIComponent(forum?.judul).toLowerCase();
        return (
          <Link
            key={forum?.id}
            href={!pathName.includes('/apoteker')?`/forum-kesehatan/${encodedTitle}?id=${forum?.id}`: `/apoteker/forum-kesehatan/${encodedTitle}?id=${forum?.id}`}
            className="flex p-4 flex-col gap-2 bg-white rounded-lg justify-start items-start sm:items-start shadow-sm w-full"
          >
            <div className="w-full flex justify-between">
              <User
                name={forum?.id_pengguna?.nama || forum?.id_apoteker?.nama}  
                description={
                  forum?.id_apoteker?.role==="apoteker"? (<span className="flex gap-1">Apoteker <BadgeCheck color="#0766AD" size={15}/></span>)  :
                  forum?.id_pengguna?.role ||
                  forum?.id_apoteker?.role ||
                  "pengguna"
                }
                avatarProps={{
                  src: `${
                    forum?.id_pengguna?.picture ||
                    forum?.id_apoteker?.picture ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }`,
                  size: "sm",
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm sm:text-lg font-semibold sm:mb-0">
                {truncateText(forum?.judul, 50)}
              </p>
              <p className="sm:block text-sm mb-1 hidden">
                {truncateText(forum?.deskripsi, 200)}
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex gap-1 justify-center items-center">
                    <MessageCircleMore
                      className="text-slate-600 opacity-75"
                      size={15}
                    />
                    <p className="text-xs opacity-75">
                      {forum?.jml_komentar} komentar
                    </p>
                  </div>
                  <p className="text-[0.65rem] font-semibold opacity-55 ">
                  <TimeAgo date={forum?.created_at} />
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      {/* Hide Load More if no data */}
      {forum.length > 0 && (
        <Button
          isLoading={isLoading}
          onPress={handleMore}
          size="sm"
          className="mt-4"
          color="primary"
          variant="ghost"
        >
          Load More
        </Button>
      )}
    </>
  );
}
