import { Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import { MessageCircleMore, UserCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
export default function ForumItem({
  id,
  image,
  judul,
  deskripsi,
  penulis,
  jml_komentar,
  date,
}) {
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

  const encodedTitle = encodeURIComponent(judul).toLocaleLowerCase();
  return (
    <Link
      href={`/forum-kesehatan/${encodedTitle}?id=${id}`}
      className="flex p-4 flex-col gap-2 bg-white rounded-lg justify-start items-start sm:items-start shadow-sm w-full"
    >
      <User
        name={penulis}
        description="pengguna"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          size: "sm",
        }}
      />
      <div className="w-full flex flex-col gap-1">
        <p className="text-sm pl-10 sm:text-lg font-semibold sm:mb-0">
          {truncateText(judul, 50)}
        </p>
        <p className="sm:block pl-10 text-sm mb-1 hidden">
          {truncateText(deskripsi, 200)}
        </p>
        {/* <p className="text-xs mb-4">{penulis}</p> */}
        <div className="flex justify-between mt-4">
          <div className="flex gap-1 ">
            <MessageCircleMore
              className="text-slate-600 opacity-75"
              size={15}
            />
            <p className="text-xs opacity-75">{jml_komentar}</p>
          </div>
          <p
            href={"#"}
            className="text-[0.65rem]  font-semibold opacity-55 px-2"
          >
            <TimeAgo date={date} />
          </p>
        </div>
      </div>
    </Link>
  );
}
