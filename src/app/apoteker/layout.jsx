import SideBarApoteker from "@/components/sideBarApoteker"
import { SidebarItem } from "@/components/sideBarApoteker"
import BottomNavApoteker from "./components/bottomNavApoteker"
import { NewspaperIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon } from '@heroicons/react/24/outline'
import SetOnline from "./components/SetOnline"
import { getUser } from "@/libs/actions"

export default async function Layout({children}) {
  const user = await getUser();
  return (
    <>
      <div className="sm:flex min-h-screen ">
        <SetOnline userId={user?.id} role={user?.user_metadata?.role}/>
        <SideBarApoteker>
          <SidebarItem icon={<BeakerIcon className="h-6 text-slate-800"/>} link={"/apoteker/obat-a-z"} text="Obat A-Z" href={"/apoteker/obat-a-z"}/>
          <SidebarItem icon={<NewspaperIcon className="h-6 text-slate-800"/>} link={"/apoteker/buat-artikel"} text="Artikel" href={"/apoteker/buat-artikel"}/>
          <SidebarItem icon={<ChatBubbleLeftEllipsisIcon className="h-6 text-slate-800"/>} link={"/apoteker/chat"} text="Chat" href={"/apoteker/chat"}/>
          <SidebarItem icon={<UserGroupIcon className="h-6 text-slate-800"/>} text="Forum" link={"/apoteker/forum-kesehatan"} href={"/apoteker/forum-kesehatan"}/>
        </SideBarApoteker>
        <div className="w-full">
          {children}
        </div>
      </div>
      <BottomNavApoteker/>
    </>
  )
}
