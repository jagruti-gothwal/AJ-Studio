import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  // Block direct access to secret-admin - only allow if they have a valid session cookie
  if (request.nextUrl.pathname.startsWith("/secret-admin")) {
    const adminSession = request.cookies.get("admin_session");
    const isLoginPage = request.nextUrl.pathname === "/secret-admin";
    if (!adminSession && !isLoginPage) {
      return NextResponse.redirect(new URL("/secret-admin", request.url));
    }
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
