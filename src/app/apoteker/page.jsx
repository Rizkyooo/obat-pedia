import { getUser } from "@/libs/actions";
import { getUserWithRole } from "@/services/getUserWithRole";
import { redirect } from "next/navigation";
import { logOut } from "@/libs/actions";
import { Button } from "@nextui-org/react";
import NavApoteker from "@/components/navApoteker";
export default async function page() {
  const user = await getUser();
  const role = user?.user_metadata?.role
  console.log(role);
  if (role !== 'apoteker') {
    redirect("/");
  }




  return (
    <>
      <main className="w-full bg-gray-100 min-h-screen p-2 ">
        <NavApoteker/>
        <div className="min-h-screen w-full flex mt-2 gap-2">

        <div className="min-h-screen w-4/12 bg-white"></div>
        <div className="min-h-screen w-6/12 bg-white"></div>
        <div className="min-h-screen w-2/12 bg-white"></div>
        </div>
      </main>
    </>
  );
}
