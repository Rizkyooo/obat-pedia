import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";
import { getUser } from "./libs/actions";
import { getUserWithRole } from "./services/getUserWithRole";

export async function middleware(request) {
  const user = await getUser();
  console.log(user?.id);
  const checkRole =  await getUserWithRole(user?.id);
  const role = checkRole?.role_id;
  console.log(checkRole?.role_id);

  // if(user && request.nextUrl.pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", request.url));
    
  // }



  if (role === 2 && (request.nextUrl.pathname === "/obat-a-z" || request.nextUrl.pathname === "/tanya-apoteker" || request.nextUrl.pathname === "/profil" || request.nextUrl.pathname === "/forum-kesehatan" || request.nextUrl.pathname === "/artikel")) {
    return NextResponse.redirect(new URL("/apoteker", request.url));
}



  // if (request.nextUrl.pathname.startsWith("/admin") && role === 3) {
  //       return NextResponse.redirect(new URL("/admin", request.url));
  // }

  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
