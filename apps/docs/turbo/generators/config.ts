import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('docs', {
    description: 'add a new design system element or component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of file should be created ?',
        choices: ['design-system', 'user-interface'],
      },
      {
        type: 'list',
        name: 'subtype',
        message: 'What subtype of file should be created ?',
        choices: ['elements', 'components', 'animations', 'layout'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the storybook item ?',
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'file name cannot include an extension';
          }
          if (input.match(' ')) {
            return 'file name cannot include spaces';
          }
          if (!input) {
            return 'file name is required';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{ type }}/{{ subtype }}/{{ kebabCase name }}/{{ pascalCase name }}.stories.tsx',
        templateFile: 'templates/storybook.hbs',
      },
    ],
  });
}
