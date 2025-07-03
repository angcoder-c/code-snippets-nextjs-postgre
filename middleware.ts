
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    console.log('middleware')
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    const isAuth = !!token
    const isProtectedRoute = pathname.startsWith("/create")

    if (isProtectedRoute && !isAuth) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}


export const config = {
  matcher: ["/create/"],
}
