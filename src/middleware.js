import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";
import { getUser } from "./libs/actions";
import { getUserWithRole } from "./services/getUserWithRole";

export async function middleware(request) {
  const user = await getUser();
  const role = user?.user_metadata?.role;

if (request.nextUrl.pathname.startsWith("/apoteker") && role !== 'apoteker') {
  return NextResponse.redirect(new URL("/login", request.url));
}

  if (request.nextUrl.pathname.startsWith("/admin") && role !== 'admin') {
        return NextResponse.redirect(new URL("/login", request.url));
  }

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
