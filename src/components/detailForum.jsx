import { Avatar } from "@nextui-org/react"
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
export default function DetailForum({image, judul, deskripsi, penulis }) {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + " ...";
        }
        return text;
    }
  return (
    <div className="flex p-2 gap-4 bg-white rounded-lg w-full justify-start items-center sm:items-start h-full shadow-sm">
        <Avatar className=" w-14 sm:mt-6 h-auto sm:w-16" src="/images/obat-icon.svg"/>
        <div className="w-full py-4">
            <p className="text-sm sm:text-lg font-semibold mb-1 sm:mb-0">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicingsss elit. Quisquam, quidem.", 50)}</p>
            <p className="sm:block text-sm mb-1 hidden">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicingsss elit. Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem. gsss elit. Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem.  Quisquam, quidem. r adipisicingsss elit. Quisquam, quidem.", 200)}</p>
            <p className="text-xs mb-4">jhon Doe</p>
            <div className="flex justify-between ">
                <div className="flex gap-1 ">
                <MessageCircleMore className="text-slate-600 opacity-75" size={15}/>
                <p className="text-xs opacity-75">1,000</p>
                </div>
            <p  href={"#"} className="text-[0.6rem] font-semibold opacity-75 px-2">1 menit yg lalu</p>
            </div>
        </div>
    </div>
  )
}
