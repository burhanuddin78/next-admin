'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './loginForm.module.css';

const LoginForm = () => {
	const [error, setError] = useState(null); // For managing error messages
	const [loading, setLoading] = useState(false); // To show loading state
	const router = useRouter(); // For client-side navigation

	const authenticate = async (formData) => {
		const { username, password } = Object.fromEntries(formData);

		try {
			setLoading(true);
			setError(null); // Clear any previous errors

			const result = await signIn('credentials', {
				redirect: false, // Prevent automatic redirects
				username,
				password,
			});

			if (!result?.error) {
				// Successful login: Redirect to dashboard
				router.push('/dashboard');
			} else {
				// Login failed: Show an error message
				setError('Invalid username or password.');
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		await authenticate(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}>
			<h1>Login</h1>
			<input
				type='text'
				placeholder='Username'
				name='username'
				required
			/>
			<input
				type='password'
				placeholder='Password'
				name='password'
				required
			/>
			<button
				type='submit'
				disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</button>
			{error && <p className={styles.error}>{error}</p>}
		</form>
	);
};

export default LoginForm;
