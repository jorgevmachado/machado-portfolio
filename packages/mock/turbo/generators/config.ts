import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('mock', {
    description: 'add a new controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the controller ?',
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
        path: 'src/controllers/{{ kebabCase name }}/{{ kebabCase name }}.controller.ts',
        templateFile: 'templates/controllers/controller/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/controllers/{{ kebabCase name }}/index.ts',
        templateFile: 'templates/controllers/controller/index.hbs',
      },
      {
        type: 'add',
        path: 'src/controllers/index.ts',
        templateFile: 'templates/controllers/index.hbs',
      },
    ],
  });
}
