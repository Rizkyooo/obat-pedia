import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { getUser } from "@/libs/actions";

// Regular import for above-the-fold content
import Jumbotron from "@/components/jumbotron";
import NavHero from "@/components/nav-hero";

// Dynamic imports for below-the-fold content with loading fallbacks
const ListArtikel = dynamic(() => import("@/components/listArtikel"), {
  ssr: true,
  loading: () => <div className="h-40 rounded-lg bg-gray-100 animate-pulse"></div>
});

const MediScope = dynamic(() => import("@/components/mediScope"), {
  ssr: true,
  loading: () => <div className="h-40 rounded-lg bg-gray-100 animate-pulse"></div>
});

// Set page to use dynamic rendering
export const dynamicConfig = "force-dynamic";

export default async function Home() {
  const user = await getUser();
  const role = user?.user_metadata?.role;
  
  if (role === "apoteker") {
    redirect("/apoteker/obat-a-z");
  }

  if (role === "admin") {
    redirect("/admin");
  }
  
  return (
    <main className="min-h-screen bg-[#f6f8fd]">
      <section className="relative sm:block">
        <Jumbotron />
        <div className="absolute -bottom-44 rounded-t-3xl bg-[#f6f8fd] w-full sm:hidden">
          <div className="flex justify-center items-center">
            <NavHero />
          </div>
        </div>
      </section>
      <div className="mt-60 sm:mt-0 sm:py-9 container px-6 mb-20">
        <ListArtikel />
        <div className="mt-10 mb-10">
          <MediScope />
        </div>
      </div>
    </main>
  );
}
