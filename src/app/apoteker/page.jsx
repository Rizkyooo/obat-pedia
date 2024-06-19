import { getUser } from "@/libs/actions";
import { redirect } from "next/navigation";
export default async function page() {
  const user = await getUser();
  const role = user?.user_metadata?.role
  console.log(role);
  if (role !== 'apoteker') {
    redirect("/");
  }
  redirect("/apoteker/obat-a-z");
  return (
    <>
    </>
  );
}
