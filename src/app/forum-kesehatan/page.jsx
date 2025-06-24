import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";

export default async function Forum() {
  const user = await getUser();
  const role = user?.user_metadata?.role || "pengguna";
  const userId = user?.id || null;

  return (
    <main className="">
      <div className="min-h-screen pb-24 sm:flex gap-2">
        <ForumKategori userRole={role} userId={userId} />
      </div>
    </main>
  );
}
