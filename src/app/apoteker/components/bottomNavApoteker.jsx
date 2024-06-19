'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NewspaperIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon, UserIcon } from '@heroicons/react/24/outline'
import { NewspaperIcon as NewspaperIconSolid , UserGroupIcon as UserGroupIconSolid, ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid, BeakerIcon as BeakerIconSolid, UserIcon as UserIconSolid} from '@heroicons/react/24/solid'
export default function BottomNavApoteker(){
    const pathName = usePathname()
    const header = ["/admin", "/login", "/signup"];
  const showHeader = header.some(path => pathName.includes(path));
    return(
        <>
        {!showHeader && 
         <nav className="fixed bottom-0 left-0 w-full bg-slate-50 z-50 h-16 flex items-center justify-between  px-6 py-4 sm:hidden">

            <Link className="" href={"/apoteker/obat-a-z"}>
            <div className="flex flex-col justify-center items-center "> {pathName.includes('/apoteker/obat-a-z') ? (<BeakerIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <BeakerIcon className="h-6 text-slate-600" title="Obat-a-z"/>}
                <h5 className={`text-[0.60rem] ${pathName.includes('/apoteker/obat-a-z') ? ("text-[#EE0037]") : ("text-slate-600")} `}>Obat A-Z</h5>
                </div>
            </Link>

            <Link className="" href={"/apoteker/buat-artikel"}>
                <div className="flex flex-col justify-center items-center "> {pathName === '/apoteker/buat-artikel' ? (<NewspaperIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <NewspaperIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName === '/apoteker/buat-artikel' ? ("text-[#EE0037]") : ("text-slate-600")} `}>Artikel</h5>
                </div>
            </Link>

            <Link className="" href={"/apoteker/chat"}>
            <div className="flex flex-col justify-center items-center "> {pathName.includes('/apoteker/chat') ? (<ChatBubbleLeftEllipsisIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <ChatBubbleLeftEllipsisIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName.includes('/apoteker/chat') ? ("text-[#EE0037]") : ("text-slate-600")} `}>Pesan</h5>
                </div>
            </Link>

            <Link className="" href={"/apoteker/forum-kesehatan"}>
            <div className="flex flex-col justify-center items-center "> {pathName.includes('/apoteker/forum-kesehatan') ? (<UserGroupIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <UserGroupIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName.includes('/apoteker/forum-kesehatan') ? ("text-[#EE0037]") : ("text-slate-600")} `}>Forum</h5>
                </div>
            </Link>

            <Link className="" href={"/apoteker/profil"}>
            <div className="flex flex-col justify-center items-center "> {pathName.includes('/apoteker/profil') ? (<UserIconSolid className="h-6 text-[#EE0037]" title="Home"/>) : <UserIcon className="h-6 text-slate-600" title="Home"/>}
                <h5 className={`text-[0.60rem] ${pathName.includes('/apoteker/profil') ? ("text-[#EE0037]") : ("text-slate-600")} `}>Profil</h5>
                </div>
            </Link>
         </nav>
        }
        </>
    )
}