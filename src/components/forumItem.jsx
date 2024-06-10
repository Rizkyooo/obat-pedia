import { Avatar } from "@nextui-org/react"
import Link from "next/link";
import { MessageCircleMore, UserCircle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
export default function ForumItem({image, judul, deskripsi, penulis, jml_komentar, date}) {
  const TimeAgo = ({ date }) => {
    return (
      <span>{formatDistanceToNow(new Date(date), { addSuffix: true, locale: id })}</span>
    );
  };
  
    const truncateText = (text, maxLength) => {
        if (text?.length > maxLength) {
          return text?.slice(0, maxLength) + " ...";
        }
        return text;
    }
  return (
    
    <Link href={"/forum-kesehatan/1"} className="flex p-2 gap-4 bg-white rounded-lg justify-start items-center sm:items-start shadow-sm w-full">
        <Avatar  icon = {<UserCircle/>}  className=" h-8 sm:h-10  sm:mt-6  " src={image}/>

        <div className="w-full py-4">
            <p className="text-sm sm:text-lg font-semibold mb-1 sm:mb-0">{truncateText(judul, 50)}</p>
            <p className="sm:block text-sm mb-1 hidden">{truncateText(deskripsi, 200)}</p>
            <p className="text-xs mb-4">{penulis}</p>
            <div className="flex justify-between ">
                <div className="flex gap-1 ">
                <MessageCircleMore className="text-slate-600 opacity-75" size={15}/>
                <p className="text-xs opacity-75">{jml_komentar}</p>
                </div>
            <p  href={"#"} className="text-[0.65rem]  font-semibold opacity-55 px-2"><TimeAgo date={date} /></p>
            </div>
        </div>
    </Link>
  )
}
