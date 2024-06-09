import { Avatar } from "@nextui-org/react";
import { MessageCircleMore } from "lucide-react";
import Komentar from "./komentar";
import KomentarItem from "./komentarItem";
export default function DetailForum({ image, judul, deskripsi, penulis }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };
  return (
    <> 
    <div className="flex flex-col p-4 gap-4 bg-white rounded-lg w-full justify-start items-start h-full shadow-sm">
      <div className="flex items-center gap-2 justify-center ">
        <Avatar
          className=" w-10 sm:mt-6 h-auto sm:w-16"
          src="/images/obat-icon.svg"
        />
        <div className="flex flex-col justify-center items-start ">
          <p className="text-xs ">jhon Doe</p>
          <p className="text-[0.6rem] font-semibold opacity-75">
            1 menit yg lalu
          </p>{" "}
        </div>
      </div>

      <div className="w-full">
        <p className="text-sm  sm:text-lg font-semibold mb-2 sm:mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos praesentium eius nulla maxime debitis quae ali?</p>
        <p className="sm:block text-sm mb-1">            "Lorem ipsum dolor sit amet consectetur adipisicingsss elit. Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem. gsss elit. Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem.  Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem."
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-1 mt-6">
            <MessageCircleMore
              className="text-slate-600 opacity-75"
              size={15}
            />
            <p className="text-xs opacity-75">1,000 Komentar</p>
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
