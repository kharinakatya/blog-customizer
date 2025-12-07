import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
<<<<<<< HEAD
import { Option } from './Option';
=======
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);
	const optionClassName = selected?.optionClassName ?? '';

<<<<<<< HEAD
=======
	const status = 'default';

>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
<<<<<<< HEAD
=======

>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName]
					)}
					data-status={status}
					data-selected={!!selected?.value}
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
<<<<<<< HEAD
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
=======

				{isOpen && (
					<ul
						className={styles.select}
						data-testid='selectDropdown'
						role='listbox'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<li
									key={option.value}
									role='option'
									aria-selected={selected?.value === option.value}
									className={clsx(
										styles.option,
										option.optionClassName &&
											(styles as Record<string, string>)[option.optionClassName]
									)}
									onClick={() => handleOptionClick(option)}>
									<span className={styles['option-title']}>{option.title}</span>
								</li>
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
