import type { StorybookConfig } from '@storybook/react-webpack5';

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import sass from 'sass';

import { join, dirname } from 'path';

const currentBrand = process.env.BRAND || 'geek';

const brand = currentBrand.replace(/\s/g, '');

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (config) => {
    // @ts-ignore
    config.resolve.plugins = [ new TsconfigPathsPlugin()];
    // @ts-ignore
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: `
              @import "~@repo/tokens/dist/${brand}/css/_variables.css";
              @import "~@repo/tokens/dist/${brand}/scss/_variables.scss";
            `,
            implementation: sass,
          }
        }
      ]
    })
    return config;
  }
};
export default config;
