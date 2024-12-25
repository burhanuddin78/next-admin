import styles from '../ui/dashboard/dashboard.module.css';
import Card from './card/card';
import Chart from './chart/chart';
import Rightbar from './rightbar/rightbar';
import Transactions from './transactions/transactions';
function Dashboard() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.cards}>
					<Card />
					<Card />
					<Card />
				</div>
				<Transactions />
				<Chart />
			</div>
			<div className={styles.side}>
				<Rightbar />
			</div>
		</div>
	);
}

export default Dashboard;
