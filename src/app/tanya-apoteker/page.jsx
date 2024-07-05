import ApotekerItem from "./components/apotekerItem"
import { getApoteker } from "@/services/getApoteker"
import { getUser } from "@/libs/actions"

export default async function TanyaApoteker(){
    const [apoteker, user] = await Promise.all([getApoteker(), getUser()])
    return(
        <main className="min-h-screen mx-auto ">
            <div className="pt-4  w-full pb-6 px-6">
            <h3 className="font-bold text-md mb-2">Tanya Apoteker</h3>
            <p className="text-sm font-medium">Punya pertanyaan seputar obat?</p>
            <p className="text-sm font-medium">Yuk konsultasi langsung dengan Apoteker Berpengalaman</p>
            </div>
            <ApotekerItem apoteker={apoteker} user={user}/>
        </main>
    )
}