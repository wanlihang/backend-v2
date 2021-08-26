// vue.config.js
const pathroot = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    publicPath: '',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/backend':{
                target:'http://192.168.3.9:8000',
                changeOrigin:true,
                ws:true
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'less',
          patterns: [pathroot.resolve(__dirname, "src/assets/common/variable.less")] // 引入全局样式变量
        }
  },
}