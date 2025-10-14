const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills for Node.js core modules (required for webpack 5)
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
      };
      
      // Ensure polyfill is loaded FIRST by prepending to entry array
      const originalEntry = webpackConfig.entry;
      webpackConfig.entry = [
        path.resolve(__dirname, 'src/polyfills.js'),
        ...(Array.isArray(originalEntry) ? originalEntry : [originalEntry])
      ];
      
      // Disable ESLint plugin due to flowtype compatibility issues
      // You can still run `npm run lint` manually
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
      
      // Provide process and Buffer globals for react-markdown/vfile
      webpackConfig.plugins.unshift(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
      
      // Define process.env and global for build
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          global: 'globalThis',
        })
      );
      
      // Suppress source map warnings from node_modules
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source-map-loader")
          );
        },
      ];
      
      return webpackConfig;
    },
  },
};

