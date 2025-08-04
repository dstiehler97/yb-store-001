import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Lasse Admin-Routen, API-Routen und statische Assets unverändert
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Lasse die Root-Route "/" unverändert zur page.tsx
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Für alle anderen Routen prüfe, ob es ein gültiger Slug ist
  // Dies verhindert, dass ungültige Routen an [slug] weitergeleitet werden
  const slug = pathname.substring(1) // Entferne den führenden "/"
  
  // Validiere Slug-Format (nur Buchstaben, Zahlen, Bindestriche)
  if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
