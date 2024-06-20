import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";

export default async function Forum(){
  const user  = await getUser();
    return (
    <main className="min-h-screen pb-10">
      <div className=" sm:flex gap-2">
      <ForumKategori checkUser={user}/>
      </div>
    </main>
    );
}
