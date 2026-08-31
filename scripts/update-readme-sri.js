// Pins the README install snippet to the version being released, with the
// matching Subresource Integrity hash of dist/bundle.js. Runs during the
// semantic-release prepare step, after `npm run build`; the build is
// deterministic, so the `prepublishOnly` rebuild published to npm produces
// the same bytes this hash was computed from.
const { createHash } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const version = process.argv[2];
if (!version) {
  console.error('usage: node scripts/update-readme-sri.js <version>');
  process.exit(1);
}

const root = join(__dirname, '..');
const bundle = readFileSync(join(root, 'dist', 'bundle.js'));
const integrity = `sha384-${createHash('sha384')
  .update(bundle)
  .digest('base64')}`;

const readmePath = join(root, 'README.md');
const readme = readFileSync(readmePath, 'utf8');

const versionPattern = /(@artaio\/arta-browser@)[0-9A-Za-z.+-]+(\/dist\/bundle\.js)/g;
const integrityPattern = /integrity="sha384-[^"]*"/g;

if (!readme.match(versionPattern) || !readme.match(integrityPattern)) {
  console.error('README install snippet not found; refusing to release');
  process.exit(1);
}

writeFileSync(
  readmePath,
  readme
    .replace(versionPattern, `$1${version}$2`)
    .replace(integrityPattern, `integrity="${integrity}"`)
);
console.log(`README pinned to @artaio/arta-browser@${version} (${integrity})`);
