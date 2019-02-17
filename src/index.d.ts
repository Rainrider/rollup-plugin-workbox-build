import { Plugin } from "rollup";

export interface WorkboxBuildStats {
	swDest: string;
	count: number;
	size: number;
}

export interface PluginOptions {
	mode: 'generateSW'|'injectManifest';
	render: (stats: WorkboxBuildStats) => void;
	options: object;
}

export function workbox(options: PluginOptions): Plugin;
