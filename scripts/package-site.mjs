import { cp, mkdir, readdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const site = process.argv[2];
if (!['humber', 'kingsway', 'true-grain', 'montgomery'].includes(site)) {
  throw new Error('Choose humber, kingsway, true-grain, or montgomery.');
}
const app = path.join(root, 'apps', site);
const standalone = path.join(app, '.next/standalone');
await stat(path.join(standalone, 'apps', site, 'server.js'));
const artifacts = path.join(root, 'artifacts');
await mkdir(artifacts, { recursive: true });
const destination = path.join(artifacts, site);
try {
  await stat(destination);
  // Preserve any prior package instead of overwriting an existing artifact.
  await rename(destination, `${destination}.previous-${Date.now()}`);
} catch (error) { if (error.code !== 'ENOENT') throw error; }
await cp(standalone, destination, {
  recursive: true,
  filter: (source) => !/^\.env(?:\.|$)/.test(path.basename(source)),
});
const packagedApp = path.join(destination, 'apps', site);
await cp(path.join(app, 'public'), path.join(packagedApp, 'public'), { recursive: true });
await cp(path.join(app, '.next/static'), path.join(packagedApp, '.next/static'), { recursive: true });
// Verify that no local environment files were included in the distributable.
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (/^\.env(?:\.|$)/.test(entry.name)) throw new Error('Unexpected environment file in package.');
    if (entry.isDirectory()) await check(path.join(directory, entry.name));
  }
}
await check(destination);
console.log(`Packaged ${site} at artifacts/${site}/`);
console.log(`Run: HOSTNAME=0.0.0.0 PORT=3000 node artifacts/${site}/apps/${site}/server.js`);
