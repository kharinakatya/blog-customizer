import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
import { StrictMode, CSSProperties } from 'react';
=======
import { StrictMode, CSSProperties, useState } from 'react';
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
<<<<<<< HEAD
=======
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

>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
<<<<<<< HEAD
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm />
=======
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
				initialParams={articleParams}
			/>
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
