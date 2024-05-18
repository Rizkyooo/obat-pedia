'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon, UserIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid , UserGroupIcon as UserGroupIconSolid, ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid, BeakerIcon as BeakerIconSolid, UserIcon as UserIconSolid} from '@heroicons/react/24/solid'
export default function BottomNav(){
    const pathName = usePathname()
    return(
         <nav className="fixed bottom-0 left-0 w-full bg-slate-50 z-50 h-16 flex items-center justify-between  px-6 py-4 sm:hidden">
            <Link className="" href={"/"}>
                <div className="flex flex-col justify-center items-center "> {pathName === '/' ? (<HomeIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <HomeIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Beranda</h5>
                </div>
            </Link>

            <Link className="" href={"/obat-a-z"}>
            <div className="flex flex-col justify-center items-center "> {pathName === ('/obat-a-z' || '/obat-a-z/[obatId]') ? (<BeakerIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <BeakerIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/obat-a-z' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Obat A-Z</h5>
                </div>
            </Link>

            <Link className="" href={"/tanya-apoteker"}>
            <div className="flex flex-col justify-center items-center "> {pathName === '/tanya-apoteker' ? (<ChatBubbleLeftEllipsisIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <ChatBubbleLeftEllipsisIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/tanya-apoteker' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Tanya Apoteker</h5>
                </div>
            </Link>

            <Link className="" href={"/forum-kesehatan"}>
            <div className="flex flex-col justify-center items-center "> {pathName === '/forum-kesehatan' ? (<UserGroupIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <UserGroupIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/forum-kesehatan' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Forum</h5>
                </div>
            </Link>

            <Link className="" href={"/profil"}>
            <div className="flex flex-col justify-center items-center "> {pathName === '/profil' ? (<UserIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <UserIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/profil' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Profil</h5>
                </div>
            </Link>
         </nav>
    )
}