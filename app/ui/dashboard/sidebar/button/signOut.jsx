'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton({ className }) {
	return (
		<button
			onClick={() => signOut({ callbackUrl: '/login' })}
			className={className}>
			Sign Out
		</button>
	);
}
