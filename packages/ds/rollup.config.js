import { glob } from 'glob';
import path from 'path';

import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
import {defineConfig} from 'rollup';

const currentBrand = process.env.BRAND || "geek";
const brand = currentBrand.replace(/\s/g, '');

const createConfig = (brand) => defineConfig({
    input: glob.sync('src/**/index.ts'),
    output: [
        {
            dir: path.dirname(`dist/index.js`),
            format: 'esm',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
            silenceDeprecations: ['legacy-js-api'],
        },
        {
            dir: path.dirname(`dist/index.js`),
            format: 'cjs',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
            silenceDeprecations: ['legacy-js-api'],
        },
    ],
    external: ['react/jsx-runtime', 'react', 'react-dom', '@repo/services', '@repo/business', 'react-datepicker'],
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
            use: [
                ['sass', {
                    includePaths: [
                        'node_modules',
                        'src/styles',
                        `@repo/tokens/dist/${brand}/css/_variables.css`,
                        `@repo/tokens/dist/${brand}/scss/_variables.scss`,
                    ]
                }]
            ],
            extract: true,
            minimize: true,
            extensions: ['.css', '.scss'],
        }),
        sass({
            insert: true,
            include: ['**/*.scss', '**/*.css'],
            options: {
                includePaths: [
                    'node_modules',
                    'src/styles'
                ],
            }
        })
    ],
});

export default [
    createConfig(brand),
]