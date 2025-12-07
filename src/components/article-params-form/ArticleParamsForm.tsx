import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { OptionType, defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onApply: (params: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
	initialParams?: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	};
};

const fontFamilyOptions: OptionType[] = [
	{ value: 'Arial', title: 'Arial', className: '', optionClassName: '' },
	{
		value: 'Times New Roman',
		title: 'Times New Roman',
		className: '',
		optionClassName: '',
	},
	{ value: 'Verdana', title: 'Verdana', className: '', optionClassName: '' },
	{ value: 'Georgia', title: 'Georgia', className: '', optionClassName: '' },
];

const fontSizeOptions: OptionType[] = [
	{ value: '14px', title: '14px', className: '', optionClassName: '' },
	{ value: '16px', title: '16px', className: '', optionClassName: '' },
	{ value: '18px', title: '18px', className: '', optionClassName: '' },
	{ value: '20px', title: '20px', className: '', optionClassName: '' },
];

const contentWidthOptions: OptionType[] = [
	{ value: '100%', title: '100%', className: '', optionClassName: '' },
	{ value: '80%', title: '80%', className: '', optionClassName: '' },
	{ value: '60%', title: '60%', className: '', optionClassName: '' },
	{ value: '40%', title: '40%', className: '', optionClassName: '' },
];

const colorOptions: OptionType[] = [
	{
		value: '#000000',
		title: 'Чёрный',
		className: '',
		optionClassName: 'option-black',
	},
	{
		value: '#ffffff',
		title: 'Белый',
		className: '',
		optionClassName: 'option-white',
	},
	{
		value: '#c4c4c4',
		title: 'Серый',
		className: '',
		optionClassName: 'option-gray',
	},
	{
		value: '#feafe8',
		title: 'Розовый',
		className: '',
		optionClassName: 'option-pink',
	},
	{
		value: '#fd24af',
		title: 'Фуксия',
		className: '',
		optionClassName: 'option-fuchsia',
	},
	{
		value: '#ffc802',
		title: 'Жёлтый',
		className: '',
		optionClassName: 'option-yellow',
	},
	{
		value: '#80d994',
		title: 'Зелёный',
		className: '',
		optionClassName: 'option-green',
	},
	{
		value: '#6fc1fd',
		title: 'Синий',
		className: '',
		optionClassName: 'option-blue',
	},
	{
		value: '#5f0dee',
		title: 'Фиолетовый',
		className: '',
		optionClassName: 'option-purple',
	},
];

export const ArticleParamsForm: React.FC<Props> = ({
	isOpen,
	onToggle,
	onClose,
	onApply,
	initialParams = {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontColor: '#000000',
		backgroundColor: '#ffffff',
		contentWidth: '100%',
	},
}) => {
	const asideRef = useRef<HTMLElement | null>(null);

	const [selectedFontColorOption, setSelectedFontColorOption] =
		useState<OptionType>(
			colorOptions.find((option) => option.value === initialParams.fontColor) ||
				colorOptions[0]
		);
	const [selectedBackgroundColorOption, setSelectedBackgroundColorOption] =
		useState<OptionType>(
			colorOptions.find(
				(option) => option.value === initialParams.backgroundColor
			) || colorOptions[1]
		);

	const [fontFamily, setFontFamily] = useState<OptionType>(() => {
		return (
			fontFamilyOptions.find((opt) => opt.value === initialParams.fontFamily) ||
			fontFamilyOptions[0]
		);
	});

	const [contentWidth, setContentWidth] = useState<OptionType>(() => {
		return (
			contentWidthOptions.find(
				(opt) => opt.value === initialParams.contentWidth
			) || contentWidthOptions[0]
		);
	});

	const [fontSize, setFontSize] = useState(initialParams.fontSize);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutside = (e: MouseEvent) => {
			const target = e.target as Node | null;
			if (asideRef.current && !asideRef.current.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, [isOpen, onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontSize,
			fontColor: selectedFontColorOption.value,
			backgroundColor: selectedBackgroundColorOption.value,
			fontFamily: fontFamily.value,
			contentWidth: contentWidth.value,
		});
		onClose();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();

		setSelectedFontColorOption(defaultArticleState.fontColor);
		setSelectedBackgroundColorOption(defaultArticleState.backgroundColor);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption.value);
		setContentWidth(defaultArticleState.contentWidth);

		onApply({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});

		onClose();
	};

	const selectedFontSizeOption =
		fontSizeOptions.find((option) => option.value === fontSize) ||
		fontSizeOptions[0];

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={asideRef as any}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				aria-hidden={!isOpen}
				data-open={isOpen}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.field}>
						<label>Шрифт:</label>
						<Select
							selected={fontFamily}
							options={fontFamilyOptions}
							placeholder='Выберите шрифт'
							onChange={setFontFamily}
						/>
					</div>

					<div className={styles.field}>
						<label>Размер шрифта:</label>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSizeOption}
							onChange={(option: OptionType) => setFontSize(option.value)}
							title=''
						/>
					</div>

					<div className={styles.field}>
						<label>Цвет текста:</label>
						<Select
							options={colorOptions}
							selected={selectedFontColorOption}
							onChange={setSelectedFontColorOption}
							placeholder='Выберите цвет'
						/>
					</div>

					<div className={styles.field}>
						<label>Цвет фона:</label>
						<Select
							options={colorOptions}
							selected={selectedBackgroundColorOption}
							onChange={setSelectedBackgroundColorOption}
							placeholder='Выберите цвет'
						/>
					</div>

					<div className={styles.field}>
						<label>Ширина:</label>
						<Select
							selected={contentWidth}
							options={contentWidthOptions}
							placeholder='Выберите ширину'
							onChange={setContentWidth}
						/>
					</div>

					<Separator />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
