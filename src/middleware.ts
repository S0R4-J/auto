import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // const isLoggedIn = !!req.auth
  // const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
  
  // if (isOnAdmin) {
  //   if (!isLoggedIn) {
  //     return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl))
  //   }
    
  //   // Check for admin role
  //   // @ts-expect-error role is not yet typed
  //   if (req.auth?.user?.role !== "admin") {
  //     return NextResponse.redirect(new URL("/", req.nextUrl)) // Redirect non-admins
  //   }
  // }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
