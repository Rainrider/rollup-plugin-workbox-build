## rollup-plugin-workbox-build

[![](https://img.shields.io/npm/v/rollup-plugin-workbox-build.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-workbox-build)

Rollup plugin that builds a service worker as part of your rollup build by using
[workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build).

Shameless copy/paste of [rollup-plugin-workbox](https://www.npmjs.com/package/rollup-plugin-workbox) by Benny Powers.

The only noteworthy change is the use of the `writeBundle` rollup hook instead of `generateBundle`, so that
workbox-build can pick-up bundled assets after they have been written to disk.

## Usage

```js
import workbox from 'rollup-plugin-workbox'

export default {
  input: /*...*/,
  output: /*...*/,
  plugins: [
    workbox({
      mode: 'generateSW', // or 'injectManifest'
      options: {
        swDest: 'service-worker.js',
        globDirectory: 'dist',
        // other workbox-build options depending on the mode
      },
    }
  ],
}
```

You can also pass your own callback for rendering workbox-build stats. It gets an object with the following
properties:

- `swDest` {string} - the path to the generated service worker
- `count` {number} - the number of assets added for pre-caching
- `size` {number} - the resulting pre-cache size in bytes

## Plans

- bring it on-par with the official [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
