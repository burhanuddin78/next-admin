'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './pagination.module.css';

export default function Pagination({ count }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const page = searchParams.get('page') || 1;
	const ITEM_PER_PAGE = 2;

	const isPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
	const isNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

	const handleChangePage = (type) => {
		const params = new URLSearchParams(searchParams);

		type == 'prev' ? params.set('page', parseInt(page - 1)) : params.set('page', parseInt(page + 1));

		replace(`${pathname}?${params}`);
	};

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isPrev}
				onClick={() => handleChangePage('prev')}>
				Previous
			</button>
			<button
				className={styles.button}
				disabled={!isNext}
				onClick={() => handleChangePage('next')}>
				Next
			</button>
		</div>
	);
}
