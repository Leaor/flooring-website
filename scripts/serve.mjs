import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const mode = process.argv[2] === 'start' ? 'start' : 'dev';
const sites = ['humber', 'kingsway', 'true-grain', 'montgomery'];
const children = sites.map((site, index) => spawn(process.execPath,
  [path.join(root, 'node_modules/next/dist/bin/next'), mode, '--hostname', '0.0.0.0', '--port', String(3000 + index)],
  { cwd: path.join(root, 'apps', site), stdio: 'inherit' }));
let stopping = false;
function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exitCode = code;
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
for (const child of children) child.on('exit', (code) => { if (!stopping) stop(code ?? 1); });
