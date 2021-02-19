'use strict'

const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  experimental: {
    newBabel: true,
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
    staticExport: {
      parallel: 50,
    }
  },
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    webpackObject, // the imported webpack node module
    options: {
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that will be used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    if (target === 'web') {
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new LoadablePlugin({
          writeToDisk: true
        }),
      ]
    }
    return webpackConfig;
  },
};
