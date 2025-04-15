import Jumbotron from "@/components/jumbotron";
import NavHero from "@/components/nav-hero";
import ListArtikel from "@/components/listArtikel";
import { getUser } from "@/libs/actions";
import { redirect } from "next/navigation";
export default async function  Home() {
  const user = await getUser();
  const role = user?.user_metadata?.role
  console.log(user?.user_metadata?.role);

  if (role === 'apoteker') {
    redirect('/apoteker/obat-a-z');
}

if (role === 'admin') {
  redirect('/admin');
}
  return (
    <>
    <main className="min-h-screen">
      <section className="relative sm:block">
        <Jumbotron />
        <div className=" absolute -bottom-44 rounded-t-3xl bg-[#f6f8fd] w-full sm:hidden">
          <div className="flex justify-center items-center">
            <NavHero />
          </div>
        </div>
      </section>
      <div className="mt-60 sm:mt-0 sm:py-9 container px-6 mb-20">
      <ListArtikel></ListArtikel>
      </div>
    </main>
    </>
  );
}
