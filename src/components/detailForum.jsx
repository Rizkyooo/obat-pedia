import { Avatar, Chip, User } from "@nextui-org/react";
import { MessageCircleMore, UserCircle } from "lucide-react";
import Komentar from "./komentar";
import KomentarItem from "./komentarItem";
export default function DetailForum({
  image,
  role,
  judul,
  deskripsi,
  penulis,
  jml_komentar,
  date,
  kategori,
}) {
  return (
    <>
      <div className="flex flex-col p-4 gap-4 bg-white rounded-lg w-full justify-start items-start h-full shadow-sm">
        <div className="flex items-center gap-2 justify-center w-full">
          <div className="w-full flex justify-between ">
            <User
              name={penulis}
              description={role}
              avatarProps={{
                src: image,
                size: "sm",
              }}
            />
            <Chip size="sm" color="default">{kategori}</Chip>
          </div>
        </div>

        <div className="w-full ">
          <p className="text-sm  sm:text-lg font-semibold mb-2 sm:mb-0">
            {judul}
          </p>
          <p className="sm:block text-sm mb-1">{deskripsi}</p>
          <div className="flex justify-between mt-6">
            <p className="text-[0.6rem] sm:text-xs font-semibold opacity-65">
              {date}
            </p>
            <div className="flex gap-1">
              <MessageCircleMore
                className="text-slate-600 opacity-75"
                size={15}
              />
              <p className="text-xs opacity-75">{jml_komentar} Komentar</p>
            </div>
          </div>
        </div>
      </div>
      <Komentar></Komentar>
      <h3 className="text-md sm:text-lg font-semibold">Komentar</h3>
      <KomentarItem />
      <KomentarItem />
      <KomentarItem />
      <KomentarItem />
      <KomentarItem />
    </>
  );
}
