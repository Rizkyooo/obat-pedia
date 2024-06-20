import { redirect } from "next/navigation";
import ListUser from "./components/listUser";
import { getUser } from "@/libs/actions";
export default async function Layout({ children }) {
    const user  = await getUser();
    if(!user){
      return redirect('/login')
    }
    
  return( 
    <div className="flex gap-1 min-h-screen">
    <ListUser/>
    {children}
    </div>
  );
}
