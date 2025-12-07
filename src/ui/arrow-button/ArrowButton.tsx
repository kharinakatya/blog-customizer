import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import React from 'react';

export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isOpen,
	onClick,
}) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<button
			type='button'
			aria-expanded={isOpen}
			aria-label='Открыть/Закрыть форму параметров статьи'
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}
			onKeyDown={handleKeyDown}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				aria-hidden
			/>
		</button>
	);
};
