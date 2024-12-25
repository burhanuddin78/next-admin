import { updateUser } from '@/app/lib/actions';
import { fetchUser } from '@/app/lib/data';
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Ensures dynamic rendering for this page

// Server Component
const SingleUserPage = async ({ params }) => {
	const { id } = params;

	// Fetch user data
	const user = await fetchUser(id);

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.imgContainer}>
					<Image
						src={user.img || '/noavatar.png'}
						alt='User Avatar'
						fill
					/>
				</div>
				<h2>{user.username}</h2>
			</div>
			<div className={styles.formContainer}>
				<UpdateUserForm user={user} />
			</div>
		</div>
	);
};

// Form Component with Server Action
const UpdateUserForm = ({ user }) => {
	return (
		<form
			action={updateUser}
			method='post'
			autoComplete='off'
			className={styles.form}>
			{/* Hidden input for user ID */}
			<input
				type='hidden'
				name='id'
				value={user.id}
			/>

			<label htmlFor='username'>Username</label>
			<input
				type='text'
				id='username'
				name='username'
				defaultValue={user.username}
			/>

			<label htmlFor='email'>Email</label>
			<input
				type='email'
				id='email'
				name='email'
				defaultValue={user.email}
			/>

			<label htmlFor='password'>Password</label>
			<input
				type='password'
				id='password'
				name='password'
				defaultValue={user.password}
			/>

			<label htmlFor='phone'>Phone</label>
			<input
				type='text'
				id='phone'
				name='phone'
				defaultValue={user.phone}
			/>

			<label htmlFor='address'>Address</label>
			<textarea
				id='address'
				name='address'
				defaultValue={user.address}
			/>

			<label htmlFor='isAdmin'>Is Admin?</label>
			<select
				name='isAdmin'
				id='isAdmin'
				defaultValue={user.isAdmin.toString()}>
				<option value='true'>Yes</option>
				<option value='false'>No</option>
			</select>

			<label htmlFor='isActive'>Is Active?</label>
			<select
				name='isActive'
				id='isActive'
				defaultValue={user.isActive.toString()}>
				<option value='true'>Yes</option>
				<option value='false'>No</option>
			</select>

			<button type='submit'>Update</button>
		</form>
	);
};

export default SingleUserPage;
