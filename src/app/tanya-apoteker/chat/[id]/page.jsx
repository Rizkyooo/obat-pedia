import Chat from "../components/chat";
import ProfilApoteker from "../components/profilApoteker";
import { getUser } from "@/libs/actions";
export default async function Page({ params }) {
  const user = await getUser();
  return (
    <div className="flex w-full sm:w-3/4 gap-1">
      <div className="sm:w-2/3 w-full shadow-md bg-gray-100">
        <Chat id={params?.id} userId={user?.id} />
      </div>
      <div className="w-1/3 hidden sm:flex shadow-md bg-white">
        <ProfilApoteker apotekerId={params?.id} />
      </div>
    </div>
  );
}
