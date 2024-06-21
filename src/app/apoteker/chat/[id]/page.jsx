import { getUser } from "@/libs/actions";
import Chat from "../components/chat"

export default async function Page({params}) {
  const user = await getUser();

  return (
    <div className=" w-full">
       <Chat id={params?.id} userId={user?.id}/>
    </div>
  )
}
