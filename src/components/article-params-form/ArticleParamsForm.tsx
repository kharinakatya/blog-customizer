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

type StyleParams = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

type Props = {
	setArticleParams: React.Dispatch<React.SetStateAction<StyleParams>>;
};

export const ArticleParamsForm: React.FC<Props> = ({ setArticleParams }) => {
	const asideRef = useRef<HTMLElement | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleSidebar = () => setIsOpen((v) => !v);
	const closeSidebar = () => setIsOpen(false);

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

	const fontFamilyOptionsWithOptionClass = fontFamilyOptions.map((opt) => ({
		...opt,
		optionClassName: (opt.className as FontFamiliesClasses) ?? opt.className,
	}));

	useEffect(() => {
		if (!isOpen) return;

		const handleOutside = (e: MouseEvent) => {
			const target = e.target as Node | null;
			if (asideRef.current && !asideRef.current.contains(target)) {
				closeSidebar();
			}
		};

		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleParams({
			fontSize,
			fontColor: selectedFontColorOption.value,
			backgroundColor: selectedBackgroundColorOption.value,
			fontFamily: fontFamily.value,
			contentWidth: contentWidth.value,
		});
		closeSidebar();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();

		setSelectedFontColorOption(defaultArticleState.fontColor);
		setSelectedBackgroundColorOption(defaultArticleState.backgroundColor);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption.value);
		setContentWidth(defaultArticleState.contentWidth);

		setArticleParams({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});

		closeSidebar();
	};

	const selectedFontSizeOption =
		fontSizeOptions.find((option) => option.value === fontSize) ||
		fontSizeOptions[0];

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				ref={asideRef}
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
							options={fontFamilyOptionsWithOptionClass}
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
