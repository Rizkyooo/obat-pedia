import ForumKategori from "@/components/forumKategori";
import { getUser } from "@/libs/actions";
export default async function layout({ children }) {
  const user = await getUser();
  return (
    <>
      <div className="container mx-auto px-6 bg-gray-100">
        <h3 className="text-md sm:text-lg font-semibold py-4">Forum Kesehatan</h3>
        <div className="sm:flex gap-4">
        <ForumKategori checkUser={user}/>
        <div className="sm:w-5/6">
        {children}
        </div>
        </div>
      </div>
    </>
  );
}
