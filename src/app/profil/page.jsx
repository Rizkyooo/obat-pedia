import { getUser } from "@/libs/actions"
import { redirect } from "next/navigation"
import { Avatar, Image, Input } from "@nextui-org/react";
import EditProfil from "./editProfil";
import { UserIcon } from "lucide-react";
export default async function Profil(){
    const user = await getUser();
    if(!user){
        redirect('/login')
    }
    
    return(
        <main className="sm:pb-16 bg-gray-100">
            <div className="flex flex-col px-4 py-4 gap-4 sm:flex-row ">
                <div className="bg-white flex flex-col justify-center items-center py-6 gap-4 sm:w-1/3">
                    <Avatar isBordered={false} radius="sm" className=" w-32 h-auto sm:w-52" src={user?.user_metadata?.avatar_url || 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' } />
                    <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-md sm:text-lg">{user?.user_metadata?.name}</p>
                    <p>{user?.user_metadata?.email}</p>
                    </div>
                </div>
                <div className=" bg-white p-4 sm:w-2/3 sm:px-16">
                    <p className="font-bold text-lg">Edit Profil</p>
                    <EditProfil></EditProfil>
                </div>
            </div>
        </main>
    )
}