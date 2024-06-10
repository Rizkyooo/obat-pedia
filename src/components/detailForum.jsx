import { Avatar } from "@nextui-org/react";
import { MessageCircleMore, UserCircle } from "lucide-react";
import Komentar from "./komentar";
import KomentarItem from "./komentarItem";
import { formatDistanceToNow } from 'date-fns';

import { id  } from 'date-fns/locale';
export default function DetailForum({ image, judul, deskripsi, penulis, jml_komentar, date }) {

  return (
    <> 
    <div className="flex flex-col p-4 gap-4 bg-white rounded-lg w-full justify-start items-start h-full shadow-sm">
      <div className="flex items-center gap-2 justify-center ">
        <Avatar
        icon = {<UserCircle/>}
          className=" w-10 sm:mt-6 h-auto"
          src={image}
        />
        <div className="flex flex-col justify-center items-start ">
          <p className="text-xs ">{penulis}</p>
          <p className="text-[0.6rem] font-semibold opacity-75">
            {date}
          </p>
        </div>
      </div>

      <div className="w-full ">
        <p className="text-sm  sm:text-lg font-semibold mb-2 sm:mb-0">{judul}</p>
        <p className="sm:block text-sm mb-1">{deskripsi}
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-1 mt-6">
            <MessageCircleMore
              className="text-slate-600 opacity-75"
              size={15}
            />
            <p className="text-xs opacity-75">{jml_komentar}</p>
          </div>
        </div>
      </div>
    </div>
    <Komentar></Komentar>
    <h3 className="text-md sm:text-lg font-semibold">Komentar</h3>
    <KomentarItem/>
    <KomentarItem/>
    <KomentarItem/>
    <KomentarItem/>
    <KomentarItem/>

    </>
  );
}
