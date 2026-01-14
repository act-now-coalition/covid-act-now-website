// Polyfills for Node.js globals required by vfile/react-markdown
// This must be loaded first to ensure process is available globally

const processPolyfill = require('process/browser');
const { Buffer: BufferPolyfill } = require('buffer');

// Make process and Buffer available globally for vfile
window.process = processPolyfill;
window.Buffer = BufferPolyfill;

// Ensure process.env exists
if (!window.process.env) {
  window.process.env = {};
}

// Export empty object to make this a module
module.exports = {};
