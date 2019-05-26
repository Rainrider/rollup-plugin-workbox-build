import pkg from './package.json';

export default {
	input: 'src/index.js',
	external: ['workbox-build'],
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'esm' },
	],
};
