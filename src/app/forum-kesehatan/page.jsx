import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";

  
export default async function Forum(){
  const user  = await getUser();
  console.log(user)
  const role = user?.user_metadata?.role || 'pengguna';

    return (
    <main className="">
      <div className="min-h-screen pb-24 sm:flex gap-2">
      <ForumKategori checkUser={user}/>
          {/* <div className=" flex flex-col justify-center items-center gap-2 sm:w-4/6">
          </div> */}
      </div>
    </main>
    );
}
