import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleParams, setArticleParams] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const toggleSidebar = () => setIsSidebarOpen((v) => !v);
	const closeSidebar = () => setIsSidebarOpen(false);

	const handleApplyParams = (params: typeof articleParams) => {
		setArticleParams(params);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamily,
					'--font-size': articleParams.fontSize,
					'--font-color': articleParams.fontColor,
					'--container-width': articleParams.contentWidth,
					'--bg-color': articleParams.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
				onClose={closeSidebar}
				onApply={handleApplyParams}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
