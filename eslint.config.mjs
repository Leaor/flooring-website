import next from 'eslint-config-next/core-web-vitals';
import ts from 'eslint-config-next/typescript';
const config = [
  ...next,
  ...ts,
  { ignores: ['**/.next/**', '**/next-env.d.ts', '**/node_modules/**', 'test-results/**', 'playwright-report/**'] },
  { settings: { next: { rootDir: ['apps/*/'] } }, rules: { '@next/next/no-img-element': 'off' } },
];
export default config;
