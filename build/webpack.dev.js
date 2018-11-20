const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const WebpackShellPlugin = require('webpack-shell-plugin');

const WEBPACK_SERVER_JS_NAME = '../dist/server.bundle.js';

const nodeModules = {};

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

fs.readdirSync('node_modules')
  .filter( (catalogue) => {
    return ['.bin'].indexOf(catalogue) === -1;
  })
  .forEach( (mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: [
    path.resolve(__dirname, '../app.js')
  ],

  output: {
    filename: WEBPACK_SERVER_JS_NAME,
    path: path.resolve(__dirname),
    hotUpdateChunkFilename: '../dist/hot-update.js',
    hotUpdateMainFilename: '../dist/hot-update.json'
  },

  resolve: {
    alias: {
      '@': resolve('/')
    }
  },

  /* 告知 webpack 为 node 服务，并忽略 externals 中的模块 */
  target: 'node',
  externals: nodeModules,

  plugins: [
    /* HMR plugin */
    new webpack.HotModuleReplacementPlugin(),

    /* 当 HMR 替换时在浏览器控制台输出对用户更友好的模块名字信息 */
    new webpack.NamedModulesPlugin(),

    new WebpackShellPlugin({
      onBuildEnd: [
        Array(
          'npx', 
          'nodemon', 
          path.resolve(__dirname, WEBPACK_SERVER_JS_NAME),
          '--watch',
          path.resolve(__dirname, WEBPACK_SERVER_JS_NAME),
          '--exitcrash'
        ).join(' ')
      ]
    })
  ],

  /* __dirname 和 __filename 指向原始地址 */
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  }
};