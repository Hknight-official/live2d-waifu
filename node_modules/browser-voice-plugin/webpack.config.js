/*
 * @Author: liuchenxi
 * @Date: 2021-09-01 17:00:06
 * @LastEditTime: 2021-11-08 15:24:41
 * @LastEditors: Please set LastEditors
 * @Description: webpack配置
 * @FilePath: \browser-voice-plugin\webpack.config.js
 */
const TerserPlugin = require('terser-webpack-plugin') // 引入压缩插件，webpack 5 版本默认已安装

module.exports = {
  mode: 'production',
  entry: {
    'voicePlugin': './lib/index.ts',
    'voicePlugin.min': './lib/index.ts'
  },
  output: {
    filename: '[name].js',
    library: 'VoicePlugin',
    libraryExport: 'default', // 不添加的话引用的时候需要 tools.default
    libraryTarget: 'umd'
  },
  target: false,
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ // 使用压缩插件
        include: /\.min\.js$/
      })
    ]
  }
}
