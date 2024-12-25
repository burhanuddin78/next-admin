/* eslint-disable no-useless-catch */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { authConfig } from './authconfig';
import { connectToDB } from '@/app/lib/utils';
import { User } from '@/app/lib/models';

// Helper function to validate login credentials
const login = async ({ username, password }) => {
	try {
		await connectToDB(); // Ensure DB connection is active

		const user = await User.findOne({ username: username });

		if (!user) {
			throw new Error('Wrong credentials. Please try again');
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new Error('Wrong credentials. Please try again');
		}

		// Return user object excluding sensitive data
		return {
			id: user.id,
			name: user.id,
			username: user.username,
			email: user.email,
		};
	} catch (error) {
		throw error; // Rethrow error for authorize to handle
	}
};

const handler = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				try {
					const user = await login(credentials); // Validate credentials
					return user; // Return user object to be saved in the session
				} catch (error) {
					console.log(error.message);
					return null; // Return null if login fails
				}
			},
		}),
	],
	pages: {
		signIn: '/login', // Custom login page
	},
	callbacks: {
		async session({ session, token }) {
			return { session, ...token }; // Attach user info to session
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.email = user.email;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
