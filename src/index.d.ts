import { Plugin } from "rollup";
import workbox from ".";

/** @type PluginImpl<PluginOptions> */
export = workbox;

/**
 * Workbox-build pre-cache statistics
 */
interface WorkboxBuildStats {
	/** the path to the generated service worker */
	swDest: string;
	/** the number of assets added for pre-caching */
	count: number;
	/** the pre-cache size in bytes  */
	size: number;
}

interface PluginOptions {
	/** the workbox-build mode */
	mode?: 'generateSW' | 'injectManifest';
	/** a callback to render pre-cache statistics */
	render?: (stats: WorkboxBuildStats) => void;
	/** workbox-build options */
	options: object;
}

declare function workbox(options: PluginOptions): Plugin
