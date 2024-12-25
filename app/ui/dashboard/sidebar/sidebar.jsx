import Image from 'next/image';
import MenuList from './menuList/menuList';
import styles from './sidebar.module.css';
import SignOutButton from './button/signOut';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout } from 'react-icons/md';
import { fetchUser } from '@/app/lib/data';

const menuItems = [
	{
		title: 'Pages',
		list: [
			{ title: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
			{ title: 'Users', path: '/dashboard/users', icon: <MdSupervisedUserCircle /> },
			{ title: 'Products', path: '/dashboard/products', icon: <MdShoppingBag /> },
			{ title: 'Transactions', path: '/dashboard/transactions', icon: <MdAttachMoney /> },
		],
	},
	{
		title: 'Analytics',
		list: [
			{ title: 'Revenue', path: '/dashboard/revenue', icon: <MdWork /> },
			{ title: 'Reports', path: '/dashboard/reports', icon: <MdAnalytics /> },
			{ title: 'Teams', path: '/dashboard/teams', icon: <MdPeople /> },
		],
	},
	{
		title: 'User',
		list: [
			{ title: 'Settings', path: '/dashboard/settings', icon: <MdOutlineSettings /> },
			{ title: 'Help', path: '/dashboard/help', icon: <MdHelpCenter /> },
		],
	},
];

async function Sidebar() {
	const session = await getServerSession(authOptions);

	console.log(session);

	const user = await fetchUser(session.user.name);

	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<Image
					className={styles.userImage}
					src='/noavatar.png'
					alt='noavatar'
					width='50'
					height='50'
				/>
				<div className={styles.userDetails}>
					<span className={styles.username}>{user?.username}</span>
					<span className={styles.userRole}>Administrator</span>
				</div>
			</div>
			<ul className={styles.list}>
				{menuItems.map((cat) => (
					<li key={cat.title}>
						<span className={styles.cat}>{cat.title}</span>
						{cat.list.map((item) => (
							<MenuList
								item={item}
								key={item.title}
							/>
						))}
					</li>
				))}
			</ul>

			<SignOutButton className={styles.logout} />
		</div>
	);
}

export default Sidebar;
