import { generateSW, injectManifest } from 'workbox-build';

/**
 * @enum  {function}  Workbox build mode
 */
const WORKBOX_MODE = {
	generateSW,
	injectManifest,
};

/** @type {RenderCallback} */
const report = ({ swDest, count, size }) => {
	let message = `Service worker: ${swDest}`;
	message += `\nFiles pre-cached: ${count}`;
	message += `\nCache size: ${size}`;

	console.log(message);
};

/**
 * Build me a service worker.
 *
 * @param {object}           options
 * @param {RenderCallback}   [options.render]          callback to render service worker statistics
 * @param {WorkboxBuildMode} [options.mode=generateSW] workbox-build mode to use
 * @param {object}           options.options           workbox-build configuration object
 *
 * @return {Object}
 */
export default function workbox({
	options = {},
	render = report,
	mode = 'generateSW',
}) {
	if (!(mode in WORKBOX_MODE))
		throw new Error(`Unsupported workbox mode: "${mode}"`);

	const build = WORKBOX_MODE[mode];

	const doRender = ({ count, size }) => {
		render({ swDest: options.swDest, count, size });
	};

	return {
		name: 'workbox-build',

		writeBundle(bundle) {
			return build(options)
				.then(doRender)
				.catch(console.error);
		},
	};
}

/** @typedef {'generateSW'|'injectManifest'} WorkboxBuildMode */

/**
 * Workbox-build pre-caching statistics.
 *
 * @typedef {object} WorkboxBuildStats
 * @property {string} swDest path to the generated service worker
 * @property {number} count  number of files added for pre-caching
 * @property {number} size   pre-cache size in bytes
 */

/**
 * Prints service worker pre-caching statistics.
 *
 * @callback RenderCallback
 * @param {WorkboxBuildStats} stats
 *
 * @return {void}
 */
