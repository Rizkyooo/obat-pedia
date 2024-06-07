import { Avatar } from "@nextui-org/react"
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
export default function ForumItem() {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + " ...";
        }
        return text;
    }
  return (
    <div className="flex p-2 gap-4 bg-white rounded-lg w-full justify-center items-center">
        <Avatar className="w-24 h-24" src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"/>
        <div className="my-2">
            <p className="text-sm font-semibold mb-1">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.", 40)}</p>
            <p className="text-xs mb-4">jhon Doe</p>
            <div className="flex justify-between">
                <div className="flex gap-1">
                <MessageCircleMore className="text-slate-600" size={16}/>
                <p className="text-xs">1,000</p>
                </div>
            <Link  href={"#"} className="text-xs text-[#EE0037] px-2">Selengkapnya...</Link>
            </div>
        </div>
    </div>
  )
}
