import { generateSW, injectManifest } from 'workbox-build';

/**
 * @enum  {function}  Workbox build mode
 */
const WORKBOX_MODE = {
	generateSW,
	injectManifest,
};

/** @typedef {'generateSW'|'injectManifest'} workboxMode */

/** @type {renderCallback} */
const report = ({ swDest, count, size }) => {
	let message = `Service worker: ${swDest}`;
	message += `\nFiles pre-cached: ${count}`;
	message += `\nCache size: ${size}`;

	console.log(message);
};

/**
 * Build me a service worker.
 *
 * @param {object}         options
 * @param {renderCallback} [options.render]          a callback to render service worker statistics
 * @param {workboxMode}    [options.mode=generateSW] the workbox build mode to use
 * @param {object}         options.options           The workbox configuration object
 *
 * @return {Object}
 */
export default function workbox({
	options = {},
	render = report,
	mode = 'generateSW',
}) {
	if (!(mode in WORKBOX_MODE))
		throw new Error(`Invalid workbox mode: "${mode}"`);

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

/**
 * Renders service worker pre-caching statistics.
 *
 * @callback renderCallback
 * @param {object} stats
 * @param {string} stats.swDest the path to the generated service worker
 * @param {number} stats.count  the number of files added for pre-caching
 * @param {number} stats.size   the pre-cache size in bytes
 *
 * @return {void}
 */
