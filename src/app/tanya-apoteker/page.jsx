import ApotekerItem from "./components/apotekerItem"
import { getUser } from "@/libs/actions"

export default async function TanyaApoteker(){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.medisigna.id';
    const [apotekerRes, user] = await Promise.all([
        fetch(`${baseUrl}/api/getApotekers`, { cache: 'no-store' }),
        getUser()
    ])
    const apotekerData = await apotekerRes.json();
    const apoteker = apotekerData.success ? apotekerData.data : [];
    return(
        <main className="min-h-screen mx-auto container bg-[#f6f8fd] sm:px-12">
            <div className="pt-4  w-full pb-6 px-6">
            <h3 className="font-bold text-md mb-2">Tanya Apoteker</h3>
            <p className="text-sm font-medium">Punya pertanyaan seputar obat?</p>
            <p className="text-sm font-medium">Yuk konsultasi langsung dengan Apoteker Berpengalaman</p>
            </div>
            <ApotekerItem apoteker={apoteker} user={user}/>
        </main>
    )
}