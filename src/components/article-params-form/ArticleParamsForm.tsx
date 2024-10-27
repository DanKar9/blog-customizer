import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { Dispatch, FC, SetStateAction, useState, useRef } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';

type FormProps = Dispatch<SetStateAction<ArticleStateType>>;

export const ArticleParamsForm: FC<{ changeArticleState: FormProps }> = ({
	changeArticleState,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [option, setOption] = useState(defaultArticleState);

	const handleClickOpen = () => {
		setIsOpen((state: typeof isOpen) => !state);
	};

	const optionChange = (
		optionsKey: keyof ArticleStateType,
		optionsType: OptionType
	) => {
		setOption({ ...option, [optionsKey]: optionsType });
	};

	const onFontFamilyOptionChange = (selectorChange: OptionType) => {
		optionChange('fontFamilyOption', selectorChange);
	};

	const onFontSizeOptionChange = (selectorChange: OptionType) => {
		optionChange('fontSizeOption', selectorChange);
	};

	const onFontColorsChange = (selectorChange: OptionType) => {
		optionChange('fontColor', selectorChange);
	};

	const onBackgroundColorChange = (selectorChange: OptionType) => {
		optionChange('backgroundColor', selectorChange);
	};

	const onContentWidthChange = (selectorChange: OptionType) => {
		optionChange('contentWidth', selectorChange);
	};

	const resetOption = () => {
		setOption(defaultArticleState);
		changeArticleState(defaultArticleState);
	};

	const applyOption = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		changeArticleState(option);
	};

	const asideRef = useRef<HTMLDivElement>(null);

	const handleClose = () => {
		setIsOpen(false);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onClose: handleClose,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClickOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					onReset={resetOption}
					onSubmit={applyOption}
					className={styles.form}>
					<Text as={'h2'} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={option.fontFamilyOption}
						title='Шрифт'
						options={fontFamilyOptions}
						onChange={onFontFamilyOptionChange}></Select>
					<RadioGroup
						options={fontSizeOptions}
						onChange={onFontSizeOptionChange}
						selected={option.fontSizeOption}
						title='Размер шрифта'
						name=''></RadioGroup>
					<Select
						selected={option.fontColor}
						title='Цвет шрифта'
						options={fontColors}
						onChange={onFontColorsChange}></Select>
					<Separator></Separator>
					<Select
						selected={option.backgroundColor}
						title='Цвет фона'
						options={backgroundColors}
						onChange={onBackgroundColorChange}></Select>
					<Select
						selected={option.contentWidth}
						title='Ширина контента'
						options={contentWidthArr}
						onChange={onContentWidthChange}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
