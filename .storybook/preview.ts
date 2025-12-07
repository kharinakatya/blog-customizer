<<<<<<< HEAD
import type { Preview } from "@storybook/react";
import { StoryDecorator } from "../src/ui/story-decorator/StoryDecorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StoryDecorator],
=======
import type { Preview } from '@storybook/react';
import { StoryDecorator } from '../src/ui/story-decorator/StoryDecorator';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [StoryDecorator],
>>>>>>> cb3d7b63f234c0e1e03c7ba9d971d2ce331ba561
};

export default preview;
