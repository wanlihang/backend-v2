// vue.config.js
module.exports = {
    publicPath: '',
    devServer: {
        proxy: {
            '/backend':{
                target:'http://192.168.3.9:8000',
                changeOrigin:true,
                ws:true
            }
        }
    }
}