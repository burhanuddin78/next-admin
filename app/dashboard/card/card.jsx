import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './card.module.css';

function Card() {
	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				<MdSupervisedUserCircle size={24} />
			</div>
			<div className={styles.texts}>
				<span className={styles.title}>Total Users</span>
				<span className={styles.number}>10,928</span>
				<span className={styles.details}>
					<span className={styles.positive}>12% </span>
					more than previous week
				</span>
			</div>
		</div>
	);
}

export default Card;
