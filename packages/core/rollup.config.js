import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'paymongo',
        sourcemap: true,
      },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      json(),
      typescript({
        typescript: ttypescript,
        tsconfig: './tsconfig.rollup.json',
        useTsconfigDeclarationDir: true,
      }),

      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      nodeResolve({ browser: true }),

      commonjs(),
    ],
  },
  {
    input: 'dist/dts/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
