import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET, // Match this with NextAuth secret
	});

	const isLoggedIn = token; // auth?.user;
	const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
	if (isOnDashboard) {
		if (isLoggedIn) return NextResponse.next();
		return NextResponse.redirect(new URL('/login', req.nextUrl));
	} else if (isLoggedIn) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
