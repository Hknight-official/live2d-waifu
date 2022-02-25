// 通过环境变量来决定入口文件
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/voicePlugin.min.js')
} else {
  module.exports = require('./dist/voicePlugin.js')
}
