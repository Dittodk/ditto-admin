import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  console.log('Token:', token);

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/logout'];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Handle logout route
  if (pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('token', '', { expires: new Date(0), path: '/' });
    return response;
  }

  // Allow access to public routes
  if (isPublicRoute) {
    // Redirect authenticated users away from these routes
    if (token) {
      try {
        const response = await fetch(
          new URL('/api/verify-token', request.url).toString(),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await response.json();
        if (data.valid) {
          const url = new URL('/home', request.url);
          return NextResponse.redirect(url);
        }
      } catch (error) {
        // Token is invalid, treat as unauthenticated
        console.error('Token verification failed:', error);
      }
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  try {
    // Verify token by calling the serverless function
    const response = await fetch(
      new URL('/api/verify-token', request.url).toString(),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }
    );
    const data = await response.json();
    if (data.valid) {
      return NextResponse.next();
    } else {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
}
