import Jumbotron from "@/components/jumbotron";
import NavHero from "@/components/nav-hero";
import ListArtikel from "@/components/listArtikel";
import { getUser } from "@/libs/actions";
import { getUserWithRole } from "@/services/getUserWithRole";
import { redirect } from "next/navigation";
export default async function  Home() {
  const user = await getUser();
  console.log(user?.id);
  const checkRole =  await getUserWithRole(user?.id);
  const role = checkRole?.role_id;
  console.log(checkRole?.role_id);

  if (role === 2) {
    redirect('/apoteker');
}
  return (
    <>
    <main className="min-h-screen">
      <section className="relative sm:block">
        <Jumbotron />
        <div className=" absolute -bottom-20 rounded-t-3xl bg-white w-full sm:hidden">
          <div className="flex justify-center items-center">
            <NavHero />
          </div>
        </div>
      </section>
      <div className=" mt-28 sm:mt-0 sm:p-9 container mx-auto px-6 mb-20">
      <ListArtikel></ListArtikel>
      </div>
    </main>
    </>
  );
}
