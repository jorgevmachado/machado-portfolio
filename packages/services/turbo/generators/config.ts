import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('service', {
    description: 'add a new service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the service ?',
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
        templateFile: 'templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}/{{ kebabCase name }}.spec.ts',
        templateFile: 'templates/spec.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}/index.ts',
        template: "export * from './{{kebabCase name}}';",
      },
      {
        type: 'append',
        path: 'src/{{ type }}/index.ts',
        template: "export * from './{{kebabCase name}}';",
      },
    ],
  });
}
