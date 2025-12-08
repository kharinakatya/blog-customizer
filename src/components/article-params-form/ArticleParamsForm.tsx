import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	FontFamiliesClasses,
} from 'src/constants/articleProps';

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
};

export const ArticleParamsForm: React.FC<Props> = ({
	isOpen,
	onToggle,
	onClose,
	onApply,
}) => {
	const asideRef = useRef<HTMLElement | null>(null);

	const [selectedFontColorOption, setSelectedFontColorOption] =
		useState<OptionType>(defaultArticleState.fontColor);
	const [selectedBackgroundColorOption, setSelectedBackgroundColorOption] =
		useState<OptionType>(defaultArticleState.backgroundColor);

	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const [fontSize, setFontSize] = useState<string>(
		defaultArticleState.fontSizeOption.value
	);

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
					<header className={styles.header}>
						<Text
							as='h2'
							size={31}
							weight={800}
							uppercase={true}
							align='left'
							family={
								(fontFamily.className as FontFamiliesClasses | undefined) ??
								'open-sans'
							}
							dynamicLite>
							Задайте параметры
						</Text>
					</header>

					<div className={styles.field}>
						<Select
							title='Шрифт'
							selected={fontFamily}
							options={fontFamilyOptions}
							placeholder='Выберите шрифт'
							onChange={setFontFamily}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSizeOption}
							onChange={(option: OptionType) => setFontSize(option.value)}
							title='Размер шрифта'
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет текста'
							options={fontColors}
							selected={selectedFontColorOption}
							onChange={setSelectedFontColorOption}
							placeholder='Выберите цвет'
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={selectedBackgroundColorOption}
							onChange={setSelectedBackgroundColorOption}
							placeholder='Выберите цвет'
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Ширина'
							selected={contentWidth}
							options={contentWidthArr}
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
