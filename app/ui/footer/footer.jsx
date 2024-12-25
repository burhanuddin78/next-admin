import styles from './footer.module.css';

function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>Next Admin</div>
			<div>@ All rights reserved</div>
		</div>
	);
}

export default Footer;
