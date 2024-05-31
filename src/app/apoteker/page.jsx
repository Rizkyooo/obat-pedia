import { getUser } from "@/libs/actions";
import { getUserWithRole } from "@/services/getUserWithRole";
import { redirect } from "next/navigation";
import { logOut } from "@/libs/actions";
import { Button } from "@nextui-org/react";
import NavApoteker from "@/components/navApoteker";
export default async function page() {
    const user = await getUser();
    console.log(user?.id);
    const checkRole = await getUserWithRole(user?.id);
    const role = checkRole?.role_id;
    console.log(checkRole?.role_id);
    if (role !== 2) {
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
