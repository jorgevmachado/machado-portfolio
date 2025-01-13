import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('business', {
    description: 'add a new business',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the business ?',
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
        path: 'src/{{ kebabCase name }}/{{ kebabCase name }}.ts',
        templateFile: 'templates/business.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}/interface.ts',
        templateFile: 'templates/interface.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}/index.ts',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'append',
        path: 'src/{{ type }}/index.ts',
        template: "export * from './{{kebabCase name}}';",
      },
    ],
  });
}
