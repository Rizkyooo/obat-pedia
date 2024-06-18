import Chat from "../components/chat"
import ProfilApoteker from "../components/profilApoteker"
export default function Page({params}) {
  return (
    <div className="flex w-full sm:w-3/4 gap-1">
        <div className="sm:w-2/3 w-full max-h-screen shadow-md bg-gray-100">
            <Chat id={params?.id}/>
        </div>
        <div className="w-1/3 hidden sm:flex shadow-md bg-white">
<ProfilApoteker apotekerId={params?.id}/>
        </div>
    </div>
  )
}
