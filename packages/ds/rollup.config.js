import { glob } from 'glob';
import path from 'path';

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';

const createConfig = () => defineConfig({
    input: glob.sync('src/**/index.ts'),
    output: [
        {
            dir: path.dirname(`dist/index.js`),
            format: 'esm',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
        {
            dir: path.dirname(`dist/index.js`),
            format: 'cjs',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
    ],
    external: ['react/jsx-runtime', 'react', 'react-dom', '@repo/services'],
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
            use: [
                ['sass', {
                    includePaths: [
                        'node_modules',
                        'src/styles',
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
    createConfig(),
]