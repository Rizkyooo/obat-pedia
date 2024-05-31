import { redirect } from "next/navigation";
import { getUser } from "@/libs/actions";
import { getUserWithRole } from "@/services/getUserWithRole";
export  const checkRole = async () => {
    const user = await getUser();
    console.log(user?.id);
    const checkRole =  await getUserWithRole(user?.id);
    const role = checkRole?.role_id;
    console.log(checkRole?.role_id);
    if(role === 1) {
      return redirect('/')
    }else if(role === 2) {
      return redirect('/apoteker')
    }else if(role === 3) {
      return redirect('/')
    }
}