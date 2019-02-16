import { generateSW, injectManifest } from 'workbox-build';

/**
 * @enum  {function}  Workbox build mode
 */
const WORKBOX_MODE = {
	generateSW,
	injectManifest
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
	mode = 'generateSW'
}) {
	if (!(mode in WORKBOX_MODE)) throw new Error(`Invalid workbox mode: "${mode}"`);

	const { swDest } = options; // TODO: sanitize + meaningful defaults
	const build = WORKBOX_MODE[mode];

	const doRender = ({ count, size }) => {
		render({ swDest, count, size });
	};

	return {
		name: 'workbox-build',

		writeBundle(bundle) {
			return build(options)
					.then(doRender)
					.catch(console.error);
		}
	};
}

/**
 * Renders service worker pre-caching statistics.
 *
 * @callback renderCallback
 * @param {string} swDest the destination of the generated service worker
 * @param {number} count  then number of files added for pre-caching
 * @param {number} size   the total size of files to be pre-cached in bits

 * @return {void}
 */
