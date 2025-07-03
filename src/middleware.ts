import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const publicPaths = ['/']
  
  // routes protected
  const protectedPaths = ['/create']
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  )
  
  if (!isProtectedPath) {
    return NextResponse.next()
  }
  
  // nextauth token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // redirect
  if (!token) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  const response = NextResponse.next()
  response.headers.set('X-User-Authenticated', 'true')
  response.headers.set('X-User-Email', token.email || '')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}