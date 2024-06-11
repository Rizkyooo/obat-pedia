import Jumbotron from "@/components/jumbotron";
import NavHero from "@/components/nav-hero";
import ListArtikel from "@/components/listArtikel";
import { getUser } from "@/libs/actions";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
export default async function  Home() {
  const user = await getUser();
  const role = user?.user_metadata?.role
  console.log(user?.user_metadata?.role);

  if (role === 'apoteker') {
    redirect('/apoteker');
}

if (role === 'admin') {
  redirect('/admin');
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
      <ToastContainer />
    </main>
    </>
  );
}
