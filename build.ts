import { readdir } from 'node:fs/promises';

// Cleanup
const oldFiles = await readdir('./build');
for (const file of oldFiles) {
  await Bun.file(`./build/${file}`).delete();
}

// Build
const files = await readdir('./scripts');
const entrypoints = files.map((file) => `./scripts/${file}`);
await Promise.all(
  entrypoints.map((entrypoint) =>
    Bun.build({
      entrypoints: [entrypoint],
      outdir: './build',
    }),
  ),
);
