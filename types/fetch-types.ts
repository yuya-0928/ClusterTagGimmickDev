import { argv } from 'bun';

const [_exe, _file, lang] = argv;

const url =
  lang === 'ja' || lang === undefined
    ? 'https://docs.cluster.mu/script/index.d.ts'
    : lang === 'en'
      ? 'https://docs.cluster.mu/script/en/index.d.ts'
      : undefined;

if (url === undefined) {
  throw new Error('invalid language');
}

const response = await fetch(url);

if (!response.ok) {
  throw new Error(`unexpected response ${response.statusText}`);
}

await Bun.write('types/cluster-script.d.ts.txt', response);
