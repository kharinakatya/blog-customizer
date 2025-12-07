import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
<<<<<<< HEAD

/** Функция для обработки открытия/закрытия формы */
=======
import React from 'react';

>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

<<<<<<< HEAD
export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
=======
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
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
<<<<<<< HEAD
			/>
		</div>
=======
				aria-hidden
			/>
		</button>
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
	);
};
