import { readFileSync } from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const cssAsString = () => ({
  name: 'css-as-string',
  load(id) {
    if (!id.endsWith('.css')) return null;
    const code = readFileSync(id, 'utf8');
    return {
      code: `export default ${JSON.stringify(code)};`,
      moduleSideEffects: false,
    };
  },
});

const sharedPlugins = [
  cssAsString(),
  nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }),
  commonjs(),
];

export default [
  {
    input: 'lib/index.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'artaBrowser',
      exports: 'named',
      sourcemap: false,
    },
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          module: 'esnext',
          target: 'esnext',
          declaration: false,
        },
      }),
      terser(),
    ],
  },
  {
    input: 'lib/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'lib',
      exports: 'named',
      sourcemap: false,
    },
    external: [/^preact(\/.*)?$/, 'tslib'],
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          module: 'esnext',
          target: 'esnext',
          declaration: true,
          declarationDir: 'dist',
          rootDir: 'lib',
        },
      }),
    ],
  },
];
