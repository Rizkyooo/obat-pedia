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
    if (role !== 'admin') {
      redirect("/");
    }




  return (
    <>
      <main className="w-full bg-gray-100 min-h-screen p-2">
        <NavApoteker/>
      </main>
    </>
  );
}
