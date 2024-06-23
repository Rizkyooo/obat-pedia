import { redirect } from "next/navigation";
import ListUser from "./components/listUser";
import { getUser } from "@/libs/actions";
export default async function Layout({ children }) {
    const user  = await getUser();
    if(!user){
      return redirect('/login')
    }
    
  return( 
    <div className="flex " style={{ height: "calc(100vh - 65px)" }}>
    {/* <ListUser/> */}
    {children}
    </div>
  );
}
